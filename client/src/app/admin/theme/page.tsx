"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useCMS } from "@/context/CMSContext";
import { Palette, Save, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/api";

export default function AdminThemePage() {
  const { theme, refreshCMS } = useCMS();
  const [formData, setFormData] = useState({
    primaryColor: "#E6C15A",
    primaryHover: "#D4AF37",
    secondaryColor: "#F4D35E",
    borderRadius: "0.75rem"
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (theme) {
      setFormData({
        primaryColor: theme.primaryColor || "#E6C15A",
        primaryHover: theme.primaryHover || "#D4AF37",
        secondaryColor: theme.secondaryColor || "#F4D35E",
        borderRadius: theme.borderRadius || "0.75rem"
      });
    }
  }, [theme]);

  const handleSaveTheme = async () => {
    setLoading(true);
    setSuccessMsg("");
    try {
      const res = await fetchWithAuth("/api/v1/admin/theme", {
        method: "PUT",
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (json.success) {
        setSuccessMsg("Theme tokens updated and applied across website!");
        await refreshCMS();
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (e) {
      console.error("Save theme error:", e);
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
              <Palette className="w-7 h-7 text-primary" />
              <span>Theme & Appearance Customizer</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Customize website accent colors, button styling, and layout tokens dynamically in real time.
            </p>
          </div>

          <Button
            onClick={handleSaveTheme}
            disabled={loading}
            className="bg-primary hover:bg-primaryHover text-neutral-950 font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-all flex items-center space-x-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save & Apply Theme</span>
          </Button>
        </div>

        {successMsg && (
          <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl flex items-center space-x-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Color Palette Card */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-6 max-w-2xl">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Brand Color Tokens</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Primary Brand Accent</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                  className="flex-1 p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono font-bold text-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Primary Hover Accent</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.primaryHover}
                  onChange={(e) => setFormData({ ...formData, primaryHover: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={formData.primaryHover}
                  onChange={(e) => setFormData({ ...formData, primaryHover: e.target.value })}
                  className="flex-1 p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono font-bold text-white outline-none"
                />
              </div>
            </div>

          </div>

          <div className="space-y-1.5 pt-4 border-t border-neutral-800">
            <label className="text-xs font-semibold text-neutral-300">Component Border Radius</label>
            <div className="flex space-x-3">
              {["0.5rem", "0.75rem", "1rem"].map((radius) => (
                <button
                  key={radius}
                  type="button"
                  onClick={() => setFormData({ ...formData, borderRadius: radius })}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    formData.borderRadius === radius
                      ? "bg-primary text-neutral-950"
                      : "bg-neutral-950 text-neutral-400 border border-neutral-800"
                  }`}
                >
                  {radius} ({radius === "0.5rem" ? "Sm" : radius === "0.75rem" ? "Md" : "Lg"})
                </button>
              ))}
            </div>
          </div>

          {/* Live Preview Widget */}
          <div className="pt-6 border-t border-neutral-800 space-y-2">
            <span className="text-xs font-bold text-neutral-400 uppercase">Live Element Preview</span>
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white">Sample Primary Button</span>
              <button
                style={{ backgroundColor: formData.primaryColor, borderRadius: formData.borderRadius }}
                className="px-4 py-2 text-neutral-950 font-bold text-xs shadow-md"
              >
                Get Started Now
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
