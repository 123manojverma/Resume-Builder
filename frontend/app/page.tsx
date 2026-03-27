"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  FileText,
  CheckCircle,
  Zap,
  BrainCircuit,
  Upload,
  Download,
  Shield,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const FEATURES = [
  {
    icon: Zap,
    color: "indigo",
    title: "Lightning Fast",
    desc: "Generate perfectly structured, tailored resumes in under 30 seconds.",
  },
  {
    icon: FileText,
    color: "violet",
    title: "ATS Optimized",
    desc: "Engineered to pass Applicant Tracking Systems without losing formatting.",
  },
  {
    icon: Shield,
    color: "fuchsia",
    title: "High Match Rate",
    desc: "Precision-matched to each job description to maximize your chances.",
  },
  {
    icon: BrainCircuit,
    color: "blue",
    title: "AI Interview Prep",
    desc: "Get personalized technical and behavioral questions with model answers.",
  },
  {
    icon: TrendingUp,
    color: "emerald",
    title: "Skill Gap Analysis",
    desc: "Instantly see what skills you're missing and how critical each gap is.",
  },
  {
    icon: Download,
    color: "rose",
    title: "Instant PDF Export",
    desc: "Download a clean, professional PDF resume ready to send in one click.",
  },
];

const STEPS = [
  {
    num: "01",
    icon: Upload,
    title: "Upload Your Resume",
    desc: "Drop your existing resume PDF and paste the job description you're targeting.",
  },
  {
    num: "02",
    icon: BrainCircuit,
    title: "AI Analyzes & Adapts",
    desc: "Our AI rewrites and tailors your resume to match the role with pinpoint precision.",
  },
  {
    num: "03",
    icon: CheckCircle,
    title: "Prep & Download",
    desc: "Review your interview guide, practice AI questions, then export your polished PDF.",
  },
];

const colorMap: Record<string, string> = {
  indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.12)]",
  violet: "bg-violet-500/10 border-violet-500/20 text-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.12)]",
  fuchsia: "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.12)]",
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.12)]",
  emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.12)]",
  rose: "bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.12)]",
};

export default function Home() {
  return (
    <div className="flex-1 bg-[#0a0a0b] overflow-x-hidden selection:bg-indigo-500/30">
      {/* ── Fixed ambient glows ─────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/15 blur-[130px]" />
        <div className="absolute top-[30%] right-[-15%] w-[40%] h-[50%] rounded-full bg-violet-600/15 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[40%] rounded-full bg-fuchsia-600/15 blur-[130px]" />
      </div>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative z-10 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-5xl w-full flex flex-col items-center gap-8"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.15)]"
          >
            <Sparkles className="h-4 w-4" />
            AI-Powered Resume Builder
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white !leading-[1.08]"
          >
            Land Your Dream Job{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">
              10× Faster
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-lg sm:text-xl leading-relaxed text-zinc-400"
          >
            AI generates a perfectly tailored resume and a personalised interview
            prep kit — matched to your exact job description — in under 60 seconds.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center items-center"
          >
            <Link href="/register" className="w-full sm:w-auto relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl blur opacity-50 group-hover:opacity-90 transition duration-300" />
              <Button
                size="lg"
                className="relative z-10 w-full h-14 text-base px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl gap-2 border-0 hover:scale-105 active:scale-95 transition-transform"
              >
                Start for Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full h-14 text-base px-10 rounded-2xl bg-white/5 hover:bg-white/10 text-white border-white/10 backdrop-blur-sm hover:border-white/20 transition-all"
              >
                Sign In
              </Button>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-6 mt-2 text-sm text-zinc-500"
          >
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-zinc-600" /> 500+ professionals
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-500" /> 4.9 / 5 avg rating
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-500" /> No credit card
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center gap-4 text-center mb-16"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-400 uppercase tracking-widest">
              How It Works
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Three steps to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                interview-ready
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="max-w-xl text-zinc-400 text-lg">
              No fluff, no complexity. Just an incredibly powerful AI workflow.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative flex flex-col gap-5 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.05] hover:border-white/20 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors select-none">
                    {step.num}
                  </span>
                  <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                    <step.icon className="h-6 w-6 text-indigo-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center gap-4 text-center mb-16"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Everything Included
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Built for serious{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                job seekers
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="max-w-xl text-zinc-400 text-lg">
              Every feature you need to go from resume to offer letter — all in one place.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col gap-4 p-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all group"
              >
                <div className={`h-14 w-14 rounded-2xl border flex items-center justify-center ${colorMap[feat.color]}`}>
                  <feat.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1.5">{feat.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-fuchsia-500/10 p-12 text-center backdrop-blur-md shadow-[0_0_60px_rgba(99,102,241,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="h-16 w-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.25)]">
                <Sparkles className="h-8 w-8 text-indigo-400" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Ready to get hired?
              </h2>
              <p className="text-zinc-400 text-lg max-w-lg leading-relaxed">
                Join hundreds of professionals who accelerated their job search with AI-powered precision.
              </p>
              <Link href="/register">
                <Button
                  size="lg"
                  className="h-14 px-12 text-base rounded-2xl bg-white hover:bg-zinc-200 text-black font-bold shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 transition-all gap-2"
                >
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/5 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            </div>
            <span className="font-bold text-white">ResumeBuilder AI</span>
          </div>
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} ResumeBuilder AI. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-sm text-zinc-500">
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
            <Link href="/register" className="hover:text-white transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
