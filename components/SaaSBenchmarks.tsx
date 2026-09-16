"use client";

import { CheckCircle, Flame, Gauge } from "lucide-react";
import { useState } from "react";

export default function SaaSBenchmarks() {
  const [metric, setMetric] = useState<"speed" | "cost" | "vram">("speed");

  return (
    <section
      id="benchmarks"
      className="w-full py-20 relative bg-slate-50/50 dark:bg-slate-950/40 border-y border-slate-200/60 dark:border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Explanations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <Gauge className="w-3.5 h-3.5" /> Benchmarks & Performance
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Unmatched Speed. <br />
              <span className="gradient-text-emerald">
                Fraction of the Cost.
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              By combining PyTorch 2.0 SDPA, Flash Attention v2 CUDA kernels,
              and PyTorch FP16 quantization, TranscribeX destroys traditional
              speech recognition overhead.
            </p>

            {/* Metric Switcher buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => setMetric("speed")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  metric === "speed"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Processing Speed (Sec / Hr)
              </button>
              <button
                onClick={() => setMetric("cost")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  metric === "cost"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Cost per 1,000 Hours ($)
              </button>
              <button
                onClick={() => setMetric("vram")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  metric === "vram"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/25"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                VRAM Usage (GB)
              </button>
            </div>
          </div>

          {/* Right Column: Visual Benchmark Cards & Bars */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200/60 dark:border-slate-800/60">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {metric === "speed" &&
                    "Execution Speed per 60 Min Audio Track"}
                  {metric === "cost" &&
                    "Infrastructure Cost per 1,000 Hours Transcribed"}
                  {metric === "vram" && "GPU VRAM Allocation (A10G Instance)"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Tested on NVIDIA A10G 24GB Tensor Core GPU
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                Verified Benchmark
              </span>
            </div>

            {/* Bars */}
            <div className="space-y-6">
              {/* TranscribeX */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span className="text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 fill-current" /> TranscribeX
                    (WhisperV3 + FlashAttn 2)
                  </span>
                  <span className="text-slate-900 dark:text-white font-mono">
                    {metric === "speed" && "11.4 Seconds"}
                    {metric === "cost" && "$3.20 USD"}
                    {metric === "vram" && "4.1 GB VRAM"}
                  </span>
                </div>
                <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-purple-200 dark:border-purple-900">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-emerald-400 rounded-full transition-all duration-700 shadow-sm"
                    style={{
                      width:
                        metric === "speed"
                          ? "15%"
                          : metric === "cost"
                            ? "8%"
                            : "30%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Standard Whisper */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  <span>OpenAI Standard Whisper-v3</span>
                  <span className="font-mono">
                    {metric === "speed" && "64.8 Seconds"}
                    {metric === "cost" && "$18.50 USD"}
                    {metric === "vram" && "10.4 GB VRAM"}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-400 dark:bg-slate-600 rounded-full transition-all duration-700"
                    style={{
                      width:
                        metric === "speed"
                          ? "65%"
                          : metric === "cost"
                            ? "40%"
                            : "75%",
                    }}
                  ></div>
                </div>
              </div>

              {/* Legacy Cloud API */}
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  <span>Legacy SaaS Cloud API</span>
                  <span className="font-mono">
                    {metric === "speed" && "120.0 Seconds"}
                    {metric === "cost" && "$360.00 USD"}
                    {metric === "vram" && "N/A (SaaS Managed)"}
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-300 dark:bg-slate-700 rounded-full transition-all duration-700"
                    style={{
                      width:
                        metric === "speed"
                          ? "100%"
                          : metric === "cost"
                            ? "100%"
                            : "95%",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Bottom summary note */}
            <div className="mt-8 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <span className="text-xs text-slate-700 dark:text-slate-300">
                  Save up to <strong>98.5% on cloud compute costs</strong> while
                  processing audio 5x faster than native Transformers
                  implementations.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
