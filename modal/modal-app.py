from modal import (
    Image,
    Secret,
    Stub,
    method,
    NetworkFileSystem,
    asgi_app,
    Function,
    functions,
)
from fastapi import Request, FastAPI, responses
from fastapi.middleware.cors import CORSMiddleware
import tempfile

MODEL_DIR = "/model"

web_app = FastAPI()

web_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def download_model():
    from huggingface_hub import snapshot_download

    snapshot_download("openai/whisper-large-v3", local_dir=MODEL_DIR)


image = (
    Image.from_registry("nvidia/cuda:12.1.0-cudnn8-devel-ubuntu22.04", add_python="3.9")
    .apt_install("git", "ffmpeg")
    .pip_install(
        "transformers",
        "ninja",
        "packaging",
        "wheel",
        "torch",
        "hf-transfer~=0.1",
        "ffmpeg-python",
    )
    .run_commands("python -m pip install flash-attn --no-build-isolation", gpu="A10G")
    .env({"HF_HUB_ENABLE_HF_TRANSFER": "1"})
    .run_function(
        download_model,
    )
)

