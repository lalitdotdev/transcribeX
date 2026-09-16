"use client";

import {
  ArrowUpRight,
  FileCode,
  Globe,
  Server,
  Users,
  Zap,
} from "lucide-react";

export default function SaaSFeatures() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-purple-500" />,
      title: "Flash Attention v2 Engine",
      description:
        "Powered by OpenAI Whisper large-v3 with native Flash Attention 2 CUDA kernels. Voxly an hour of audio in under 12 seconds.",
      badge: "5x Speedup",
      gradient: "from-purple-500/10 via-indigo-500/5 to-transparent",
      borderColor: "hover:border-purple-500/40",
      colSpan: "lg:col-span-7",
    },
    {
      icon: <Users className="w-6 h-6 text-cyan-500" />,
      title: "Multi-Speaker Diarization",
      description:
        "Seamlessly identify who spoke when. Distinguish up to 10 distinct speakers with timestamp boundaries and color tagging.",
      badge: "Timestamp Accurate",
      gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
      borderColor: "hover:border-cyan-500/40",
      colSpan: "lg:col-span-5",
    },
    {
      icon: <Server className="w-6 h-6 text-emerald-500" />,
      title: "1-Click Modal & Docker Deploy",
      description:
        "Run serverless GPU workers on Modal or deploy on-premise Docker containers on your local RTX/A100 cluster.",
      badge: "Zero-Data Retention",
      gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
      borderColor: "hover:border-emerald-500/40",
      colSpan: "lg:col-span-4",
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-500" />,
      title: "99+ Language Auto-Detect",
      description:
        "Automatic language identification, accents parsing, and optional English translation pipeline for global audio content.",
      badge: "Multilingual",
      gradient: "from-indigo-500/10 via-purple-500/5 to-transparent",
      borderColor: "hover:border-indigo-500/40",
      colSpan: "lg:col-span-4",
    },
    {
      icon: <FileCode className="w-6 h-6 text-rose-500" />,
      title: "Rich Exporters & API",
      description:
        "Export instantly to JSON, SRT, VTT, or raw TXT. Fully compatible with Premiere Pro, DaVinci Resolve, and REST APIs.",
      badge: "Developer Friendly",
      gradient: "from-rose-500/10 via-pink-500/5 to-transparent",
      borderColor: "hover:border-rose-500/40",
      colSpan: "lg:col-span-4",
    },
  ];

  return (
    <section id="features" className="w-full py-24 relative overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <Zap className="w-3.5 h-3.5 fill-current" /> Architected for Extreme
            Throughput
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Everything You Need for Enterprise{" "}
            <br className="hidden sm:inline" />
            <span className="gradient-text-purple">Speech Intelligence</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Stop paying per-minute markup fees to black-box APIs. Voxly
            gives you raw GPU speed, full privacy control, and sub-second
            transcription.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className={`${feat.colSpan} group relative rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl p-8 transition-all duration-300 ${feat.borderColor} hover:shadow-2xl hover:-translate-y-1 overflow-hidden flex flex-col justify-between`}
            >
              {/* Card Radial Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
              ></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shadow-sm">
                    {feat.icon}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400 group/link">
                <span>Learn specifications</span>
                <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
