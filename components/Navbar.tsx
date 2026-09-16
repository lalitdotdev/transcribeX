"use client";

import { ArrowRight, Github, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./global/mode-toggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm"
          : "bg-white/40 dark:bg-slate-950/40 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 p-0.5 shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Image
                src="/logo.svg"
                width={22}
                height={22}
                alt="TranscribeX Logo"
                className="w-5 h-5 dark:invert-0"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              Whisp<span className="gradient-text-purple">X</span>
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60">
              <Zap className="w-2.5 h-2.5 mr-1 fill-current" /> v3.0
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link
            href="#features"
            className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/tryit"
            className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            Playground
          </Link>
          <Link
            href="#host"
            className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            Deploy
          </Link>
          <Link
            href="#benchmarks"
            className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            Benchmarks
          </Link>
          <Link
            href="#pricing"
            className="px-3 py-1.5 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            Pricing
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* GitHub Star Button */}
          <Link
            href="https://github.com/lalitdotdev"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 transition-all hover:shadow-sm"
          >
            <Github className="w-4 h-4 text-slate-800 dark:text-slate-200" />
            <span>GitHub</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </Link>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* CTA Button */}
          <Link
            href="/tryit"
            className="relative inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500 shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Try Playground</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
