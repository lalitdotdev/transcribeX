import modal
from modal import Image, Secret, method, NetworkFileSystem, asgi_app, App
from fastapi import Request, FastAPI, responses
from fastapi.middleware.cors import CORSMiddleware
import os
import tempfile

MODEL_DIR = "/model"

web_app = FastAPI()

web_app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # replace with your real domain(s)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def check_api_key(request: Request):
    expected = os.environ["API_KEY"]
    provided = request.headers.get("x-api-key")
    return provided == expected


def download_model():
    from huggingface_hub import snapshot_download

    snapshot_download("openai/whisper-large-v3", local_dir=MODEL_DIR)


image = (
    Image.from_registry("nvidia/cuda:12.1.0-cudnn8-devel-ubuntu22.04", add_python="3.11")
    .apt_install("git", "ffmpeg", "gcc", "g++")
    .pip_install(
        "fastapi[standard]",
        "transformers",
        "ninja",
        "packaging",
        "wheel",
        "hf-transfer~=0.1",
        "ffmpeg-python",
    )
    .pip_install(
        "torch==2.5.1",
        index_url="https://download.pytorch.org/whl/cu121",
    )
    .env({
        "CC": "gcc",
        "CXX": "g++",
    })
    .run_commands("python -m pip install flash-attn --no-build-isolation", gpu="A10G")
    .env({"HF_HUB_ENABLE_HF_TRANSFER": "1"})
    .run_function(download_model, gpu="A10G")
)

app = App("transcribe-x")
net_fs = NetworkFileSystem.from_name("transcribe-x-fs", create_if_missing=True)


@app.cls(
    image=image,
    gpu="A10G",
    scaledown_window=40,
    network_file_systems={"/audio_files": net_fs},
)
@modal.concurrent(max_inputs=80)
class WhisperV3:
    @modal.enter()
    def load(self):
        import torch
        from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline

        self.device = "cuda:0" if torch.cuda.is_available() else "cpu"
        self.torch_dtype = torch.float16 if torch.cuda.is_available() else torch.float32
        model = AutoModelForSpeechSeq2Seq.from_pretrained(
            MODEL_DIR,
            torch_dtype=self.torch_dtype,
            use_safetensors=True,
            attn_implementation="flash_attention_2",
        )
        processor = AutoProcessor.from_pretrained(MODEL_DIR)
        model.to(self.device)
        self.pipe = pipeline(
            "automatic-speech-recognition",
            model=model,
            tokenizer=processor.tokenizer,
            feature_extractor=processor.feature_extractor,
            max_new_tokens=128,
            chunk_length_s=30,
            batch_size=24,
            return_timestamps=True,
            torch_dtype=self.torch_dtype,
            device=0,
        )

    @method()
    def generate(self, audio: bytes):
        import time

        fp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
        fp.write(audio)
        fp.close()
        start = time.time()
        output = self.pipe(fp.name, chunk_length_s=30, batch_size=24, return_timestamps=True)
        elapsed = time.time() - start
        return output, elapsed


@web_app.post("/transcribe")
async def transcribe(request: Request):
    if not check_api_key(request):
        return responses.JSONResponse(content={"error": "unauthorized"}, status_code=401)

    print("Received a request from", request.client)
    form = await request.form()
    file_content = await form["file"].read()

    WhisperV3Cls = modal.Cls.from_name("transcribe-x", "WhisperV3")
    call = await WhisperV3Cls().generate.spawn.aio(file_content)
    return call.object_id


@web_app.get("/stats")
def stats(request: Request):
    if not check_api_key(request):
        return responses.JSONResponse(content={"error": "unauthorized"}, status_code=401)

    print("Received a request from", request.client)
    WhisperV3Cls = modal.Cls.from_name("transcribe-x", "WhisperV3")
    return WhisperV3Cls().generate.get_current_stats()


@web_app.post("/call_id")
async def get_completion(request: Request):
    if not check_api_key(request):
        return responses.JSONResponse(content={"error": "unauthorized"}, status_code=401)

    form = await request.form()
    call_id = form["call_id"]
    f = modal.FunctionCall.from_id(call_id)
    try:
        result = await f.get.aio(timeout=0)
    except TimeoutError:
        return responses.JSONResponse(content="", status_code=202)
    return result


@app.function(secrets=[Secret.from_name("transcribe-api-key")])
@modal.concurrent(max_inputs=4)
@asgi_app()
def entrypoint():
    return web_app