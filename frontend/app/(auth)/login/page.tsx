"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, Sparkles, ArrowRight, BrainCircuit, FileText, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const PERKS = [
  { icon: BrainCircuit, text: "AI-tailored resumes in seconds" },
  { icon: FileText, text: "ATS-optimized PDF downloads" },
  { icon: CheckCircle, text: "Personalized interview prep kit" },
];

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            setError(null);
            await axios.post("/api/auth/signin", data);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid email or password.");
        }
    };

    return (
        <div className="flex-1 flex min-h-[calc(100vh-4rem)] bg-[#0a0a0b]">
            {/* Left Panel — Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full bg-indigo-600/15 blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/15 blur-[120px]" />
                </div>
                <div className="relative z-10 max-w-md text-center flex flex-col items-center gap-8">
                    <div className="h-20 w-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.2)]">
                        <Sparkles className="h-10 w-10 text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                            Welcome back to{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                                ResumeBuilder AI
                            </span>
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Your next interview-ready resume is just a few clicks away.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 w-full mt-4">
                        {PERKS.map((perk, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                                    <perk.icon className="h-5 w-5 text-indigo-400" />
                                </div>
                                <p className="font-semibold text-zinc-300">{perk.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel — Form */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    <div className="mb-10">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Sign in</h1>
                        <p className="text-zinc-400">Enter your credentials to access your workspace.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/10 text-red-400 text-sm font-medium p-4 rounded-2xl border border-red-500/20"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-zinc-300 font-semibold text-sm">Email address</Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register("email")}
                                    className={`pl-11 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 ${errors.email ? "border-red-500/50" : ""}`}
                                />
                            </div>
                            {errors.email && <p className="text-sm text-red-400 font-medium">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-zinc-300 font-semibold text-sm">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password")}
                                    className={`pl-11 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 ${errors.password ? "border-red-500/50" : ""}`}
                                />
                            </div>
                            {errors.password && <p className="text-sm text-red-400 font-medium">{errors.password.message}</p>}
                        </div>

                        <Button
                            className="w-full h-13 text-base font-bold gap-2 rounded-xl mt-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_25px_rgba(79,70,229,0.3)] transition-all hover:scale-[1.02] active:scale-95 border-0"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-zinc-500 mt-8">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                            Create one free
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
