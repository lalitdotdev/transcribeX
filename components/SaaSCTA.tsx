"use client";

import React from "react";
import { ArrowRight, Sparkles, Github, Terminal } from "lucide-react";
import Link from "next/link";

export default function SaaSCTA() {
  return (
    <section className="w-full py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white border border-purple-500/30 shadow-2xl shadow-purple-500/10">
          {/* Radial Glow Overlay */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-400/30">
              <Sparkles className="w-3.5 h-3.5" /> High-Performance AI Audio Stack
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Accelerate Your Speech-to-Text Pipeline?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Start transcribing audio with OpenAI Whisper-v3 and Flash Attention 2 in less than 2 minutes. Try the interactive playground or deploy serverless on Modal.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/tryit"
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#host"
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all flex items-center gap-2"
              >
                <Terminal className="w-4 h-4 text-purple-400" />
                <span>Deploy Script Docs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
