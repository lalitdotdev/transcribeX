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

