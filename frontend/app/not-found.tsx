"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-[#0a0a0b] px-4 text-center selection:bg-indigo-500/30">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-violet-600/10 blur-[100px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        <div className="h-24 w-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.1)]">
          <Search className="h-12 w-12 text-zinc-600" />
        </div>

        <div>
          <p className="text-8xl font-black text-white/5 mb-2 select-none tracking-tighter">404</p>
          <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Page not found</h1>
          <p className="text-zinc-400 max-w-sm leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Link href="/">
          <Button className="gap-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold px-8 h-12 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
