"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, User, Sparkles, ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const PERKS = [
  { icon: Zap, text: "Resume built in under 60 seconds" },
  { icon: Shield, text: "ATS-bypassing format, guaranteed" },
  { icon: TrendingUp, text: "Real match scores per job description" },
];

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            setError(null);
            await axios.post("/api/auth/signup", data);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex-1 flex min-h-[calc(100vh-4rem)] bg-[#0a0a0b]">
            {/* Left Panel — Form */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    <div className="mb-10">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Create account</h1>
                        <p className="text-zinc-400">Free forever. No credit card required.</p>
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
                            <Label htmlFor="username" className="text-zinc-300 font-semibold text-sm">Username</Label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <Input
                                    id="username"
                                    placeholder="johndoe"
                                    {...register("username")}
                                    className={`pl-11 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 ${errors.username ? "border-red-500/50" : ""}`}
                                />
                            </div>
                            {errors.username && <p className="text-sm text-red-400 font-medium">{errors.username.message}</p>}
                        </div>

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
                                    placeholder="Min. 6 characters"
                                    {...register("password")}
                                    className={`pl-11 h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 ${errors.password ? "border-red-500/50" : ""}`}
                                />
                            </div>
                            {errors.password && <p className="text-sm text-red-400 font-medium">{errors.password.message}</p>}
                        </div>

                        <Button
                            className="w-full h-13 text-base font-bold gap-2 rounded-xl mt-2 bg-white hover:bg-zinc-200 text-black shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all hover:scale-[1.02] active:scale-95 border-0"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Creating your account...
                                </>
                            ) : (
                                <>
                                    Create free account <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </Button>

                        <p className="text-center text-xs text-zinc-600 pt-2">
                            By creating an account you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </form>

                    <p className="text-center text-sm text-zinc-500 mt-8">
                        Already have an account?{" "}
                        <Link href="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right Panel — Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full bg-violet-600/15 blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/15 blur-[120px]" />
                </div>
                <div className="relative z-10 max-w-md text-center flex flex-col items-center gap-8">
                    <div className="h-20 w-20 rounded-3xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.2)]">
                        <Sparkles className="h-10 w-10 text-violet-400" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                            Join{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                                500+ professionals
                            </span>{" "}
                            getting hired faster
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            Stop guessing what recruiters want. Let AI show you exactly.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 w-full mt-4">
                        {PERKS.map((perk, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                                <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                                    <perk.icon className="h-5 w-5 text-violet-400" />
                                </div>
                                <p className="font-semibold text-zinc-300">{perk.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
