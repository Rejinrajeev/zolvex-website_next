"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  ShieldCheck,
  KeyRound,
  QrCode,
  Smartphone,
  Laptop,
  Trash2,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  Download,
  RefreshCw,
  AlertTriangle,
  Shield,
  Activity,
  LogOut,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/api";

interface Session {
  _id: string;
  ipAddress: string;
  userAgent: string;
  browser: string;
  os: string;
  lastActiveAt: string;
  isCurrentSession?: boolean;
}

interface SecurityStats {
  mfaEnabled: boolean;
  activeSessionsCount: number;
  securityScore: number;
  lastLoginAt: string;
  lastLoginIp: string;
}

export default function AdminSecurityPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [stats, setStats] = useState<SecurityStats>({
    mfaEnabled: false,
    activeSessionsCount: 1,
    securityScore: 60,
    lastLoginAt: new Date().toISOString(),
    lastLoginIp: "127.0.0.1"
  });

  const [mfaSecret, setMfaSecret] = useState<string | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const fetchSecurityData = async () => {
    try {
      const [statsRes, sessionsRes] = await Promise.all([
        fetchWithAuth("/api/v1/auth/security-stats"),
        fetchWithAuth("/api/v1/auth/sessions")
      ]);

      const statsJson = await statsRes.json();
      const sessionsJson = await sessionsRes.json();

      if (statsJson.success && statsJson.data) {
        setStats(statsJson.data);
        setMfaEnabled(statsJson.data.mfaEnabled);
      }

      if (sessionsJson.success && sessionsJson.data) {
        setSessions(sessionsJson.data);
      }
    } catch (e) {
      console.warn("Failed to load security status:", e);
    }
  };

  const handleSetupMFA = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetchWithAuth("/api/v1/auth/mfa/setup", { method: "POST" });
      const json = await res.json();
      if (json.success && json.data) {
        setMfaSecret(json.data.secret);
        setQrCodeDataUrl(json.data.qrCodeDataUrl);
      } else {
        throw new Error(json.message || "Failed to setup MFA");
      }
    } catch (e: any) {
      setErrorMsg(e.message || "Setup MFA failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEnableMFA = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await fetchWithAuth("/api/v1/auth/mfa/enable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: verificationCode })
      });
      const json = await res.json();

      if (json.success && json.data) {
        setMfaEnabled(true);
        setBackupCodes(json.data.backupCodes || []);
        setSuccessMsg("TOTP Multi-Factor Authentication enabled successfully!");
        setMfaSecret(null);
        setQrCodeDataUrl(null);
        setVerificationCode("");
        await fetchSecurityData();
      } else {
        throw new Error(json.message || "Invalid verification code");
      }
    } catch (e: any) {
      setErrorMsg(e.message || "Failed to enable MFA");
    } finally {
      setLoading(false);
    }
  };

  const handleDisableMFA = async () => {
    if (!confirm("Are you sure you want to disable 2FA? This will lower your account security rating.")) return;
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetchWithAuth("/api/v1/auth/mfa/disable", { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setMfaEnabled(false);
        setBackupCodes([]);
        setSuccessMsg("Multi-Factor Authentication disabled.");
        await fetchSecurityData();
      }
    } catch (e: any) {
      setErrorMsg(e.message || "Disable MFA failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateBackupCodes = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetchWithAuth("/api/v1/auth/mfa/regenerate-backup-codes", { method: "POST" });
      const json = await res.json();
      if (json.success && json.data) {
        setBackupCodes(json.data.backupCodes);
        setSuccessMsg("Fresh recovery codes generated! Invalidated old backup codes.");
      }
    } catch (e: any) {
      setErrorMsg(e.message || "Regenerate backup codes failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    try {
      const res = await fetchWithAuth(`/api/v1/auth/sessions/${sessionId}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setSessions(prev => prev.filter(s => s._id !== sessionId));
        setSuccessMsg("Session revoked successfully.");
        await fetchSecurityData();
      }
    } catch (e: any) {
      setErrorMsg("Failed to revoke session");
    }
  };

  const handleRevokeAllOtherSessions = async () => {
    if (!confirm("Disconnect all other remote devices? You will remain logged in on this device.")) return;
    try {
      const res = await fetchWithAuth("/api/v1/auth/sessions/all-other", { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setSuccessMsg("All other active sessions revoked.");
        await fetchSecurityData();
      }
    } catch (e: any) {
      setErrorMsg("Failed to revoke all sessions");
    }
  };

  const copySecretToClipboard = () => {
    if (!mfaSecret) return;
    navigator.clipboard.writeText(mfaSecret);
    setCopiedSecret(true);
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  const downloadBackupCodesTXT = () => {
    if (backupCodes.length === 0) return;
    const textContent = `ZOLVEX DEEP CLEAN - EMERGENCY RECOVERY BACKUP CODES
Generated: ${new Date().toLocaleString()}
Account: Admin Security Center

==================================================
${backupCodes.map((c, i) => `${i + 1}. ${c}`).join("\n")}
==================================================

IMPORTANT INSTRUCTIONS:
- Store these codes in a secure password manager or offline location.
- Each code can only be used ONCE to log into your admin portal.
- Keep them private. Never share with anyone.
`;
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Zolvex_Backup_Recovery_Codes_${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row transition-colors duration-200">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center space-x-2 text-foreground">
              <ShieldCheck className="w-7 h-7 text-primary" />
              <span>Enterprise Security & Device Control</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              TOTP Multi-Factor Authentication, recovery code vault, and real-time active session revocation.
            </p>
          </div>

          <Button
            onClick={fetchSecurityData}
            className="bg-card hover:bg-secondaryBg text-foreground border border-border font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <RefreshCw className="w-4 h-4 text-primary" />
            <span>Refresh Status</span>
          </Button>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Security Health Score Banner */}
        <div className="bg-card border border-border p-6 rounded-3xl mb-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-center shadow-xs">
          
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/30 font-black text-xl">
              {stats.securityScore}%
            </div>
            <div>
              <span className="text-xs font-bold text-muted uppercase tracking-wider block">Security Health Rating</span>
              <h2 className="text-base font-extrabold text-foreground">
                {stats.securityScore >= 90 ? "Excellent Protection" : stats.securityScore >= 70 ? "Moderate Protection" : "Needs Attention"}
              </h2>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-muted uppercase tracking-wider block">2FA MFA Status</span>
            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${mfaEnabled ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" : "bg-amber-500/10 text-amber-500 border-amber-500/30"}`}>
              <Shield className="w-3.5 h-3.5" />
              <span>{mfaEnabled ? "TOTP Active" : "Disabled (Recommended)"}</span>
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-muted uppercase tracking-wider block">Active Sessions</span>
            <h3 className="text-lg font-black text-foreground">{sessions.length || stats.activeSessionsCount} Device(s) Logged In</h3>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-muted uppercase tracking-wider block">Last Admin Access</span>
            <span className="text-xs font-semibold text-foreground block">{new Date(stats.lastLoginAt).toLocaleTimeString()}</span>
            <span className="text-[10px] font-mono text-muted block">IP: {stats.lastLoginIp}</span>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* TOTP MFA Config Card */}
          <div className="bg-card border border-border p-6 rounded-3xl space-y-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-foreground">Google Authenticator (TOTP MFA)</h2>
                    <p className="text-xs text-muted">Time-based One-Time Passcode protection for super admins.</p>
                  </div>
                </div>

                {mfaEnabled && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-xs font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active</span>
                  </span>
                )}
              </div>

              {!mfaSecret && !mfaEnabled && (
                <div className="space-y-4 text-center py-4">
                  <p className="text-xs text-muted leading-relaxed">
                    Protect your administrative account with 2FA. Every login will require your password plus a 6-digit verification code from Google Authenticator or Authy.
                  </p>
                  <Button
                    onClick={handleSetupMFA}
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-primary hover:bg-primaryHover text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}
                    <span>Configure TOTP Authenticator</span>
                  </Button>
                </div>
              )}

              {/* MFA Setup View with QR Code */}
              {mfaSecret && !mfaEnabled && (
                <div className="space-y-5 pt-2 border-t border-border">
                  
                  <div className="text-center space-y-3">
                    <span className="text-xs font-bold text-foreground block">Step 1: Scan QR Code with Authenticator App</span>
                    
                    {qrCodeDataUrl ? (
                      <div className="p-3 bg-white rounded-2xl inline-block border-2 border-primary shadow-md">
                        <img src={qrCodeDataUrl} alt="TOTP QR Code" className="w-48 h-48 mx-auto" />
                      </div>
                    ) : (
                      <div className="w-48 h-48 bg-secondaryBg/30 rounded-2xl flex items-center justify-center mx-auto border border-border">
                        <QrCode className="w-12 h-12 text-muted animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Manual Entry Secret Key */}
                  <div className="bg-secondaryBg/30 p-4 rounded-2xl border border-border space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-muted">
                      <span>Or Enter Secret Key Manually:</span>
                      <button
                        type="button"
                        onClick={() => setShowSecret(!showSecret)}
                        className="text-primary hover:underline text-[11px] flex items-center space-x-1 font-semibold"
                      >
                        {showSecret ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>{showSecret ? "Hide" : "Reveal"}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-card p-2.5 rounded-xl border border-border">
                      <code className="text-xs font-mono font-black text-primary tracking-wider">
                        {showSecret ? mfaSecret : "•••• •••• •••• ••••"}
                      </code>

                      <button
                        type="button"
                        onClick={copySecretToClipboard}
                        className="px-2.5 py-1 rounded-lg bg-secondaryBg hover:bg-border text-foreground text-xs font-bold transition-all flex items-center space-x-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedSecret ? "Copied!" : "Copy"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Verification Form */}
                  <form onSubmit={handleEnableMFA} className="space-y-3">
                    <label className="text-xs font-bold text-foreground block">Step 2: Enter 6-Digit Code to Confirm</label>
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="123456"
                        className="flex-1 text-center tracking-widest text-lg font-mono font-black py-3 rounded-xl bg-secondaryBg/30 border border-border text-primary outline-none focus:border-primary uppercase"
                      />
                      <Button
                        type="submit"
                        disabled={loading || verificationCode.length < 6}
                        className="px-6 rounded-xl bg-primary hover:bg-primaryHover text-white font-extrabold text-xs shadow-md"
                      >
                        {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Verify & Activate"}
                      </Button>
                    </div>
                  </form>

                </div>
              )}

              {/* MFA Enabled View */}
              {mfaEnabled && (
                <div className="space-y-5 pt-2">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-xs font-semibold text-emerald-500 flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                    <div>
                      <strong className="block font-bold">2FA Multi-Factor Protection Active</strong>
                      <span className="text-[11px] opacity-90">Your account is fully secured against password theft.</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      onClick={handleRegenerateBackupCodes}
                      disabled={loading}
                      className="py-2.5 rounded-xl bg-secondaryBg/50 hover:bg-secondaryBg text-foreground border border-border text-xs font-bold flex items-center justify-center space-x-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-primary" />
                      <span>Regenerate Recovery Codes</span>
                    </Button>

                    <Button
                      onClick={handleDisableMFA}
                      disabled={loading}
                      className="py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 text-xs font-bold flex items-center justify-center space-x-2"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Disable 2FA Protection</span>
                    </Button>
                  </div>

                </div>
              )}

            </div>

            {/* Recovery Codes Box */}
            {backupCodes.length > 0 && (
              <div className="mt-6 pt-5 border-t border-border space-y-3 bg-secondaryBg/20 p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-foreground">Emergency Recovery Codes</span>
                  <button
                    onClick={downloadBackupCodesTXT}
                    className="px-3 py-1 rounded-lg bg-primary hover:bg-primaryHover text-white text-xs font-bold shadow-xs flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download TXT</span>
                  </button>
                </div>
                <p className="text-[11px] text-muted">
                  Store these 10 one-time codes safely. They can be used to log in if you lose access to your authenticator app.
                </p>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs text-primary font-black bg-card p-3 rounded-xl border border-border">
                  {backupCodes.map((code, idx) => (
                    <span key={idx} className="bg-secondaryBg/40 px-2.5 py-1 rounded-md text-center border border-border/50">
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Active Devices & Sessions Card */}
          <div className="bg-card border border-border p-6 rounded-3xl space-y-6 shadow-xs flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-foreground">Active Devices & Sessions</h2>
                    <p className="text-xs text-muted">Manage active logins across desktop, mobile, and web.</p>
                  </div>
                </div>

                {sessions.length > 1 && (
                  <button
                    onClick={handleRevokeAllOtherSessions}
                    className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 text-xs font-bold transition-all flex items-center space-x-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout All Other Devices</span>
                  </button>
                )}
              </div>

              {/* Sessions List */}
              <div className="space-y-3">
                {sessions.map((s) => (
                  <div
                    key={s._id}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                      s.isCurrentSession
                        ? "bg-primary/10 border-primary/40 shadow-xs"
                        : "bg-secondaryBg/30 border-border"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {s.os?.includes("Mac") || s.os?.includes("Windows") ? (
                          <Laptop className="w-4 h-4 text-primary" />
                        ) : (
                          <Smartphone className="w-4 h-4 text-blue-500" />
                        )}
                        <span className="text-xs font-extrabold text-foreground">
                          {s.browser || "Browser Session"} on {s.os || "Device"}
                        </span>

                        {s.isCurrentSession && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary text-white shadow-xs">
                            Current Device
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-3 text-[10px] text-muted font-mono">
                        <span>IP: {s.ipAddress}</span>
                        <span>•</span>
                        <span>Active: {new Date(s.lastActiveAt).toLocaleTimeString()}</span>
                      </div>
                    </div>

                    {!s.isCurrentSession && (
                      <button
                        onClick={() => handleRevokeSession(s._id)}
                        className="p-2 rounded-xl text-muted hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                        title="Revoke Remote Session"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

            </div>

            {/* Audit Logs Quick Pointer */}
            <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-muted">
              <span className="flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-primary" />
                <span>Security Events Audit Stream Active</span>
              </span>
              <a href="/admin/audit-logs" className="text-primary hover:underline font-bold">
                View Full Audit Logs $\rightarrow$
              </a>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
