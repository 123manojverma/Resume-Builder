"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { motion, Variants } from "framer-motion";
import {
    Loader2,
    FileText,
    PlusCircle,
    ChevronRight,
    BrainCircuit,
    Calendar,
    UserCircle,
    Mail,
    Sparkles,
    Activity,
    ArrowRight
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface User {
    id: string;
    username: string;
    email: string;
}

interface InterviewReport {
    _id: string;
    title: string;
    createdAt: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [reports, setReports] = useState<InterviewReport[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            try {
                const [userRes, reportsRes] = await Promise.all([
                    axios.get("/api/auth/get-me"),
                    axios.get("/api/interview"),
                ]);
                setUser(userRes.data.user);
                setReports(reportsRes.data.interviewReports);
            } catch {
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };
        init();
    }, [router]);

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0a0a0b] min-h-[calc(100vh-4rem)]">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-500 mb-4" />
                <p className="text-zinc-500 font-medium">Loading your workspace...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex-1 w-full bg-[#0a0a0b] min-h-[calc(100vh-4rem)] selection:bg-indigo-500/30 pb-20">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[40%] rounded-full bg-violet-600/10 blur-[100px]" />
            </div>

            <motion.div 
                className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-10 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-indigo-300 mb-4 backdrop-blur-sm">
                            <Sparkles className="h-3.5 w-3.5" /> Workspace overview
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">{user.username}</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-xl">
                            Manage your AI-generated interview prep materials and tailored resumes.
                        </p>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Left Column (Stats & Profile) */}
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <motion.div variants={itemVariants}>
                            <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="p-6 relative z-10">
                                    <div className="flex flex-col items-start">
                                        <div className="h-14 w-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)] mb-4 group-hover:scale-105 transition-transform">
                                            <BrainCircuit className="h-7 w-7 text-indigo-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Reports</p>
                                            <p className="text-5xl font-extrabold text-white tracking-tight">{reports.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="p-6 relative z-10">
                                    <div className="flex flex-col items-start">
                                        <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)] mb-4 group-hover:scale-105 transition-transform">
                                            <Activity className="h-7 w-7 text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Status</p>
                                            <div className="flex items-center gap-2">
                                                <div className={`h-3 w-3 rounded-full ${reports.length > 0 ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" : "bg-zinc-600"}`} />
                                                <p className="text-3xl font-bold text-white tracking-tight">
                                                    {reports.length > 0 ? "Active" : "Idle"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-4">
                            <h3 className="text-xs font-bold mb-3 text-zinc-500 uppercase tracking-widest px-1">
                                Account Profile
                            </h3>
                            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 shrink-0">
                                        <UserCircle className="h-6 w-6" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Username</p>
                                        <p className="text-base font-semibold text-zinc-200 truncate">{user.username}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 shrink-0">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Email Address</p>
                                        <p className="text-base font-semibold text-zinc-200 truncate">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column (Reports Grid) */}
                    <div className="lg:col-span-3">
                        <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <FileText className="h-5 w-5 text-indigo-400" />
                                Your Materials
                            </h2>
                            <Link href="/interview/new" className="outline-none block">
                                <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 border-0 transition-transform hover:scale-105 active:scale-95 rounded-xl">
                                    <PlusCircle className="h-4 w-4" />
                                    <span className="hidden sm:inline">New Report</span>
                                </Button>
                            </Link>
                        </motion.div>

                        {reports.length === 0 ? (
                            <motion.div variants={itemVariants}>
                                <div className="flex flex-col items-center justify-center py-24 px-4 border border-dashed border-white/10 rounded-3xl bg-white/[0.02] backdrop-blur-sm text-center">
                                    <div className="h-20 w-20 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6 shadow-inner border border-white/5">
                                        <BrainCircuit className="h-10 w-10 text-zinc-500" />
                                    </div>
                                    <h3 className="font-bold text-2xl text-white mb-3">No reports designed yet</h3>
                                    <p className="text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
                                        Upload your resume and a job description to instantly generate highly-tailored interview preparation materials and ATS-friendly PDF resumes.
                                    </p>
                                    <Link href="/interview/new">
                                        <Button size="lg" className="gap-2 rounded-xl bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95 font-bold">
                                            Create First Report <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div variants={containerVariants} className="grid sm:grid-cols-2 gap-5">
                                {/* Reports Mapping */}
                                {reports.map((report) => (
                                    <Link key={report._id} href={`/interview/${report._id}`} className="block outline-none h-full">
                                        <motion.div 
                                            variants={itemVariants}
                                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                            className="h-full min-h-[200px] rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col hover:border-indigo-500/50 hover:bg-white/[0.05] shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.2)] transition-all cursor-pointer group backdrop-blur-md relative"
                                        >
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-indigo-500/20 transition-all pointer-events-none" />
                                            <div className="p-6 flex-1 flex flex-col relative z-10">
                                                <div className="flex items-start justify-between mb-5">
                                                    <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-zinc-300 group-hover:text-indigo-400 group-hover:bg-indigo-500/20 transition-colors border border-white/5">
                                                        <FileText className="h-6 w-6" />
                                                    </div>
                                                </div>
                                                <h3 className="font-bold text-xl text-white leading-tight mb-3 line-clamp-2 pr-4">{report.title}</h3>
                                                <div className="mt-auto">
                                                    <div className="flex items-center gap-1.5 text-[13px] text-zinc-400 font-medium mb-5">
                                                        <Calendar className="h-4 w-4 opacity-70" />
                                                        {new Date(report.createdAt).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "long",
                                                            year: "numeric",
                                                        })}
                                                    </div>
                                                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                                                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Access Report</span>
                                                        <div className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white text-zinc-500 transition-colors">
                                                            <ChevronRight className="h-4 w-4" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
