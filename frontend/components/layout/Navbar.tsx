"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, LayoutDashboard, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    // Check auth state
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
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 dark:bg-zinc-950/80 dark:border-zinc-800 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center">
                                <span className="text-white dark:text-black font-black text-lg">R</span>
                            </div>
                            ResumeBuilder
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {isAuthenticated === null ? (
                            <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
                        ) : isAuthenticated ? (
                            <>
                                <Link href="/dashboard">
                                    <Button variant="ghost" className="text-sm font-medium gap-2 hidden sm:flex">
                                        <LayoutDashboard className="h-4 w-4" />
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button onClick={handleLogout} variant="outline" className="text-sm font-medium gap-2">
                                    <LogOut className="h-4 w-4" />
                                    Sign out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" className="text-sm font-medium hidden sm:inline-flex">Log in</Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="text-sm font-medium shadow-md w-full">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
