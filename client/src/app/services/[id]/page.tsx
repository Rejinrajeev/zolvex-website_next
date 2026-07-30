"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star, Clock, CheckCircle2, ShieldCheck, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/booking/BookingModal";

interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  durationMinutes: number;
  image: string;
  rating: number;
  reviews: number;
  variations: Array<{ _id: string; name: string; price: number }>;
  inclusions: Array<{ _id: string; description: string }>;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchService();
    }
  }, [params.id]);

  const fetchService = async () => {
    try {
      const res = await fetch(`/api/v1/services/${params.id}`);
      const json = await res.json();
      if (json.success && json.data) {
        setService(json.data);
      }
    } catch (e) {
      console.warn("Failed to fetch service detail:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
        <p className="text-xs font-semibold text-neutral-400">Loading service details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4 space-y-4">
        <h1 className="text-xl font-bold">Service Not Found</h1>
        <Link href="/services" className="text-xs text-primary font-bold underline">Return to Services Catalog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link href="/services" className="inline-flex items-center space-x-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Services Catalog</span>
        </Link>

        {/* Hero Banner Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="bg-primary/10 text-primary text-xs font-extrabold px-3 py-1 rounded-full uppercase border border-primary/20">
                {service.category.replace("_", " ")}
              </span>
              <span className="flex items-center text-amber-400 text-xs font-bold space-x-1">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{service.rating} ({service.reviews} reviews)</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{service.name}</h1>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{service.description}</p>

            <div className="pt-2 flex items-center space-x-6 text-xs text-neutral-400">
              <span className="flex items-center space-x-1.5 font-bold text-white">
                <Clock className="w-4 h-4 text-primary" />
                <span>{service.durationMinutes || 90} Mins Duration</span>
              </span>
              <span className="flex items-center space-x-1.5 font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Professionals</span>
              </span>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Starting Price</span>
                <span className="text-2xl font-black text-primary">₹{service.basePrice?.toLocaleString()}</span>
              </div>

              <Button
                onClick={() => setShowBookingModal(true)}
                className="py-3 px-6 rounded-xl bg-primary hover:bg-primaryHover text-neutral-950 font-extrabold text-xs shadow-lg transition-all"
              >
                Book Service Now
              </Button>
            </div>
          </div>

          {/* Service Image */}
          <div className="relative h-64 md:h-full rounded-2xl overflow-hidden border border-neutral-800">
            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Inclusions Card */}
        <div className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 rounded-3xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>What's Included in This Package</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {service.inclusions?.map((inc, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 rounded-xl bg-neutral-950 border border-neutral-850">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-xs text-neutral-200 font-medium">{inc.description}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {showBookingModal && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          service={service}
        />
      )}
    </div>
  );
}
