"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, FileText, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface User {
    id: string;
    username: string;
    email: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/api/auth/get-me");
                setUser(response.data.user);
            } catch (err: any) {
                setError("Failed to load user data. Please log in again.");
                router.push("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
        );
    }

    if (error || !user) {
        return null; // The useEffect will handle redirection
    }

    return (
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome, {user.username}!</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                    Manage your resumes and professional footprint.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="flex flex-col h-[280px] border-dashed border-2 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer group">
                    <CardContent className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <PlusCircle className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">Create New Resume</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-[200px]">
                                Start building a new professional resume from scratch.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Temporary Placeholder for future resumes */}
                <Card className="flex flex-col h-[280px] hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-500" />
                            Software Engineer
                        </CardTitle>
                        <CardDescription>Updated 2 days ago</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
                            <div className="absolute top-4 left-4 right-4 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                            <div className="absolute top-8 left-4 right-12 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                            <div className="absolute top-12 left-4 right-8 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                        </div>
                    </CardContent>
                    <div className="p-6 pt-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button className="w-full" variant="outline">Edit Resume</Button>
                    </div>
                </Card>
            </div>

            <div className="mt-12 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <h3 className="text-lg font-semibold mb-2">Account Profile</h3>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                    <p><strong className="font-medium text-zinc-900 dark:text-zinc-100">Username:</strong> {user.username}</p>
                    <p><strong className="font-medium text-zinc-900 dark:text-zinc-100">Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>
    );
}
