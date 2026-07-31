"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Sparkles, 
  ChevronRight,
  Star,
  Clock,
  Search,
  MapPin,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingFlowModal } from "@/components/booking/BookingFlowModal";

interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  base_price: number | null;
  image?: string;
  rating?: number;
  reviews?: number;
  variations?: Array<{ id: string; name: string; price: number }>;
  inclusions?: Array<{ id: string; description: string }>;
}

const categories = [
  { id: "all", name: "All Services" },
  { id: "deep_cleaning", name: "Deep Cleaning" },
  { id: "kitchen", name: "Kitchen" },
  { id: "bathroom", name: "Bathroom" },
  { id: "sofa", name: "Sofa & Upholstery" },
  { id: "water_tank", name: "Water Tank" }
];

export function ServicesGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/v1/services");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const mapped = data.data.map((s: any) => ({
            id: s._id || s.id,
            name: s.name,
            slug: s.slug,
            description: s.description,
            category: s.category,
            base_price: s.basePrice || s.base_price,
            image: s.image,
            rating: s.rating,
            reviews: s.reviews,
            variations: (s.variations || []).map((v: any) => ({ id: v._id || v.id, name: v.name, price: v.price })),
            inclusions: (s.inclusions || []).map((i: any) => ({ id: i._id || i.id, description: i.description }))
          }));
          setServices(mapped);
        }
      }
    } catch (e) {
      console.warn("Failed to fetch services from Express backend API:", e);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleServiceClick = (service: ServiceItem) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Location and Search Bar */}
      <div className="bg-card rounded-2xl shadow-xs border border-border/80 mb-8 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span className="text-sm font-bold text-foreground">Service Locations:</span>
          <span className="text-xs font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            TRIVANDRUM
          </span>
          <span className="text-xs font-bold text-muted bg-secondaryBg px-3 py-1 rounded-full border border-border">
            ERNAKULAM
          </span>
        </div>
        
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search cleaning packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-xs bg-secondaryBg/20 font-medium transition-all"
            aria-label="Search cleaning services"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground text-xs font-bold bg-secondaryBg w-5 h-5 rounded-full flex items-center justify-center"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => {
          const count = category.id === "all" 
            ? services.length 
            : services.filter(s => s.category === category.id).length;

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-primary ${
                selectedCategory === category.id
                  ? "bg-primary text-white shadow-md scale-105"
                  : "bg-card border border-border text-muted hover:border-primary hover:text-primary"
              }`}
            >
              <span>{category.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                selectedCategory === category.id ? "bg-card/20 text-white" : "bg-secondaryBg text-muted"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="text-center py-16">
          <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-sm font-semibold text-muted">Loading active services catalog...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="group"
            >
              <div className="bg-card rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
                
                {/* Image Container */}
                <div 
                  className="relative h-48 overflow-hidden bg-secondaryBg cursor-pointer"
                  onClick={() => handleServiceClick(service)}
                >
                  <Image
                    src={service.image || `/images/work_img_${(index % 8) + 1}.jpeg`}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  
                  {index === 0 && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md uppercase tracking-wider">
                      <Star className="w-3 h-3 fill-white" />
                      POPULAR
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{service.rating || 4.9}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-primary" />
                    <span>3-4 hrs</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 
                      onClick={() => handleServiceClick(service)}
                      className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-1.5 cursor-pointer line-clamp-1"
                    >
                      {service.name}
                    </h3>
                    
                    <p className="text-xs text-muted mb-4 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>

                    {service.inclusions && service.inclusions.length > 0 && (
                      <div className="space-y-1.5 mb-4 bg-secondaryBg/40 p-2.5 rounded-xl border border-border/40">
                        <span className="text-[10px] uppercase font-bold text-muted block">Included in package:</span>
                        {service.inclusions.slice(0, 2).map((inc, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-muted">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="line-clamp-1">{inc.description}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-muted block uppercase font-bold">Starting at</span>
                      <p className="text-lg font-black text-primary">₹{(service.base_price || 2999).toLocaleString()}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        className="bg-primary text-white hover:bg-primaryHover text-xs font-bold px-4 py-2 h-9 shadow-xs transition-all hover:scale-105"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(service);
                        }}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredServices.length === 0 && (
        <div className="text-center py-16 bg-card rounded-2xl border border-border/80 shadow-xs max-w-md mx-auto my-8 p-6">
          <Sparkles className="w-12 h-12 text-primary/40 mx-auto mb-3" />
          <h3 className="text-base font-bold text-foreground mb-1">No services found</h3>
          <p className="text-muted text-xs mb-4">We couldn't find any service matching "{searchQuery}".</p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-primaryHover transition-all shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      <BookingFlowModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </>
  );
}