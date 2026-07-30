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
      <div className="bg-white rounded-2xl shadow-sm border border-border/80 mb-8 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Service Locations:</span>
          <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">TRIVANDRUM</span>
          <span className="text-xs text-muted bg-secondaryBg px-2.5 py-1 rounded-full">+ ERNAKULAM</span>
        </div>
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search home services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm bg-secondaryBg/20 font-medium"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === category.id
                ? "bg-primary text-white shadow-md scale-105"
                : "bg-white border border-border text-muted hover:border-primary hover:text-primary"
            }`}
          >
            {category.name}
          </button>
        ))}
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
              onClick={() => handleServiceClick(service)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-border/50 hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-secondaryBg">
                  <Image
                    src={service.image || `/images/work_img_${(index % 8) + 1}.jpeg`}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  
                  {index === 0 && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3 fill-white" />
                      POPULAR
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>3-4 hrs</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1.5">
                      {service.name}
                    </h3>
                    
                    <p className="text-xs text-muted mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {service.inclusions && (
                      <div className="space-y-1 mb-4">
                        {service.inclusions.slice(0, 2).map((inc, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-muted">
                            <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                            <span className="line-clamp-1">{inc.description}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/40">
                    <div>
                      <span className="text-[10px] text-muted block uppercase font-bold">Starting at</span>
                      <p className="text-xl font-extrabold text-primary">₹{(service.base_price || 2999).toLocaleString()}</p>
                    </div>

                    <Button 
                      className="bg-primary text-white hover:bg-primaryHover text-xs font-bold px-4 py-2 h-auto shadow-sm"
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
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredServices.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-border">
          <Sparkles className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-muted text-sm font-semibold">No services found matching your criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-3 text-primary text-xs font-bold hover:underline"
          >
            Clear filters
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