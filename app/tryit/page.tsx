"use client";

import AudioSubmit from "@/components/audioSubmit";
import Waveform from "@/components/waveform";
import {
  ArrowLeft,
  File,
  Music,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function TryIt() {
  const [file, setFile] = useState<File | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset the file input value when the file changes
  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [file]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-3xl flex flex-col items-center gap-8 relative z-10">
        {/* Back Link */}
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" /> Client-Side Preview Mode
          </span>
        </div>

        {/* Page Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <Sparkles className="w-3.5 h-3.5" /> Voxly Interactive
            Playground
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Transcribe Your{" "}
            <span className="gradient-text-purple">Audio File</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Upload an MP3 audio file to inspect waveform visualization, speaker
            diarization, and real-time speech-to-text inference speed.
          </p>
        </div>

        {/* Main Drag & Drop / Upload Card */}
        <div className="w-full rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 shadow-2xl shadow-purple-500/10 flex flex-col items-center">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full cursor-pointer flex flex-col items-center"
          >
            {file ? (
              <div className="flex flex-col items-center w-full gap-6">
                <div className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                      <Music className="w-4 h-4 text-purple-500" />
                      <span>{file.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                  <Waveform file={file} />
                </div>

                <AudioSubmit file={file} setFile={setFile} />
              </div>
            ) : (
              <div className="w-full py-12 px-6 rounded-xl border-2 border-dashed border-purple-300 dark:border-purple-800/80 hover:border-purple-500 dark:hover:border-purple-500 bg-purple-50/50 dark:bg-purple-950/20 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all flex flex-col items-center text-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/60 border border-purple-200 dark:border-purple-700/60 flex items-center justify-center text-purple-600 dark:text-purple-300 group-hover:scale-110 transition-transform">
                  <Upload className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Click to select an MP3 audio file
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Supports MP3, WAV, M4A up to 50MB
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/25 group-hover:bg-purple-500 transition-colors">
                  Browse File
                </span>
              </div>
            )}

            {file && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <File className="w-4 h-4" /> Change Selected File
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".mp3,.wav,.m4a"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files?.[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
