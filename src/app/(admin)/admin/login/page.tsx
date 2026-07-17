"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Lock, User, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorCode(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setErrorCode(err.message || "Failed to log in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] -z-10"></div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10 relative">
        {/* Glow corner */}
        <div className="absolute -top-px -left-px right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>

        <div className="text-center mb-8">
          <div className="inline-flex p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400 mb-4 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">ATHECS ACADEMY</h2>
          <p className="text-slate-400 text-sm mt-2">Administrative Console Access</p>
        </div>

        {errorCode && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-2xl flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="text-sm font-medium">{errorCode}</div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-slate-200 text-xs font-semibold uppercase tracking-wider block">
              Username
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <User className="h-4 w-4" />
              </span>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                className="pl-10 bg-slate-900/50 border-white/10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl py-5"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-200 text-xs font-semibold uppercase tracking-wider block">
              Password
            </Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Lock className="h-4 w-4" />
              </span>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10 bg-slate-900/50 border-white/10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl py-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold py-3.5 rounded-xl border border-blue-500/30 transition-all duration-200 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-block animate-spin border-2 border-white border-t-transparent rounded-full h-4 w-4"></span>
            ) : (
              <>
                <LogIn className="h-4 w-4" /> Sign In
              </>
            )}
          </Button>
        </form>
      </div>
      <p className="text-slate-600 text-xs mt-8">© 2026 ATHECS Academy. All rights reserved.</p>
    </div>
  );
}
