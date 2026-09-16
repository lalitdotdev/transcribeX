"use client";

import React from "react";
import { Check, Sparkles, ArrowRight, ShieldCheck, Terminal, Server, Building } from "lucide-react";
import Link from "next/link";

export default function SaaSPricing() {
  const plans = [
    {
      name: "Open Source & Self-Host",
      icon: <Terminal className="w-5 h-5 text-slate-700 dark:text-slate-300" />,
      price: "$0",
      period: "forever free",
      description: "Ideal for hackers, researchers, and teams with their own GPU servers.",
      features: [
        "Full GitHub repository access",
        "Modal & Docker deployment scripts",
        "Insanely Fast Whisper CLI integration",
        "Community Discord support",
        "100% data privacy & local hosting",
      ],
      ctaText: "Deploy Code Base",
      ctaHref: "#host",
      featured: false,
    },
    {
      name: "Serverless GPU Cloud",
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      badge: "MOST POPULAR",
      price: "$0.002",
      period: "per audio minute",
      description: "On-demand GPU transcription powered by Modal serverless infrastructure.",
      features: [
        "OpenAI Whisper large-v3 model",
        "Flash Attention 2 accelerated",
        "Multi-speaker diarization enabled",
        "Sub-50ms queue latency",
        "JSON, SRT, VTT, and TXT exporters",
        "80 concurrent streams per instance",
      ],
      ctaText: "Try Serverless Demo",
      ctaHref: "/tryit",
      featured: true,
    },
    {
      name: "Enterprise Dedicated",
      icon: <Building className="w-5 h-5 text-cyan-500" />,
      price: "Custom",
      period: "volume pricing",
      description: "Dedicated GPU clusters deployed inside your AWS / GCP Virtual Private Cloud.",
      features: [
        "Dedicated A10G / A100 GPU clusters",
        "Custom vocabulary & fine-tuning",
        "HIPAA & SOC-2 compliance support",
        "99.99% Uptime SLA Guarantee",
        "Dedicated 24/7 Solutions Engineer",
      ],
      ctaText: "Contact Sales",
      ctaHref: "https://ko-fi.com",
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="w-full py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Server className="w-3.5 h-3.5" /> Flexible Deployment Models
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Transparent Pricing. <br className="hidden sm:inline" />
            <span className="gradient-text-purple">Zero Hidden Fees.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Choose between self-hosting on your hardware or utilizing our serverless cloud API.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.featured
                  ? "bg-white dark:bg-slate-900 border-2 border-purple-500 shadow-2xl shadow-purple-500/20 md:-translate-y-2"
                  : "bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
                  {plan.badge}
                </span>
              )}

              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {plan.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>
                </div>

                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/{plan.period}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="w-full h-px bg-slate-200/80 dark:bg-slate-800/80 mb-6"></div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-950/80 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={plan.ctaHref}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  plan.featured
                    ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white shadow-md hover:shadow-lg hover:shadow-purple-500/25 hover:opacity-95"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
