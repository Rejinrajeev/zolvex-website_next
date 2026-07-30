"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Sparkles, Plus, Edit, Trash2, Search, CheckCircle2, XCircle, Clock, Star, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/api";

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  durationMinutes: number;
  isActive: boolean;
  isAvailable: boolean;
  image: string;
  rating: number;
  reviews: number;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "deep_cleaning",
    basePrice: 1999,
    durationMinutes: 90,
    image: "/images/work_img_1.jpeg",
    isActive: true,
    isAvailable: true
  });

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

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetchWithAuth("/api/v1/admin/services", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      if (json.success) {
        setShowAddModal(false);
        fetchAdminServices();
      }
    } catch (err) {
      console.error("Create service error:", err);
    }
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      const res = await fetchWithAuth(`/api/v1/admin/services/${editingService._id}`, {
        method: "PUT",
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      if (json.success) {
        setEditingService(null);
        fetchAdminServices();
      }
    } catch (err) {
      console.error("Update service error:", err);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetchWithAuth(`/api/v1/admin/services/${id}`, {
        method: "DELETE"
      });
      const json = await res.json();
      if (json.success) {
        fetchAdminServices();
      }
    } catch (err) {
      console.error("Delete service error:", err);
    }
  };

  const toggleActiveStatus = async (service: Service) => {
    try {
      const res = await fetch(`/api/v1/admin/services/${service._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !service.isActive })
      });
      const json = await res.json();
      if (json.success) {
        fetchAdminServices();
      }
    } catch (err) {
      console.error("Toggle active error:", err);
    }
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setFormData({
      name: s.name,
      description: s.description || "",
      category: s.category || "deep_cleaning",
      basePrice: s.basePrice || 1999,
      durationMinutes: s.durationMinutes || 90,
      image: s.image || "/images/work_img_1.jpeg",
      isActive: s.isActive,
      isAvailable: s.isAvailable !== false
    });
  };

  const filtered = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "all" || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center space-x-2">
              <Sparkles className="w-7 h-7 text-primary" />
              <span>Service Management System</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Complete CRUD control over cleaning services, duration parameters, pricing, and active availability.
            </p>
          </div>

          <Button
            onClick={() => {
              setFormData({
                name: "",
                description: "",
                category: "deep_cleaning",
                basePrice: 1999,
                durationMinutes: 90,
                image: "/images/work_img_1.jpeg",
                isActive: true,
                isAvailable: true
              });
              setShowAddModal(true);
            }}
            className="bg-primary hover:bg-primaryHover text-neutral-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </Button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services by title or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-primary outline-none"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
            {["all", "deep_cleaning", "kitchen", "bathroom", "sofa", "water_tank"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  categoryFilter === cat
                    ? "bg-primary text-neutral-950 font-bold"
                    : "bg-neutral-950 text-neutral-400 hover:text-white"
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
            <p className="text-xs font-semibold text-neutral-400">Loading service catalog...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => (
              <div key={s._id} className="bg-neutral-900 border border-neutral-800 p-5 rounded-3xl space-y-4 relative flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {s.category.replace("_", " ")}
                    </span>

                    <button
                      onClick={() => toggleActiveStatus(s)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase transition-all ${
                        s.isActive
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {s.isActive ? "Active" : "Inactive"}
                    </button>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-white text-base">{s.name}</h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 mt-1">{s.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2">
                    <span className="text-primary font-black text-lg">₹{s.basePrice?.toLocaleString()}</span>
                    <span className="text-neutral-400 font-semibold flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{s.durationMinutes || 90} mins</span>
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => openEditModal(s)}
                    className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:border-primary transition-all"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteService(s._id)}
                    className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add / Edit Modal */}
        {(showAddModal || editingService) && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl max-w-lg w-full space-y-4">
              <h2 className="text-lg font-bold text-white">
                {editingService ? "Edit Service Details" : "Add New Cleaning Service"}
              </h2>

              <form onSubmit={editingService ? handleUpdateService : handleCreateService} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300">Service Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white outline-none"
                    >
                      <option value="deep_cleaning">Deep Cleaning</option>
                      <option value="kitchen">Kitchen</option>
                      <option value="bathroom">Bathroom</option>
                      <option value="sofa">Sofa</option>
                      <option value="water_tank">Water Tank</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300">Base Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={formData.basePrice}
                      onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300">Duration (Minutes)</label>
                    <input
                      type="number"
                      required
                      value={formData.durationMinutes}
                      onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300">Image Path / URL</label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowAddModal(false); setEditingService(null); }}
                    className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-primary text-neutral-950 text-xs font-bold"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
