"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useCMS } from "@/context/CMSContext";
import { FileText, Save, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminCMSPage() {
  const { content, refreshCMS } = useCMS();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    if (content) {
      setFormData({
        hero_title: content.hero_title || "READY TO REVITALIZE YOUR SPACE?",
        hero_subtitle: content.hero_subtitle || "Expert Deep Cleaning Services Tailored to Your Needs in Kerala.",
        hero_cta: content.hero_cta || "Get a Free Quote",
        about_heading: content.about_heading || "Kerala's Premier Cleaning Specialists",
        about_description: content.about_description || "We deliver spotless, eco-friendly deep cleaning solutions for homes, offices, water tanks, and upholstery in Trivandrum & Ernakulam.",
        footer_tagline: content.footer_tagline || "Professional Home Cleaning Solutions Across Kerala.",
        contact_phone: content.contact_phone || "+91 98765 43210",
        contact_email: content.contact_email || "support@zolvex.com"
      });
    }
  }, [content]);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveCMS = async () => {
    setLoading(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/v1/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (json.success) {
        setSuccessMsg("All website text copy updated successfully!");
        await refreshCMS();
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (e) {
      console.error("Save CMS failed:", e);
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
              <FileText className="w-7 h-7 text-primary" />
              <span>Website Content Management System (CMS)</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Edit every text, heading, button label, and paragraph visible on your website dynamically without code changes.
            </p>
          </div>

          <Button
            onClick={handleSaveCMS}
            disabled={loading}
            className="bg-primary hover:bg-primaryHover text-neutral-950 font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-all flex items-center space-x-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save All CMS Changes</span>
          </Button>
        </div>

        {successMsg && (
          <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl flex items-center space-x-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Section Tabs */}
        <div className="flex space-x-2 border-b border-neutral-800 pb-3 mb-6 overflow-x-auto">
          {[
            { id: "hero", label: "Home Hero Section" },
            { id: "about", label: "About Us Copy" },
            { id: "footer", label: "Footer & Contact Details" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-neutral-950 shadow-md"
                  : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CMS Editor Form Card */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-6">
          
          {activeTab === "hero" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Hero Section Settings</h3>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">Hero Main Title (H1)</label>
                <input
                  type="text"
                  value={formData.hero_title || ""}
                  onChange={(e) => handleChange("hero_title", e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm font-bold text-white focus:border-primary outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">Hero Subtitle Paragraph</label>
                <textarea
                  rows={3}
                  value={formData.hero_subtitle || ""}
                  onChange={(e) => handleChange("hero_subtitle", e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 focus:border-primary outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">Primary CTA Button Label</label>
                <input
                  type="text"
                  value={formData.hero_cta || ""}
                  onChange={(e) => handleChange("hero_cta", e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm font-bold text-white focus:border-primary outline-none"
                />
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider">About Us Copy</h3>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">About Heading</label>
                <input
                  type="text"
                  value={formData.about_heading || ""}
                  onChange={(e) => handleChange("about_heading", e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm font-bold text-white focus:border-primary outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">About Section Description</label>
                <textarea
                  rows={4}
                  value={formData.about_description || ""}
                  onChange={(e) => handleChange("about_description", e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 focus:border-primary outline-none resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === "footer" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Footer & Contact Settings</h3>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">Footer Tagline</label>
                <input
                  type="text"
                  value={formData.footer_tagline || ""}
                  onChange={(e) => handleChange("footer_tagline", e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:border-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Support Phone Number</label>
                  <input
                    type="text"
                    value={formData.contact_phone || ""}
                    onChange={(e) => handleChange("contact_phone", e.target.value)}
                    className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:border-primary outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">Support Email Address</label>
                  <input
                    type="text"
                    value={formData.contact_email || ""}
                    onChange={(e) => handleChange("contact_email", e.target.value)}
                    className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
