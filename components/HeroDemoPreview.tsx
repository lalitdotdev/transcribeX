"use client";

import {
  Check,
  Copy,
  Pause,
  Play,
  Radio,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

interface SampleTrack {
  id: string;
  title: string;
  duration: string;
  speakerCount: number;
  accuracy: string;
  transcript: {
    speaker: string;
    time: string;
    text: string;
    color: string;
  }[];
}

const SAMPLES: SampleTrack[] = [
  {
    id: "keynote",
    title: "⚡ OpenAI Whisper-v3 Keynote",
    duration: "0:24",
    speakerCount: 2,
    accuracy: "99.8%",
    transcript: [
      {
        speaker: "Dr. Alex (Lead AI Architect)",
        time: "00:00 - 00:11",
        text: "Whisper Large-v3 accelerated with Flash Attention 2 delivers up to 5x higher throughput compared to traditional CUDA pipelines with half the VRAM requirement.",
        color: "from-purple-500 to-indigo-500",
      },
      {
        speaker: "Sarah Chen (Cloud Lead)",
        time: "00:12 - 00:24",
        text: "By utilizing Modal's serverless GPU infrastructure, we scale from zero to 80 concurrent transcription workers in under 400 milliseconds.",
        color: "from-cyan-500 to-teal-500",
      },
    ],
  },
  {
    id: "podcast",
    title: "🎙️ AI Engineering Podcast #42",
    duration: "0:18",
    speakerCount: 2,
    accuracy: "99.4%",
    transcript: [
      {
        speaker: "Host (Michael)",
        time: "00:00 - 00:07",
        text: "Welcome back! Today we are discussing why real-time speech diarization changes developer tools forever.",
        color: "from-amber-500 to-orange-500",
      },
      {
        speaker: "Guest (Elena)",
        time: "00:08 - 00:18",
        text: "Word-level timestamping combined with low-latency WebSocket streaming allows zero-lag subtitles across 99+ spoken languages.",
        color: "from-purple-500 to-pink-500",
      },
    ],
  },
];

export default function HeroDemoPreview() {
  const [activeTrack, setActiveTrack] = useState<SampleTrack>(SAMPLES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(15);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"transcript" | "json" | "srt">(
    "transcript",
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleCopy = () => {
    const fullText = activeTrack.transcript
      .map((t) => `[${t.speaker} ${t.time}]: ${t.text}`)
      .join("\n");
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden transition-all">
      {/* Top Window Header */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-950/70 gap-3">
        {/* Window controls dots */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="ml-2 text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            TranscribeX Interactive Demo Player
          </span>
        </div>

        {/* Track selector tabs */}
        <div className="flex items-center gap-1.5 bg-slate-200/60 dark:bg-slate-800/60 p-1 rounded-xl text-xs font-medium">
          {SAMPLES.map((track) => (
            <button
              key={track.id}
              onClick={() => {
                setActiveTrack(track);
                setProgress(0);
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTrack.id === track.id
                  ? "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 font-semibold shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {track.title}
            </button>
          ))}
        </div>

        {/* Badges */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3 h-3" /> Precision {activeTrack.accuracy}
          </span>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Player & Waveform Visualizer */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6 p-5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Audio Signal Pipeline
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Duration: {activeTrack.duration}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {activeTrack.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Multi-speaker diarization enabled • Flash Attention v2 CUDA Kernel
            </p>
          </div>

          {/* Animated Waveform Bars */}
          <div className="flex items-center justify-between gap-1 h-20 px-4 py-2 bg-slate-900 dark:bg-slate-950 rounded-xl border border-slate-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-cyan-500/10 pointer-events-none"></div>
            {Array.from({ length: 36 }).map((_, i) => {
              const height = isPlaying
                ? Math.sin(i * 0.4 + progress * 0.1) * 35 + 45
                : Math.sin(i * 0.5) * 20 + 35;
              const isActive = (i / 36) * 100 <= progress;
              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isActive
                      ? "bg-gradient-to-t from-purple-500 to-cyan-400 shadow-sm shadow-purple-500/50"
                      : "bg-slate-700/60 dark:bg-slate-800/80"
                  }`}
                  style={{ height: `${height}%` }}
                ></div>
              );
            })}
          </div>

          {/* Audio Controls */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                )}
              </button>
              <div className="flex-1">
                <div className="flex justify-between text-[11px] text-slate-500 mb-1 font-mono">
                  <span>00:0{Math.floor((progress / 100) * 24)}</span>
                  <span>{activeTrack.duration}</span>
                </div>
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setProgress((clickX / rect.width) * 100);
                  }}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full cursor-pointer overflow-hidden relative"
                >
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Track Info Pills */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                  Latency
                </span>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  38ms Real-Time
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                  Language
                </span>
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  English (Auto-Detect)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Diarized Live Output */}
        <div className="lg:col-span-7 flex flex-col rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
          {/* Header & Export Actions */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab("transcript")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === "transcript"
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Diarized Text
              </button>
              <button
                onClick={() => setActiveTab("json")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === "json"
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                JSON Payload
              </button>
              <button
                onClick={() => setActiveTab("srt")}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === "srt"
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                SRT Subtitles
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-lg"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          {/* Output Content */}
          <div className="p-5 flex-1 max-h-[300px] overflow-y-auto space-y-4 font-sans">
            {activeTab === "transcript" && (
              <>
                {activeTrack.transcript.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:border-purple-300 dark:hover:border-purple-800"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                        <span
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`}
                        ></span>
                        {item.speaker}
                      </span>
                      <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded-md">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {`"${item.text}"`}
                    </p>
                  </div>
                ))}
              </>
            )}

            {activeTab === "json" && (
              <pre className="text-xs font-mono p-4 rounded-xl bg-slate-900 text-slate-100 dark:bg-slate-950 dark:text-purple-300 overflow-x-auto">
                {JSON.stringify(
                  {
                    model: "openai/whisper-large-v3",
                    acceleration: "flash_attention_2",
                    duration_seconds: 24.2,
                    confidence: 0.998,
                    speakers: activeTrack.speakerCount,
                    segments: activeTrack.transcript,
                  },
                  null,
                  2,
                )}
              </pre>
            )}

            {activeTab === "srt" && (
              <pre className="text-xs font-mono p-4 rounded-xl bg-slate-900 text-slate-100 dark:bg-slate-950 dark:text-emerald-300 overflow-x-auto">
                {`1\n00:00:00,000 --> 00:00:11,500\n${activeTrack.transcript[0]?.text}\n\n2\n00:00:12,000 --> 00:00:24,000\n${activeTrack.transcript[1]?.text}`}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
