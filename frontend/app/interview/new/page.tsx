"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, Variants } from "framer-motion";
import {
    Loader2,
    Upload,
    FileText,
    Briefcase,
    User,
    ArrowLeft,
    Sparkles,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function NewInterviewPage() {
    const router = useRouter();
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [selfDescription, setSelfDescription] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!resumeFile) {
            setError("Please upload your resume PDF.");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("resume", resumeFile);
            formData.append("selfDescription", selfDescription);
            formData.append("jobDescription", jobDescription);

            const res = await axios.post("/api/interview", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const reportId = res.data.interviewReport._id;
            router.push(`/interview/${reportId}`);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to generate report. Please try again."
            );
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 w-full bg-[#0a0a0b] min-h-[calc(100vh-4rem)] selection:bg-indigo-500/30 pb-20 pt-10">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
            </div>

            <motion.div 
                className="max-w-3xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Back link */}
                <motion.div variants={itemVariants}>
                    <Link href="/dashboard" className="inline-block outline-none">
                        <Button variant="ghost" className="gap-2 -ml-4 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 font-bold transition-all">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                </motion.div>

                {/* Page header */}
                <motion.div variants={itemVariants} className="border-b border-white/10 pb-6">
                    <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-4 text-white">
                        <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                            <Sparkles className="h-6 w-6 text-indigo-400" />
                        </div>
                        Craft a New Report
                    </h1>
                    <p className="text-zinc-400 mt-3 text-lg">
                        Upload your resume and paste a job description. Our AI will forge a masterpiece tailored specifically to your exact needs.
                    </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-500/10 text-red-400 font-medium text-sm p-4 rounded-2xl border border-red-500/20 flex flex-col gap-1"
                        >
                            <span className="font-bold text-red-300 uppercase tracking-widest text-[11px]">Error Inputting</span>
                            {error}
                        </motion.div>
                    )}

                    {/* Resume upload */}
                    <motion.div variants={itemVariants} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                <FileText className="h-5 w-5 text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Resume Blueprint</h3>
                                <p className="text-sm text-zinc-500">Provide the PDF version of your base resume.</p>
                            </div>
                        </div>
                        <Label htmlFor="resume-upload" className="cursor-pointer block mt-4">
                            <div
                                className={`flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed rounded-2xl transition-all
                                    ${resumeFile
                                        ? "border-emerald-500/50 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                        : "border-zinc-700 bg-zinc-900/50 hover:border-indigo-500/50 hover:bg-indigo-500/5"
                                    }`}
                            >
                                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-inner ${resumeFile ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/5 text-zinc-400 border border-white/10"}`}>
                                    {resumeFile ? <CheckCircle2 className="h-6 w-6" /> : <Upload className="h-6 w-6" />}
                                </div>
                                {resumeFile ? (
                                    <div className="text-center">
                                        <p className="font-bold text-emerald-400 text-lg">{resumeFile.name}</p>
                                        <p className="text-sm font-semibold text-emerald-500/70 mt-1 uppercase tracking-widest">
                                            {(resumeFile.size / 1024).toFixed(1)} KB · Click to replace
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <p className="font-bold text-zinc-300 text-lg">
                                            Click to locate PDF
                                        </p>
                                        <p className="text-sm font-semibold text-zinc-600 mt-1 uppercase tracking-widest">Supports files up to 10MB</p>
                                    </div>
                                )}
                            </div>
                            <Input
                                id="resume-upload"
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setResumeFile(e.target.files?.[0] ?? null)}
                            />
                        </Label>
                    </motion.div>

                    {/* Self Description */}
                    <motion.div variants={itemVariants} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
                                <User className="h-5 w-5 text-violet-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">About You</h3>
                                <p className="text-sm text-zinc-500">Briefly pitch your experience and goals.</p>
                            </div>
                        </div>
                        <Textarea
                            id="self-description"
                            placeholder="e.g. I'm a full-stack developer with 3 years of experience in React and Node.js, looking to transition into a senior engineering role..."
                            className="min-h-[140px] resize-none rounded-2xl bg-black/40 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 p-4"
                            value={selfDescription}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSelfDescription(e.target.value)}
                            required
                        />
                    </motion.div>

                    {/* Job Description */}
                    <motion.div variants={itemVariants} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                <Briefcase className="h-5 w-5 text-orange-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Job Target</h3>
                                <p className="text-sm text-zinc-500">Paste the complete job description text.</p>
                            </div>
                        </div>
                        <Textarea
                            id="job-description"
                            placeholder="Paste the complete job description here so we can meticulously match your strengths..."
                            className="min-h-[220px] resize-none rounded-2xl bg-black/40 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 p-4"
                            value={jobDescription}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setJobDescription(e.target.value)}
                            required
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-4 pb-10">
                        <Button
                            type="submit"
                            className="w-full h-16 text-lg font-bold gap-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-all hover:scale-[1.02] active:scale-95 border-0 disabled:opacity-70 disabled:hover:scale-100"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                    Synthesizing Brainpower...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-6 w-6" />
                                    Command AI Generation
                                </>
                            )}
                        </Button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
}
