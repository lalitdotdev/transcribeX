---

# transcribeX - Real-time Audio Transcription Platform

![transcribeX](https://socialify.git.ci/lalitdotdev/transcribeX/image?description=1&font=Jost&language=1&logo=https%3A%2F%2Fpouch.jumpshare.com%2Fpreview%2FopI2xmAzfHSvgrpg7dMM2hUHahxViSY-a_44Vno03jgo1fz68Cke4XyUiTfbRzuVMEpYAXlJJLHDiZzJx6WeaiNaRzgjV6rq2E-q-IlH64I&name=1&owner=1&stargazers=1&theme=Light)


Welcome to transcribeX, a platform for real-time audio transcription powered by state-of-the-art AI models and modern web technologies.

## Overview

TranscribeX enables users to transcribe audio files efficiently using NVIDIA's CUDA technology, Transformers, and Flash Attention v2. This platform eliminates the reliance on third-party APIs by leveraging in-house models and infrastructure, providing robust performance and data privacy.

## Features

- **Real-time Transcription**: Transcribe audio files instantly with high accuracy.
- **Customizable AI Models**: Utilize NVIDIA CUDA and advanced Transformer models.
- **Web Interface**: User-friendly web interface for uploading and managing audio files.
- **Data Privacy**: Host and process data securely without relying on external services.

## Technologies Used

- **Backend**: Python, FastAPI, Modal framework
- **Frontend**: React, Tailwind CSS
- **AI Models**: Hugging Face Transformers, Flash Attention v2
- **Infrastructure**: NVIDIA CUDA, Docker

## Getting Started

To run transcribeX locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/transcribeX.git
   cd transcribeX
   ```




To deploy WhisperV3 backend on Modal:

1. **Create a Virtual Environment:**

   ```bash
   python3 -m venv whisperenv
   source whisperenv/bin/activate
   ```

2. **Install Dependencies:**

   ```bash
   pip3 install modal==0.62.181 fastapi==0.110.0
   ```

3. **Configure Modal Credentials:**

   - Ensure your Modal credentials are set up correctly in your environment.
   - Setup modal token from the modal dashboard and run in terminal:
     ```bash
     modal token set --token-id <token-id> --token-secret <token-secret>
     ```

4. **Deploy the Backend Server:**

   ```bash
   cd modal directory
    modal deploy modal_app.py
   ```

5. **Start the Development Server:**

   ```bash
   npm or bun run dev
   ```

6. **Access TranscribeX:**
   - The frontend will be accessible at `http://localhost:3000`.

## API Endpoints

- **POST /transcribe**: Upload an audio file for transcription.
- **GET /stats**: View real-time statistics on transcription operations.
- **POST /call_id**: Retrieve the status of a transcription task using its call ID.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any enhancements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

Special thanks to the contributors and libraries that make WhisperV3 possible.

---

## Important links and resources

https://modal.com/docs/examples/hello_world
https://github.com/katspaugh/wavesurfer.js
