"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  Sparkles,
  Plus,
  Edit,
  Trash2,
  Search,
  CheckCircle2,
  Clock,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Upload,
  Image as ImageIcon,
  Check,
  X,
  AlertTriangle,
  FileText,
  DollarSign,
  Tag,
  Eye,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/api";

interface Variation {
  _id?: string;
  name: string;
  price: number;
}

interface Inclusion {
  _id?: string;
  description: string;
}

interface Service {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  basePrice: number;
  durationMinutes: number;
  isActive: boolean;
  isAvailable: boolean;
  displayOrder: number;
  image: string;
  imagePublicId?: string;
  rating: number;
  reviews: number;
  seoTitle?: string;
  seoDescription?: string;
  variations: Variation[];
  inclusions: Inclusion[];
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    category: "deep_cleaning",
    basePrice: 2999,
    durationMinutes: 90,
    isActive: true,
    isAvailable: true,
    seoTitle: "",
    seoDescription: ""
  });

  const [variations, setVariations] = useState<Variation[]>([
    { name: "1 BHK", price: 2999 },
    { name: "2 BHK", price: 3999 }
  ]);
  const [inclusions, setInclusions] = useState<Inclusion[]>([
    { description: "Deep ceiling to floor dusting & vacuuming" },
    { description: "Kitchen oil degreasing & cabinet polish" }
  ]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchAdminServices();
  }, []);

  const fetchAdminServices = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/api/v1/admin/services");
      const json = await res.json();
      if (json.success && json.data) {
        setServices(json.data);
      }
    } catch (e) {
      console.warn("Failed to fetch admin services:", e);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      name: title,
      slug: prev.slug ? prev.slug : generateSlug(title),
      seoTitle: prev.seoTitle ? prev.seoTitle : title
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg("Selected image exceeds 5MB size limit.");
        return;
      }
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const bodyFormData = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        bodyFormData.append(key, String(val));
      });

      bodyFormData.append("variations", JSON.stringify(variations));
      bodyFormData.append("inclusions", JSON.stringify(inclusions));

      if (selectedFile) {
        bodyFormData.append("image", selectedFile);
      }

      const token = localStorage.getItem("zolvex_token");
      const isEdit = Boolean(editingService);
      const url = isEdit ? `/api/v1/admin/services/${editingService!._id}` : "/api/v1/admin/services";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Authorization": `Bearer ${token}` },
        body: bodyFormData
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSuccessMsg(isEdit ? "Service updated successfully with Cloudinary image!" : "New service created and image saved in Cloudinary!");
        setShowAddModal(false);
        setEditingService(null);
        setSelectedFile(null);
        setFilePreview(null);
        await fetchAdminServices();
      } else {
        throw new Error(json.message || "Failed to save service package");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Service submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service package? Associated Cloudinary image will be deleted.")) return;

    try {
      const res = await fetchWithAuth(`/api/v1/admin/services/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setServices(prev => prev.filter(s => s._id !== id));
        setSuccessMsg("Service package and Cloudinary image deleted.");
      }
    } catch (err) {
      setErrorMsg("Failed to delete service");
    }
  };

  const toggleActiveStatus = async (service: Service) => {
    try {
      const token = localStorage.getItem("zolvex_token");
      const res = await fetch(`/api/v1/admin/services/${service._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !service.isActive })
      });
      const json = await res.json();
      if (json.success) {
        setSuccessMsg(`Service "${service.name}" is now ${!service.isActive ? "Active (Live)" : "Inactive (Hidden)"}`);
        await fetchAdminServices();
      }
    } catch (err) {
      setErrorMsg("Failed to toggle status");
    }
  };

  const moveOrder = async (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= services.length) return;

    const newServices = [...services];
    const temp = newServices[index];
    newServices[index] = newServices[targetIdx];
    newServices[targetIdx] = temp;

    setServices(newServices);

    const orders = newServices.map((s, i) => ({ id: s._id, displayOrder: i + 1 }));
    try {
      await fetchWithAuth("/api/v1/admin/services/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders })
      });
      setSuccessMsg("Service display orders updated.");
    } catch (e) {
      console.warn("Reorder failed:", e);
    }
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setFormData({
      name: s.name,
      slug: s.slug || generateSlug(s.name),
      description: s.description || "",
      category: s.category || "deep_cleaning",
      basePrice: s.basePrice || 2999,
      durationMinutes: s.durationMinutes || 90,
      isActive: s.isActive,
      isAvailable: s.isAvailable !== false,
      seoTitle: s.seoTitle || s.name,
      seoDescription: s.seoDescription || s.description
    });
    setVariations(s.variations && s.variations.length > 0 ? s.variations : [{ name: "Standard", price: s.basePrice || 2999 }]);
    setInclusions(s.inclusions && s.inclusions.length > 0 ? s.inclusions : [{ description: "Full home deep cleaning & sanitization" }]);
    setFilePreview(s.image || null);
    setSelectedFile(null);
  };

  // Helper for adding/deleting variations
  const addVariation = () => setVariations(prev => [...prev, { name: "New Variation", price: 1999 }]);
  const removeVariation = (idx: number) => setVariations(prev => prev.filter((_, i) => i !== idx));
  const updateVariation = (idx: number, field: "name" | "price", val: any) => {
    setVariations(prev => prev.map((v, i) => i === idx ? { ...v, [field]: field === "price" ? Number(val) : val } : v));
  };

  // Helper for adding/deleting inclusions
  const addInclusion = () => setInclusions(prev => [...prev, { description: "Specialized surface sanitization" }]);
  const removeInclusion = (idx: number) => setInclusions(prev => prev.filter((_, i) => i !== idx));
  const updateInclusion = (idx: number, val: string) => {
    setInclusions(prev => prev.map((inc, i) => i === idx ? { ...inc, description: val } : inc));
  };

  const filtered = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "all" || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row transition-colors duration-200">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center space-x-2 text-foreground">
              <Sparkles className="w-7 h-7 text-primary" />
              <span>Service Management & Reordering</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Create, edit, reorder, and manage Cloudinary images directly for active cleaning service packages.
            </p>
          </div>

          <Button
            onClick={() => {
              setEditingService(null);
              setFormData({
                name: "",
                slug: "",
                description: "",
                category: "deep_cleaning",
                basePrice: 2999,
                durationMinutes: 90,
                isActive: true,
                isAvailable: true,
                seoTitle: "",
                seoDescription: ""
              });
              setVariations([{ name: "1 BHK", price: 2999 }, { name: "2 BHK", price: 3999 }]);
              setInclusions([{ description: "Complete deep cleaning & sanitization" }]);
              setSelectedFile(null);
              setFilePreview(null);
              setShowAddModal(true);
            }}
            className="bg-primary hover:bg-primaryHover text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Service</span>
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

        {/* Filters */}
        <div className="bg-card border border-border p-4 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search service title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground focus:border-primary outline-none"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
            {["all", "deep_cleaning", "kitchen", "bathroom", "sofa", "water_tank"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  categoryFilter === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-secondaryBg/30 text-muted hover:text-foreground border border-border"
                }`}
              >
                {cat.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-16">
            <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
            <p className="text-xs font-semibold text-muted">Loading service catalog...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s, index) => (
              <div key={s._id} className="bg-card border border-border p-5 rounded-3xl space-y-4 relative flex flex-col justify-between shadow-xs group">
                
                {/* Thumbnail Preview */}
                <div className="relative h-44 rounded-2xl overflow-hidden bg-secondaryBg border border-border">
                  <img
                    src={s.image || "/images/work_img_1.jpeg"}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-card/90 text-primary border border-border">
                    Order #{index + 1}
                  </span>

                  <button
                    onClick={() => toggleActiveStatus(s)}
                    className={`absolute top-2 right-2 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase transition-all border ${
                      s.isActive
                        ? "bg-emerald-500 text-white border-emerald-400 shadow-xs"
                        : "bg-red-500 text-white border-red-400 shadow-xs"
                    }`}
                  >
                    {s.isActive ? "Active (Live)" : "Inactive"}
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span className="font-mono uppercase text-[10px] bg-secondaryBg/50 px-2 py-0.5 rounded-md">/{s.slug}</span>
                    <span className="flex items-center space-x-1 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{s.durationMinutes || 90} mins</span>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-foreground text-base leading-snug">{s.name}</h3>
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">{s.description}</p>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted block uppercase font-bold">Base Price</span>
                    <span className="text-primary font-black text-lg">₹{s.basePrice?.toLocaleString()}</span>
                  </div>

                  {/* Ordering & Action Controls */}
                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => moveOrder(index, "up")}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg bg-secondaryBg/40 hover:bg-secondaryBg text-foreground disabled:opacity-30 border border-border"
                      title="Move Display Order Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => moveOrder(index, "down")}
                      disabled={index === services.length - 1}
                      className="p-1.5 rounded-lg bg-secondaryBg/40 hover:bg-secondaryBg text-foreground disabled:opacity-30 border border-border"
                      title="Move Display Order Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => openEditModal(s)}
                      className="p-2 rounded-xl bg-secondaryBg/40 hover:bg-secondaryBg text-foreground border border-border hover:border-primary transition-all"
                      title="Edit Service Package"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteService(s._id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 transition-all"
                      title="Delete Service Package"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Clean, Direct Service Add / Edit Modal with Automatic Cloudinary Upload */}
        {(showAddModal || editingService) && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-card border border-border p-6 rounded-3xl max-w-2xl w-full space-y-5 shadow-2xl max-h-[92vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    {editingService ? `Edit Service: ${editingService.name}` : "Create New Cleaning Service Package"}
                  </h2>
                  <p className="text-xs text-muted">Uploaded image will automatically save to Cloudinary CDN and update all service listings.</p>
                </div>
                <button
                  onClick={() => { setShowAddModal(false); setEditingService(null); }}
                  className="text-muted hover:text-foreground p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                {/* Direct Image File Upload Input with Live Preview */}
                <div className="space-y-2 bg-secondaryBg/20 p-4 rounded-2xl border border-border">
                  <span className="text-xs font-extrabold text-foreground flex items-center space-x-1.5">
                    <ImageIcon className="w-4 h-4 text-primary" />
                    <span>Service Package Image (Saved directly to Cloudinary)</span>
                  </span>

                  <div className="border-2 border-dashed border-border rounded-xl p-4 text-center space-y-2 bg-card hover:border-primary transition-colors cursor-pointer relative">
                    {filePreview ? (
                      <div className="relative inline-block">
                        <img src={filePreview} alt="Preview" className="h-36 mx-auto rounded-xl object-cover border border-border" />
                        <span className="text-[10px] bg-emerald-500 text-white px-2.5 py-0.5 rounded-full font-bold absolute bottom-2 right-2 shadow-xs">
                          {selectedFile ? "New File Selected" : "Current Cloudinary Image"}
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-8 h-8 text-primary mx-auto" />
                        <p className="text-xs font-bold text-foreground">Click or Drag Image File (JPEG, PNG, WebP, max 5MB)</p>
                        <p className="text-[11px] text-muted">File will be uploaded to Cloudinary automatically on submission.</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="service-modal-file-upload" />
                    <label htmlFor="service-modal-file-upload" className="inline-block px-4 py-2 bg-secondaryBg rounded-xl text-xs font-bold text-foreground cursor-pointer border border-border hover:border-primary transition-colors mt-2">
                      {filePreview ? "Change Image File" : "Browse Image File"}
                    </label>
                  </div>
                </div>

                {/* Form Basics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">Service Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Sofa & Upholstery Shampooing"
                      className="w-full p-2.5 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-foreground">SEO URL Slug</label>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, slug: generateSlug(formData.name) })}
                        className="text-[10px] text-primary hover:underline font-bold"
                      >
                        Auto Slug
                      </button>
                    </div>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="sofa-upholstery-shampooing"
                      className="w-full p-2.5 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">Service Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Comprehensive deep extraction cleaning..."
                    className="w-full p-2.5 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground outline-none"
                    >
                      <option value="deep_cleaning">Deep Cleaning</option>
                      <option value="kitchen">Kitchen</option>
                      <option value="bathroom">Bathroom</option>
                      <option value="sofa">Sofa Upholstery</option>
                      <option value="water_tank">Water Tank</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">Base Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={formData.basePrice}
                      onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">Duration (Minutes)</label>
                    <input
                      type="number"
                      required
                      value={formData.durationMinutes}
                      onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* BHK Variations Manager */}
                <div className="space-y-2 bg-secondaryBg/10 p-3 rounded-2xl border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">BHK Pricing Variations</span>
                    <button
                      type="button"
                      onClick={addVariation}
                      className="text-[11px] font-bold text-primary hover:underline flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Variation</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {variations.map((v, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={v.name}
                          onChange={(e) => updateVariation(idx, "name", e.target.value)}
                          placeholder="e.g. 1 BHK / 3 Seater"
                          className="flex-1 p-2 rounded-xl bg-card border border-border text-xs text-foreground outline-none"
                        />
                        <input
                          type="number"
                          value={v.price}
                          onChange={(e) => updateVariation(idx, "price", e.target.value)}
                          placeholder="Price ₹"
                          className="w-28 p-2 rounded-xl bg-card border border-border text-xs text-foreground outline-none"
                        />
                        {variations.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeVariation(idx)}
                            className="p-1.5 text-muted hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions Manager */}
                <div className="space-y-2 bg-secondaryBg/10 p-3 rounded-2xl border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Included Feature Bullets</span>
                    <button
                      type="button"
                      onClick={addInclusion}
                      className="text-[11px] font-bold text-primary hover:underline flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Bullet</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={inc.description}
                          onChange={(e) => updateInclusion(idx, e.target.value)}
                          placeholder="e.g. High-pressure tile scrubbing & stain removal"
                          className="flex-1 p-2 rounded-xl bg-card border border-border text-xs text-foreground outline-none"
                        />
                        {inclusions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInclusion(idx)}
                            className="p-1.5 text-muted hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Checkbox */}
                <div className="flex items-center space-x-3 bg-secondaryBg/30 p-3 rounded-xl border border-border">
                  <label className="flex items-center space-x-2 text-xs font-bold text-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span>Active (Publish immediately on public website catalog)</span>
                  </label>
                </div>

                {/* Form Action Buttons */}
                <div className="flex justify-end space-x-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => { setShowAddModal(false); setEditingService(null); }}
                    className="px-5 py-2.5 rounded-xl bg-secondaryBg text-foreground text-xs font-bold border border-border"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primaryHover text-white text-xs font-extrabold shadow-md flex items-center space-x-1"
                  >
                    {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Save & Publish Service Package</span>}
                  </Button>
                </div>

              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
