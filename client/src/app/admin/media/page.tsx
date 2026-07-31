"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Trash2,
  Edit3,
  Copy,
  CheckCircle2,
  RefreshCw,
  Plus,
  X,
  ExternalLink,
  Layers,
  Sparkles,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/api";

interface MediaItem {
  _id: string;
  publicId: string;
  secureUrl: string;
  folder: string;
  category: "website" | "services" | "blog" | "users" | "uploads";
  format: string;
  width: number;
  height: number;
  bytes: number;
  originalFilename: string;
  altText: string;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [replacingItem, setReplacingItem] = useState<MediaItem | null>(null);

  // Form State
  const [uploadCategory, setUploadCategory] = useState<any>("website");
  const [uploadAltText, setUploadAltText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, [categoryFilter]);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const url = categoryFilter !== "all" 
        ? `/api/v1/media?category=${categoryFilter}` 
        : "/api/v1/media";
      const res = await fetchWithAuth(url);
      const json = await res.json();

      if (json.success && json.data) {
        setMediaList(json.data.items || []);
      }
    } catch (e) {
      console.warn("Failed to fetch media assets:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Selected file exceeds the maximum 5MB size limit.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please select a valid image file (JPEG, PNG, WebP, AVIF).");
      return;
    }

    setErrorMsg("");
    setSelectedFile(file);
    setFilePreview(URL.createObjectURL(file));
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("category", uploadCategory);
      formData.append("altText", uploadAltText);

      const token = localStorage.getItem("zolvex_token");
      const res = await fetch("/api/v1/media/upload", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSuccessMsg("Image uploaded successfully to Cloudinary!");
        setShowUploadModal(false);
        setSelectedFile(null);
        setFilePreview(null);
        setUploadAltText("");
        await fetchMedia();
      } else {
        throw new Error(json.message || "Upload failed");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleReplaceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replacingItem || !selectedFile) return;

    setUploading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const token = localStorage.getItem("zolvex_token");
      const res = await fetch(`/api/v1/media/${replacingItem._id}/replace`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSuccessMsg("Image replaced safely on Cloudinary!");
        setReplacingItem(null);
        setSelectedFile(null);
        setFilePreview(null);
        await fetchMedia();
      } else {
        throw new Error(json.message || "Replacement failed");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to replace image.");
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const res = await fetchWithAuth(`/api/v1/media/${editingItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          altText: editingItem.altText,
          category: editingItem.category
        })
      });

      const json = await res.json();
      if (json.success) {
        setSuccessMsg("Media metadata updated.");
        setEditingItem(null);
        await fetchMedia();
      }
    } catch (e) {
      setErrorMsg("Failed to update media details");
    }
  };

  const handleDelete = async (id: string, publicId: string) => {
    if (!confirm(`Are you sure you want to permanently delete this media asset [${publicId}] from Cloudinary?`)) return;

    try {
      const res = await fetchWithAuth(`/api/v1/media/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setMediaList(prev => prev.filter(m => m._id !== id));
        setSuccessMsg("Media deleted from Cloudinary & Database.");
      }
    } catch (e) {
      setErrorMsg("Failed to delete media asset");
    }
  };

  const copyCdnUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredMedia = mediaList.filter(m => 
    m.originalFilename.toLowerCase().includes(search.toLowerCase()) ||
    m.altText.toLowerCase().includes(search.toLowerCase()) ||
    m.publicId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row transition-colors duration-200">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center space-x-2 text-foreground">
              <ImageIcon className="w-7 h-7 text-primary" />
              <span>Cloudinary Media Library</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Centralized media asset hub. Upload, optimize, replace, and manage CDN images across your website.
            </p>
          </div>

          <Button
            onClick={() => {
              setSelectedFile(null);
              setFilePreview(null);
              setShowUploadModal(true);
            }}
            className="bg-primary hover:bg-primaryHover text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Image</span>
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

        {/* Search & Filter Bar */}
        <div className="bg-card border border-border p-4 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by filename, alt text, or public_id..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground focus:border-primary outline-none"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
            {["all", "website", "services", "blog", "users", "uploads"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  categoryFilter === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-secondaryBg/30 text-muted hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="text-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
            <p className="text-xs font-semibold text-muted">Loading Cloudinary media library...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((m) => (
              <div key={m._id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs space-y-3 p-3 flex flex-col justify-between group">
                
                {/* Thumbnail Preview */}
                <div className="relative h-44 rounded-xl overflow-hidden bg-secondaryBg/40 border border-border">
                  <img
                    src={m.secureUrl}
                    alt={m.altText || m.originalFilename}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-card/90 text-primary border border-border">
                    {m.format}
                  </span>
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono bg-black/70 text-white px-2 py-0.5 rounded-md">
                    {m.width}x{m.height} • {(m.bytes / 1024).toFixed(0)}KB
                  </span>
                </div>

                {/* Information */}
                <div className="space-y-1">
                  <h3 className="text-xs font-extrabold text-foreground truncate">{m.originalFilename}</h3>
                  <p className="text-[11px] text-muted font-mono truncate">{m.publicId}</p>
                </div>

                {/* Quick Actions */}
                <div className="pt-2 border-t border-border flex items-center justify-between gap-1">
                  <button
                    onClick={() => copyCdnUrl(m.secureUrl, m._id)}
                    className="p-2 rounded-lg bg-secondaryBg/30 hover:bg-secondaryBg text-muted hover:text-foreground text-[11px] font-bold flex items-center space-x-1 border border-border transition-all flex-1 justify-center"
                    title="Copy CDN URL"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedId === m._id ? "Copied!" : "CDN URL"}</span>
                  </button>

                  <button
                    onClick={() => setEditingItem(m)}
                    className="p-2 rounded-lg bg-secondaryBg/30 hover:bg-secondaryBg text-muted hover:text-foreground border border-border transition-all"
                    title="Edit Metadata"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setFilePreview(null);
                      setReplacingItem(m);
                    }}
                    className="p-2 rounded-lg bg-secondaryBg/30 hover:bg-secondaryBg text-muted hover:text-primary border border-border transition-all"
                    title="Replace Image"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(m._id, m.publicId)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 transition-all"
                    title="Delete Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-card border border-border p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-foreground">Upload Image to Cloudinary</h2>
                <button onClick={() => setShowUploadModal(false)} className="text-muted hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                
                {/* Upload Drop Area */}
                <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center space-y-2 hover:border-primary transition-colors cursor-pointer bg-secondaryBg/10">
                  {filePreview ? (
                    <img src={filePreview} alt="Preview" className="h-40 mx-auto rounded-xl object-cover border border-border" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-primary mx-auto" />
                      <p className="text-xs font-semibold text-foreground">Click to select image file (Max 5MB)</p>
                      <span className="text-[10px] text-muted block">Formats: JPEG, PNG, WebP, AVIF</span>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="upload-file-input" />
                  <label htmlFor="upload-file-input" className="inline-block px-4 py-2 bg-secondaryBg rounded-xl text-xs font-bold text-foreground cursor-pointer border border-border mt-2">
                    Browse File
                  </label>
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Target Folder Category</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground outline-none"
                  >
                    <option value="website">Website (zolvex/website)</option>
                    <option value="services">Services (zolvex/services)</option>
                    <option value="blog">Blog (zolvex/blog)</option>
                    <option value="users">Users (zolvex/users)</option>
                    <option value="uploads">General Uploads (zolvex/uploads)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Alt Text (Accessibility)</label>
                  <input
                    type="text"
                    value={uploadAltText}
                    onChange={(e) => setUploadAltText(e.target.value)}
                    placeholder="e.g. Deep cleaning team scrubbing kitchen tiles"
                    className="w-full p-2.5 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground outline-none focus:border-primary"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={uploading || !selectedFile}
                  className="w-full py-3 rounded-xl bg-primary hover:bg-primaryHover text-white font-extrabold text-xs shadow-md"
                >
                  {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Upload to Cloudinary"}
                </Button>

              </form>
            </div>
          </div>
        )}

        {/* Safe Replace Modal */}
        {replacingItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-card border border-border p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-foreground">Safe Replace Image</h2>
                <button onClick={() => setReplacingItem(null)} className="text-muted hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-muted">
                Replacing <strong className="text-foreground">{replacingItem.publicId}</strong>. The new image will be uploaded to Cloudinary first before old asset is destroyed.
              </p>

              <form onSubmit={handleReplaceSubmit} className="space-y-4">
                
                <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center space-y-2 hover:border-primary transition-colors cursor-pointer bg-secondaryBg/10">
                  {filePreview ? (
                    <img src={filePreview} alt="Preview" className="h-40 mx-auto rounded-xl object-cover border border-border" />
                  ) : (
                    <>
                      <RefreshCw className="w-8 h-8 text-primary mx-auto" />
                      <p className="text-xs font-semibold text-foreground">Select replacement image file (Max 5MB)</p>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="replace-file-input" />
                  <label htmlFor="replace-file-input" className="inline-block px-4 py-2 bg-secondaryBg rounded-xl text-xs font-bold text-foreground cursor-pointer border border-border mt-2">
                    Choose Replacement Image
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={uploading || !selectedFile}
                  className="w-full py-3 rounded-xl bg-primary hover:bg-primaryHover text-white font-extrabold text-xs shadow-md"
                >
                  {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Confirm & Replace Image"}
                </Button>

              </form>
            </div>
          </div>
        )}

        {/* Edit Metadata Modal */}
        {editingItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-card border border-border p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-foreground">Edit Media Metadata</h2>
                <button onClick={() => setEditingItem(null)} className="text-muted hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateMetadata} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Alt Text</label>
                  <input
                    type="text"
                    value={editingItem.altText}
                    onChange={(e) => setEditingItem({ ...editingItem, altText: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground outline-none"
                  >
                    <option value="website">Website</option>
                    <option value="services">Services</option>
                    <option value="blog">Blog</option>
                    <option value="users">Users</option>
                    <option value="uploads">Uploads</option>
                  </select>
                </div>

                <Button type="submit" className="w-full py-3 rounded-xl bg-primary hover:bg-primaryHover text-white font-extrabold text-xs">
                  Save Changes
                </Button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
