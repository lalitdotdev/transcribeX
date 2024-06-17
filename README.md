---

# WhisperV3 - Real-time Audio Transcription Platform

Welcome to WhisperV3, a platform for real-time audio transcription powered by state-of-the-art AI models and modern web technologies.

## Overview

WhisperV3 enables users to transcribe audio files efficiently using NVIDIA's CUDA technology, Transformers, and Flash Attention v2. This platform eliminates the reliance on third-party APIs by leveraging in-house models and infrastructure, providing robust performance and data privacy.

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

To run WhisperV3 locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/WhisperV3.git
   cd WhisperV3
   ```

2. Install dependencies:

   ```bash
   # Backend
   pip install -r requirements.txt

   # Frontend
   cd client
   npm install
   ```

3. Set up environment variables:

   - Configure Modal credentials and NVIDIA GPU settings as needed.

4. Start the development servers:

   ```bash
   # Backend
   uvicorn main:web_app --reload

   # Frontend
   npm start
   ```

5. Access WhisperV3 in your browser at `http://localhost:3000`.

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

## Important links and resources

https://modal.com/docs/examples/hello_world
https://github.com/katspaugh/wavesurfer.js
