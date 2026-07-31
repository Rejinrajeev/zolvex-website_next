"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldAlert, Sparkles, KeyRound, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaTempToken, setMfaTempToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error("Invalid email or password.");
      }

      if (json.data?.mfaRequired) {
        setMfaRequired(true);
        setMfaTempToken(json.data.mfaTempToken);
      } else {
        localStorage.setItem("zolvex_token", json.data.accessToken);
        localStorage.setItem("accessToken", json.data.accessToken);
        localStorage.setItem("token", json.data.accessToken);
        router.push("/admin");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleMFAVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/v1/auth/verify-mfa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mfaTempToken, code: mfaCode })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error("Invalid verification code.");
      }

      localStorage.setItem("zolvex_token", json.data.accessToken);
      localStorage.setItem("accessToken", json.data.accessToken);
      router.push("/admin");
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 transition-colors duration-200">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-card border border-border p-8 rounded-3xl space-y-6 shadow-xl relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto border border-primary/30 shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            Zolvex <span className="text-primary">Admin Portal</span>
          </h1>
          <p className="text-xs text-muted font-medium">
            Bank-Level Encrypted Authorization Access
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-3.5 rounded-2xl text-xs font-semibold flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!mfaRequired ? (
          /* Step 1: Email & Password Form */
          <form onSubmit={handleLoginStep1} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Administrator Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground focus:border-primary outline-none transition-all font-medium"
                  placeholder="admin@zolvex.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground focus:border-primary outline-none transition-all font-medium"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primaryHover text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Authenticate Session</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

          </form>
        ) : (
          /* Step 2: TOTP 6-Digit Verification */
          <form onSubmit={handleMFAVerify} className="space-y-4">
            
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl text-center space-y-1">
              <KeyRound className="w-6 h-6 text-primary mx-auto mb-1" />
              <h3 className="text-xs font-bold text-foreground">Two-Factor Authentication Required</h3>
              <p className="text-[11px] text-muted">
                Enter the 6-digit TOTP code from Google Authenticator or your emergency recovery code.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground text-center block">6-Digit TOTP / Recovery Code</label>
              <input
                type="text"
                required
                maxLength={9}
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-mono font-black py-3 rounded-xl bg-secondaryBg/30 border border-border text-primary focus:border-primary outline-none uppercase"
                placeholder="123456"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primaryHover text-white font-extrabold text-xs shadow-md transition-all"
            >
              Verify 2FA & Log In
            </Button>

          </form>
        )}

      </div>
    </div>
  );
}
