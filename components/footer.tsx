"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 relative overflow-hidden font-sans">
      {/* Background glow overlay */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-purple-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Image
                    src="/logo.svg"
                    width={20}
                    height={20}
                    alt="Voxly Logo"
                  />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Voxly
              </span>
            </Link>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Enterprise-grade speech-to-text platform powered by OpenAI Whisper
              large-v3 & Flash Attention 2. Built for ultra-low latency, zero
              data retention, and 100% self-hosting.
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All GPU Systems Operational (99.99%)
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="#features"
                  className="hover:text-purple-400 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/tryit"
                  className="hover:text-purple-400 transition-colors"
                >
                  Playground
                </Link>
              </li>
              <li>
                <Link
                  href="#benchmarks"
                  className="hover:text-purple-400 transition-colors"
                >
                  Benchmarks
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="hover:text-purple-400 transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Developers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="#host"
                  className="hover:text-purple-400 transition-colors"
                >
                  Modal Deployment
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/lalitdotdev"
                  target="_blank"
                  className="hover:text-purple-400 transition-colors"
                >
                  GitHub Repository
                </Link>
              </li>
              <li>
                <Link
                  href="https://huggingface.co/openai/whisper-large-v3"
                  target="_blank"
                  className="hover:text-purple-400 transition-colors"
                >
                  Whisper-v3 Weights
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Col 3 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Community & Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="https://forms.gle"
                  target="_blank"
                  className="hover:text-purple-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Submit Feedback</span>{" "}
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://ko-fi.com"
                  target="_blank"
                  className="hover:text-purple-400 transition-colors inline-flex items-center gap-1"
                >
                  <span>Support Project</span>{" "}
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>Crafted & Maintained by</span>
            <Link
              href="https:///"
              target="_blank"
              className="font-bold text-slate-300 hover:text-purple-400 transition-colors underline"
            >
              Lalit Sharma
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <span>
              © {new Date().getFullYear()} Voxly. Open Source software
              under MIT License.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
