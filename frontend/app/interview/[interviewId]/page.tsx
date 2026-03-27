"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
    Loader2,
    ArrowLeft,
    Download,
    Brain,
    CheckCircle2,
    AlertCircle,
    HelpCircle,
    Lightbulb,
    CalendarDays,
    ChevronDown,
    Activity,
    Target,
    Zap
} from "lucide-react";

import { Button } from "@/components/ui/button";

/* ──────────────────────────── types ──────────────────────────── */
interface Question {
    question: string;
    intention: string;
    answer: string;
}

interface SkillGap {
    skill: string;
    severity: "low" | "medium" | "high";
}

interface PrepDay {
    day: number;
    focus: string;
    tasks: string[];
}

interface InterviewReport {
    _id: string;
    title: string;
    matchScore: number;
    createdAt: string;
    technicalQuestions: Question[];
    behavioralQuestions: Question[];
    skillGaps: SkillGap[];
    preparationPlan: PrepDay[];
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

/* ──────────────────────── helper components ──────────────────── */
function ScoreBadge({ score }: { score: number }) {
    const isHigh = score >= 70;
    const isMed = score >= 45 && score < 70;
    
    const color = isHigh 
        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
        : isMed 
        ? "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
        : "text-red-400 bg-red-500/10 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]";

    return (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold tracking-wide ${color}`}>
            <Target className="h-4 w-4" />
            Match: {score}%
        </div>
    );
}

function SeverityBadge({ severity }: { severity: SkillGap["severity"] }) {
    const map = {
        high: "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]",
        medium: "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]",
        low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]",
    };
    return (
        <span className={`text-[11px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border ${map[severity]}`}>
            {severity}
        </span>
    );
}

function AccordionQuestion({ q, index, type }: { q: Question; index: number, type: "tech" | "behav" }) {
    const [open, setOpen] = useState(false);
    
    const colorClass = type === "tech" ? "indigo" : "violet";
    const bgClass = type === "tech" ? "bg-indigo-500/10" : "bg-violet-500/10";
    const textClass = type === "tech" ? "text-indigo-400" : "text-violet-400";
    const borderClass = type === "tech" ? "border-indigo-500/20" : "border-violet-500/20";
    const darkBgClass = type === "tech" ? "hover:bg-indigo-500/5 hover:border-indigo-500/20" : "hover:bg-violet-500/5 hover:border-violet-500/20";

    return (
        <div className="border border-white/5 bg-white/[0.02] rounded-2xl overflow-hidden transition-all duration-300 relative group">
            <button
                className={`w-full flex items-start gap-4 p-5 text-left transition-colors border border-transparent ${darkBgClass}`}
                onClick={() => setOpen(!open)}
            >
                <span className={`shrink-0 h-8 w-8 rounded-xl ${bgClass} ${textClass} border ${borderClass} font-bold flex items-center justify-center`}>
                    {index + 1}
                </span>
                <span className="flex-1 font-semibold text-[15px] text-zinc-100 leading-relaxed pt-1">
                    {q.question}
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 mt-1 transition-transform duration-300 ${open ? "rotate-180 text-white" : "text-zinc-500 group-hover:text-white"}`} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 overflow-hidden border-t border-white/5 bg-black/20"
                    >
                        <div className="pt-5 space-y-6">
                            <div className="flex gap-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                                <HelpCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[11px] font-bold text-amber-500/70 uppercase tracking-widest mb-1.5">Intention</p>
                                    <p className="text-sm font-medium text-amber-100 leading-relaxed">{q.intention}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                <Lightbulb className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[11px] font-bold text-emerald-500/70 uppercase tracking-widest mb-1.5">How to Answer</p>
                                    <p className="text-sm font-medium text-emerald-100 leading-relaxed">{q.answer}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ────────────────────────── main page ───────────────────────── */
export default function InterviewReportPage() {
    const params = useParams();
    const router = useRouter();
    const reportId = params.interviewId as string;

    const [report, setReport] = useState<InterviewReport | null>(null);
    const [loading, setLoading] = useState(true);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`/api/interview/report/${reportId}`);
                setReport(res.data.interviewReport);
            } catch (err: any) {
                if (err.response?.status === 401) router.push("/login");
                else setError("Failed to load report.");
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [reportId, router]);

    const handleDownloadPdf = async () => {
        setPdfLoading(true);
        try {
            const res = await axios.post(
                `/api/interview/resume/pdf/${reportId}`,
                {},
                { responseType: "blob", withCredentials: true }
            );
            const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
            const a = document.createElement("a");
            a.href = url;
            a.download = `resume-${reportId}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch {
            alert("Failed to generate resume PDF. Please try again.");
        } finally {
            setPdfLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0a0a0b] min-h-[calc(100vh-4rem)]">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-500 mb-4" />
                <p className="text-zinc-500 font-medium tracking-wide">Retrieving AI records...</p>
            </div>
        );
    }

    if (error || !report) {
        return (
            <div className="flex-1 flex items-center justify-center p-8 bg-[#0a0a0b] min-h-[calc(100vh-4rem)]">
                <div className="max-w-md w-full text-center p-8 rounded-3xl bg-red-500/5 border border-red-500/20 backdrop-blur-md">
                    <AlertCircle className="h-14 w-14 text-red-500 mx-auto mb-4" />
                    <p className="font-bold text-white text-xl mb-6">{error || "Report not found."}</p>
                    <Link href="/dashboard">
                        <Button className="rounded-xl bg-white text-black hover:bg-zinc-200 shadow-md transition-all active:scale-95 font-bold px-8">Return to Safety</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 w-full bg-[#0a0a0b] min-h-[calc(100vh-4rem)] selection:bg-indigo-500/30 pb-24 pt-6">
            {/* Ambient Backgrounds */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[0%] left-[20%] w-[30%] h-[40%] rounded-full bg-indigo-600/10 blur-[130px]" />
                <div className="absolute top-[40%] right-[-10%] w-[40%] h-[30%] rounded-full bg-violet-600/10 blur-[120px]" />
                <div className="absolute bottom-[0%] left-[-10%] w-[30%] h-[40%] rounded-full bg-fuchsia-600/10 blur-[130px]" />
            </div>

            <motion.div 
                className="max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-10 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Back */}
                <motion.div variants={itemVariants}>
                    <Link href="/dashboard" className="outline-none inline-block">
                        <Button variant="ghost" className="gap-2 -ml-4 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all font-bold">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Workspace
                        </Button>
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                                <Brain className="h-6 w-6 text-indigo-400" />
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-white">{report.title}</h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 pl-[4.5rem]">
                            <ScoreBadge score={report.matchScore} />
                            <span className="text-sm font-semibold text-zinc-500 flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 opacity-70" />
                                {new Date(report.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                    </div>
                    <Button
                        onClick={handleDownloadPdf}
                        disabled={pdfLoading}
                        className="gap-3 h-14 px-6 rounded-2xl bg-white hover:bg-zinc-200 text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] font-bold transition-all shrink-0 relative z-10"
                    >
                        {pdfLoading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Processing PDF…
                            </>
                        ) : (
                            <>
                                <Download className="h-5 w-5" />
                                Export Resume
                            </>
                        )}
                    </Button>
                </motion.div>

                {/* Match Score Bar */}
                <motion.div variants={itemVariants} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md overflow-hidden relative">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <Activity className="h-3.5 w-3.5" /> Profiling Matrix
                        </h3>
                        <span className="font-black text-3xl tabular-nums text-white">{report.matchScore}%</span>
                    </div>
                    
                    <div className="h-4 bg-black/40 rounded-full overflow-hidden p-1 border border-white/5 shadow-inner">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${report.matchScore}%` }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                            className={`h-full rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] ${
                                report.matchScore >= 70
                                    ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                                    : report.matchScore >= 45
                                    ? "bg-gradient-to-r from-amber-500 to-amber-400"
                                    : "bg-gradient-to-r from-red-500 to-red-400"
                            }`}
                        />
                    </div>
                </motion.div>

                {/* Technical Questions */}
                <motion.div variants={itemVariants} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                                <span className="h-8 w-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[13px] font-bold flex items-center justify-center">
                                    {report.technicalQuestions.length}
                                </span>
                                Technical Interview
                            </h2>
                            <p className="text-zinc-500 text-sm mt-2 ml-11">Deep-dive technical inquiries with strategies & intentionality mapped out.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {report.technicalQuestions.map((q, i) => (
                            <AccordionQuestion key={i} q={q} index={i} type="tech" />
                        ))}
                    </div>
                </motion.div>

                {/* Behavioral Questions */}
                <motion.div variants={itemVariants} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                                <span className="h-8 w-8 rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30 text-[13px] font-bold flex items-center justify-center">
                                    {report.behavioralQuestions.length}
                                </span>
                                Behavioral Insights
                            </h2>
                            <p className="text-zinc-500 text-sm mt-2 ml-11">Culture-fit & behavioral scenarios to frame your previous experiences securely.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {report.behavioralQuestions.map((q, i) => (
                            <AccordionQuestion key={i} q={q} index={i} type="behav" />
                        ))}
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Skill Gaps */}
                    <motion.div variants={itemVariants} className="h-full">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md h-full">
                            <h2 className="text-lg font-bold flex items-center gap-3 text-white mb-6">
                                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                                Missing Correlatives
                            </h2>
                            <p className="text-sm font-medium text-zinc-500 mb-6">Identified gaps directly impacting your matching matrix against the specified role.</p>
                            
                            <div className="flex flex-col gap-3">
                                {report.skillGaps.map((gap, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-wrap items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 transition-all hover:bg-white/5"
                                    >
                                        <span className="text-[15px] font-semibold text-zinc-200">{gap.skill}</span>
                                        <SeverityBadge severity={gap.severity} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Preparation Plan */}
                    <motion.div variants={itemVariants} className="h-full">
                        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 backdrop-blur-md h-full relative overflow-hidden group">
                           <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none opacity-50 transition-opacity" />
                            <h2 className="text-lg font-bold flex items-center gap-3 text-white mb-6 relative z-10">
                                <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                                    <CalendarDays className="h-5 w-5 text-emerald-400" />
                                </div>
                                Execution Action Plan
                            </h2>
                            <div className="space-y-6 relative z-10 pl-2">
                                {report.preparationPlan.map((day) => (
                                    <div key={day.day} className="flex gap-4 group/item relative">
                                        <div className="flex flex-col items-center">
                                            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-black flex items-center justify-center shrink-0 z-10 shadow-inner group-hover/item:bg-emerald-500/20 group-hover/item:border-emerald-500/40 transition-colors">
                                                D{day.day}
                                            </div>
                                            {day.day < report.preparationPlan.length && (
                                                <div className="w-[2px] flex-1 bg-gradient-to-b from-emerald-500/20 to-transparent mt-2" />
                                            )}
                                        </div>
                                        <div className="pb-6 flex-1 pt-2">
                                            <p className="font-extrabold text-white text-base tracking-wide mb-3">
                                                {day.focus}
                                            </p>
                                            <ul className="space-y-2.5">
                                                {day.tasks.map((task, ti) => (
                                                    <li key={ti} className="flex items-start gap-3 text-[14px] font-medium text-emerald-200/70">
                                                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-[3px] opacity-80" />
                                                        <span className="leading-relaxed">{task}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
