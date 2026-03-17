import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 overflow-hidden relative">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-200 via-transparent to-transparent dark:from-zinc-800 opacity-50"></div>

      <div className="z-10 max-w-4xl w-full text-center flex flex-col items-center gap-8 py-20">
        <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white/50 px-3 py-1 text-sm font-medium backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/50">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
          Now supporting ultra-fast PDF exports
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 !leading-[1.1]">
          Craft your <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">professional story</span> with precision.
        </h1>

        <p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
          A premium, high-performance resume builder designed to help you stand out. Create, manage, and seamlessly export your professional portfolio.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full h-14 text-base px-8 rounded-xl shadow-xl shadow-black/5 dark:shadow-white/5 transition-transform hover:scale-105">
              Start Building Free
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full h-14 text-base px-8 rounded-xl bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50 transition-transform hover:scale-105">
              Sign In to Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
