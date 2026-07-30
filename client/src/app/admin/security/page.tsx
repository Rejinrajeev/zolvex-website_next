"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ShieldCheck, KeyRound, QrCode, Smartphone, Laptop, Trash2, CheckCircle2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Session {
  _id: string;
  ipAddress: string;
  userAgent: string;
  browser: string;
  os: string;
  lastActiveAt: string;
}

export default function AdminSecurityPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [mfaSecret, setMfaSecret] = useState<string | null>(null);
  const [otpAuthUrl, setOtpAuthUrl] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSetupMFA = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("zolvex_token");
      const res = await fetch("/api/v1/auth/mfa/setup", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success && json.data) {
        setMfaSecret(json.data.secret);
        setOtpAuthUrl(json.data.otpAuthUrl);
      }
    } catch (e) {
      console.error("Setup MFA failed:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleEnableMFA = async () => {
    setLoading(true);
    setSuccessMsg("");
    try {
      const token = localStorage.getItem("zolvex_token");
      const res = await fetch("/api/v1/auth/mfa/enable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ code: verificationCode })
      });
      const json = await res.json();
      if (json.success && json.data) {
        setMfaEnabled(true);
        setBackupCodes(json.data.backupCodes || []);
        setSuccessMsg("TOTP Multi-Factor Authentication successfully enabled!");
      }
    } catch (e) {
      console.error("Enable MFA failed:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center space-x-2">
              <ShieldCheck className="w-7 h-7 text-primary" />
              <span>Enterprise Security & Device Management</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Configure TOTP Multi-Factor Authentication (MFA), download recovery backup codes, and revoke remote device sessions.
            </p>
          </div>
        </div>

        {successMsg && (
          <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-2xl flex items-center space-x-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* TOTP MFA Card */}
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Google Authenticator (TOTP MFA)</h2>
                <p className="text-xs text-neutral-400">Mandatory 2FA protection for administrative accounts.</p>
              </div>
            </div>

            {!mfaSecret && !mfaEnabled && (
              <Button
                onClick={handleSetupMFA}
                disabled={loading}
                className="w-full py-3 rounded-xl bg-primary text-neutral-950 font-bold text-xs"
              >
                Configure TOTP Authenticator
              </Button>
            )}

            {mfaSecret && !mfaEnabled && (
              <div className="space-y-4 pt-2 border-t border-neutral-800">
                <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 text-center space-y-2">
                  <span className="text-xs font-bold text-neutral-400 block">TOTP Secret Key (Manual Entry)</span>
                  <code className="text-sm font-mono font-black text-primary tracking-wider select-all block">
                    {mfaSecret}
                  </code>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300">Enter 6-Digit Code from Authenticator App</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="123456"
                    className="w-full text-center tracking-widest font-mono font-bold py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-primary outline-none focus:border-primary"
                  />
                </div>

                <Button
                  onClick={handleEnableMFA}
                  disabled={loading || verificationCode.length < 6}
                  className="w-full py-3 rounded-xl bg-primary text-neutral-950 font-bold text-xs"
                >
                  Verify Code & Enable MFA
                </Button>
              </div>
            )}

            {mfaEnabled && (
              <div className="space-y-4 pt-2">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-xs font-semibold text-emerald-400 flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Two-Factor Authentication is currently active on your account.</span>
                </div>

                {backupCodes.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-neutral-300 block">Emergency Backup Recovery Codes</span>
                    <div className="grid grid-cols-2 gap-2 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                      {backupCodes.map((code, i) => (
                        <code key={i} className="text-xs font-mono font-bold text-primary text-center py-1 bg-neutral-900 rounded-md">
                          {code}
                        </code>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Active Devices & Sessions Card */}
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Active Devices & Sessions</h2>
                <p className="text-xs text-neutral-400">Review all active devices logged into your admin account.</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { id: "s1", browser: "Chrome 122.0", os: "macOS Sonoma", ip: "127.0.0.1 (Current)", active: "Just now" },
                { id: "s2", browser: "Safari Mobile", os: "iOS 17.3", ip: "103.22.41.12", active: "2 hours ago" }
              ].map((s) => (
                <div key={s.id} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white block">{s.browser} on {s.os}</span>
                    <span className="text-[10px] text-neutral-400 block font-mono">{s.ip} • {s.active}</span>
                  </div>

                  <button
                    className="p-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-neutral-900 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
