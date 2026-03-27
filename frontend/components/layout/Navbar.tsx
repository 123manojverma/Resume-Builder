"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, LayoutDashboard, Loader2, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get("/api/auth/get-me");
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, [pathname]);

    const handleLogout = async () => {
        try {
            await axios.get("/api/auth/logout");
            setIsAuthenticated(false);
            router.push("/");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/5 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                <Sparkles className="h-4 w-4 text-indigo-400" />
                            </div>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">ResumeBuilder</span>
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        {isAuthenticated === null ? (
                            <Loader2 className="h-5 w-5 animate-spin text-zinc-600" />
                        ) : isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <Link href="/dashboard">
                                    <Button variant="ghost" className="text-sm font-bold gap-2 hidden sm:flex text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl">
                                        <LayoutDashboard className="h-4 w-4" />
                                        Dashboard
                                    </Button>
                                </Link>
                                <div className="w-[1px] h-5 bg-white/10 mx-1 hidden sm:block" />
                                <Button onClick={handleLogout} variant="ghost" className="text-sm font-bold gap-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl">
                                    <LogOut className="h-4 w-4" />
                                    Sign out
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login">
                                    <Button variant="ghost" className="text-sm font-bold hidden sm:inline-flex text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl">Log in</Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="text-sm font-bold rounded-xl bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all">Get Started</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
