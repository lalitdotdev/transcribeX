"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CodeBlock } from "../ui/codeblocks";
import Link from "next/link";
import { Server, Terminal, ExternalLink, Zap, CheckCircle2 } from "lucide-react";

export default function CodeHost() {
  return (
    <div className="w-full max-w-5xl mx-auto text-left">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
          <Terminal className="w-3.5 h-3.5" /> Self-Hosting & Deployment Options
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Deploy on <span className="gradient-text-purple">Modal or Local GPU</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
          Get complete source code, serverless autoscaling, and raw inference speed in 3 simple shell commands.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
        <Tabs defaultValue="modal" className="w-full flex flex-col gap-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            <TabsTrigger
              value="modal"
              className="rounded-lg text-xs sm:text-sm font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 data-[state=active]:shadow-sm transition-all"
            >
              <Server className="w-4 h-4 mr-2" /> Serverless (Modal.com)
            </TabsTrigger>
            <TabsTrigger
              value="local"
              className="rounded-lg text-xs sm:text-sm font-semibold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 data-[state=active]:shadow-sm transition-all"
            >
              <Terminal className="w-4 h-4 mr-2" /> Local PyPI / Docker
            </TabsTrigger>
          </TabsList>

          {/* Modal Deployment Tab */}
          <TabsContent value="modal" className="w-full space-y-6 pt-2">
            <div className="p-4 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
              <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Deploying to Modal.com:</strong> Modal provides autoscaling on-demand serverless GPU infrastructure. 
                Spin up from 0 to 80 concurrent A10G instances in milliseconds with zero idle container costs.{" "}
                <Link
                  className="text-purple-600 dark:text-purple-400 font-bold underline inline-flex items-center gap-1"
                  target="_blank"
                  href="https://www.modal.com/"
                >
                  Visit Modal Docs <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="w-full">
              <CodeBlock
                fileName="modal_app.py"
                language="python"
                value={`from modal import Image, Stub, method, NetworkFileSystem, asgi_app
from fastapi import Request, FastAPI
import tempfile
import time

MODEL_DIR = "/model"
web_app = FastAPI()

def download_model():
    from huggingface_hub import snapshot_download
    snapshot_download("openai/whisper-large-v3", local_dir=MODEL_DIR)

image = (
    Image.from_registry("nvidia/cuda:12.1.0-cudnn8-devel-ubuntu22.04", add_python="3.9")
    .apt_install("git","ffmpeg")
    .pip_install(
        "transformers", "ninja", "packaging", "wheel", "torch", "hf-transfer~=0.1", "ffmpeg-python"
    ).run_commands("python -m pip install flash-attn --no-build-isolation", gpu="A10G")
    .env({"HF_HUB_ENABLE_HF_TRANSFER": "1"})
    .run_function(download_model)
)

stub = Stub("whisp-x", image=image)

@stub.cls(gpu="A10G", allow_concurrent_inputs=80, container_idle_timeout=40)
class WhisperV3:
    def __enter__(self):
        import torch
        from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline
        self.device = "cuda:0" if torch.cuda.is_available() else "cpu"
        model = AutoModelForSpeechSeq2Seq.from_pretrained(
            MODEL_DIR, torch_dtype=torch.float16, use_safetensors=True, use_flash_attention_2=True
        ).to(self.device)
        processor = AutoProcessor.from_pretrained(MODEL_DIR)
        self.pipe = pipeline(
            "automatic-speech-recognition",
            model=model,
            tokenizer=processor.tokenizer,
            feature_extractor=processor.feature_extractor,
            chunk_length_s=30,
            batch_size=24,
            return_timestamps=True,
            device=0,
        )

    @method()
    def generate(self, audio: bytes):
        fp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
        fp.write(audio)
        fp.close()
        start = time.time()
        output = self.pipe(fp.name, chunk_length_s=30, batch_size=24, return_timestamps=True)
        return output, time.time() - start

@stub.function()
@web_app.post("/")
async def transcribe(request: Request):
    form = await request.form()
    audio = await form["audio"].read()
    output, elapsed = WhisperV3().generate.remote(audio)
    return {"transcript": output, "elapsed_seconds": elapsed}`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 dark:bg-slate-950 font-mono text-xs border border-slate-800 space-y-2">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">1. Deploy Command</span>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400 font-bold">$</span>
                  <code>modal deploy modal_app.py</code>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 dark:bg-slate-950 font-mono text-xs border border-slate-800 space-y-2">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">2. cURL REST Test</span>
                <div className="overflow-x-auto text-[11px]">
                  <span className="text-cyan-400 font-bold">$</span>
                  <code>{` curl -X POST -F "audio=@sample.mp3" https://your-modal-app.modal.run`}</code>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Local CLI Tab */}
          <TabsContent value="local" className="w-full space-y-6 pt-2">
            <div className="p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Run WhisperV3 locally on your local NVIDIA RTX or A100 GPU utilizing{" "}
              <strong className="text-indigo-600 dark:text-indigo-400">Insanely Fast Whisper</strong>.
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 dark:bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Step 1: Install with Pipx</span>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400 font-bold">$</span>
                  <code>pipx install insanely-fast-whisper</code>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 dark:bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">Step 2: Run with Flash Attention 2</span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">$</span>
                  <code>insanely-fast-whisper --file-name audio.mp3 --flash True</code>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
