"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

export default function SaaSFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makes TranscribeX faster than standard Whisper implementations?",
      a: "TranscribeX uses PyTorch 2.0 scaled dot-product attention and Flash Attention v2 CUDA kernels specifically compiled for Ampere and Ada Lovelace GPUs (A10G, A100, RTX 3090/4090). This reduces memory bandwidth bottlenecks by up to 5x while maintaining 100% transcript precision.",
    },
    {
      q: "Can I host TranscribeX on my own local NVIDIA GPU or Modal serverless?",
      a: "Yes! TranscribeX is 100% open source. You can run it locally with pipx or deploy it to Modal serverless GPUs using our provided 1-click Python script. It automatically downloads model weights and boots up containerized workers.",
    },
    {
      q: "Does TranscribeX support multi-speaker diarization?",
      a: "Yes. TranscribeX includes speaker segmentation and alignment models. It identifies distinct speakers in the audio track, outputting speaker labels along with millisecond timestamps.",
    },
    {
      q: "What audio formats and file sizes are supported?",
      a: "TranscribeX supports all common audio and video formats including MP3, WAV, M4A, FLAC, AAC, OGG, MP4, and WEBM. Files are chunked into 30-second sliding windows for zero memory leaks.",
    },
    {
      q: "Is my audio data private when using self-hosted Modal deployment?",
      a: "Yes. When you host TranscribeX on Modal or your own Docker container, audio files are processed directly on your designated GPU container and destroyed immediately after transcription completes. Zero data is stored or logged.",
    },
  ];

  return (
    <section className="w-full py-20 bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Got Questions?{" "}
            <span className="gradient-text-purple">
              We&apos;ve Got Answers.
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-sm sm:text-base hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-300 flex-shrink-0 ${
                      isOpen
                        ? "rotate-180 text-purple-600 dark:text-purple-400"
                        : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/60 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
