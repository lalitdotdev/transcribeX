import CodeHost from "@/components/codehost/code-host";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import HeroDemoPreview from "@/components/HeroDemoPreview";
import SaaSFeatures from "@/components/SaaSFeatures";
import SaaSBenchmarks from "@/components/SaaSBenchmarks";
import SaaSPricing from "@/components/SaaSPricing";
import SaaSFaq from "@/components/SaaSFaq";
import SaaSCTA from "@/components/SaaSCTA";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";
import { ArrowRight, Sparkles, Zap, Terminal, ShieldCheck, Github, Radio } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-hidden selection:bg-purple-500/20 selection:text-purple-500">
      {/* Background Mesh Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-purple-500/10 via-indigo-500/5 to-transparent blur-[120px] pointer-events-none -z-10"></div>
      
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center gap-6">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="purple" />

        {/* Hero Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-md transition-transform hover:scale-105">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-700 dark:text-slate-200">Accelerated by</span>
          <span className="gradient-text-purple font-bold">Flash Attention v2</span>
          <span className="text-slate-400">+ Transformers</span>
        </div>

        {/* Main Hero Title */}
        <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] sm:leading-[1.1]">
          Enterprise Speech Intelligence <br />
          <span className="gradient-text-purple">at 5x Real-Time Speed</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="max-w-2xl text-slate-600 dark:text-slate-300 text-base sm:text-xl font-normal leading-relaxed">
          Sub-second transcription, multi-speaker diarization, and 99+ language detection. Deploy on serverless GPU containers or host on-premise with zero data retention.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-3">
          <Link
            href="/tryit"
            className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-500 shadow-xl shadow-purple-500/20 hover:shadow-purple-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>Try Interactive Demo</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="#host"
            className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm hover:shadow transition-all flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-purple-500" />
            <span>Host It Yourself</span>
          </Link>

          <Link
            href="https://github.com/lalitdotdev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3.5 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Stars</span>
          </Link>
        </div>

        {/* Trust Badges Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Zero Data Retention</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Sub-50ms Queue Latency</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-cyan-500" />
            <span>99.8% Word Accuracy</span>
          </div>
        </div>

        {/* Hero Interactive Demo Card */}
        <HeroDemoPreview />
      </section>

      {/* Bento Grid Features */}
      <SaaSFeatures />

      {/* Performance Benchmarks Section */}
      <SaaSBenchmarks />

      {/* Code Deployment Section */}
      <section id="host" className="w-full py-24 px-4 sm:px-6 lg:px-8">
        <CodeHost />
      </section>

      {/* Pricing Section */}
      <SaaSPricing />

      {/* FAQ Section */}
      <SaaSFaq />

      {/* Bottom SaaS CTA */}
      <SaaSCTA />

      {/* SaaS Footer */}
      <Footer />
    </div>
  );
}
