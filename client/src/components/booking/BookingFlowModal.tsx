"use client";

import { useState, useEffect } from "react";
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MapPin, 
  Phone, 
  User, 
  Sparkles, 
  Plus, 
  Minus, 
  AlertCircle,
  Copy,
  Check,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Variation {
  id: string;
  name: string;
  price: number;
}

interface Inclusion {
  id: string;
  description: string;
}

interface AddonVariation {
  id: string;
  name: string;
  price: number;
}

interface Addon {
  id: string;
  name: string;
  description: string;
  base_price: number;
  is_per_unit: boolean;
  unit_name?: string;
  variations?: AddonVariation[];
}

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  base_price: number | null;
  variations?: Variation[];
  inclusions?: Inclusion[];
  price?: string;
}

interface BookingFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export function BookingFlowModal({ isOpen, onClose, service }: BookingFlowModalProps) {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [calcLoading, setCalcLoading] = useState<boolean>(false);
  const [availableAddons, setAvailableAddons] = useState<Addon[]>([]);
  
  // Selection States
  const [selectedVariationId, setSelectedVariationId] = useState<string>("");
  const [selectedAddons, setSelectedAddons] = useState<Record<string, { quantity: number; variationId?: string }>>({});
  
  // Schedule States
  const [preferredDate, setPreferredDate] = useState<string>("");
  const [preferredTime, setPreferredTime] = useState<string>("09:00 - 12:00 (Morning)");

  // Customer Contact & Address
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");

  // Price & Confirmation
  const [priceBreakdown, setPriceBreakdown] = useState<{
    basePrice: number;
    addonsTotal: number;
    totalPrice: number;
    breakdown: Array<{ addonId: string; name: string; quantity: number; unitPrice: number; total: number }>;
  } | null>(null);

  const [createdBooking, setCreatedBooking] = useState<{
    booking_number: string;
    total_price: number;
    customer_name: string;
    preferred_date: string;
    preferred_time: string;
  } | null>(null);

  const [copiedRef, setCopiedRef] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Fetch full service details and addons when modal opens
  useEffect(() => {
    if (isOpen && service) {
      setStep(1);
      setErrorMsg("");
      setCreatedBooking(null);

      // Set default variation
      if (service.variations && service.variations.length > 0) {
        const firstVar = service.variations[0];
        setSelectedVariationId(firstVar.id || (firstVar as any)._id || "var-101");
      } else {
        setSelectedVariationId("var-101");
      }

      // Default date to tomorrow formatted YYYY-MM-DD
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setPreferredDate(tomorrow.toISOString().split("T")[0]);

      // Fetch addons from API
      fetchAddons();
    }
  }, [isOpen, service]);

  const fetchAddons = async () => {
    try {
      const res = await fetch("/api/v1/addons");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const mapped = data.data.map((a: any) => ({
            id: a._id || a.id,
            name: a.name,
            description: a.description,
            base_price: a.basePrice || a.base_price,
            is_per_unit: a.isPerUnit || a.is_per_unit,
            unit_name: a.unitName || a.unit_name,
            variations: a.variations
          }));
          setAvailableAddons(mapped);
        }
      }
    } catch (e) {
      console.warn("Could not fetch addons:", e);
    }
  };

  // Recalculate price whenever variation or addons change
  useEffect(() => {
    if (isOpen && service) {
      calculateLivePrice();
    }
  }, [selectedVariationId, selectedAddons, service, isOpen]);

  const calculateLivePrice = async () => {
    if (!service) return;
    setCalcLoading(true);
    try {
      const targetServiceId = service.id || (service as any)._id || service.slug || "srv-001";
      const firstVar = service.variations?.[0];
      const targetVarId = selectedVariationId || (firstVar ? (firstVar.id || (firstVar as any)._id) : "var-101");

      const addonsPayload = Object.entries(selectedAddons)
        .filter(([_, item]) => item.quantity > 0)
        .map(([addonId, item]) => ({
          addonId,
          variationId: item.variationId,
          quantity: item.quantity
        }));

      const res = await fetch("/api/v1/price/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: targetServiceId,
          variationId: targetVarId,
          addons: addonsPayload
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setPriceBreakdown(data.data);
        }
      }
    } catch (e) {
      console.error("Live price calculate failed:", e);
    } finally {
      setCalcLoading(false);
    }
  };

  if (!isOpen || !service) return null;

  const handleAddonQuantityChange = (addonId: string, delta: number) => {
    setSelectedAddons(prev => {
      const current = prev[addonId] || { quantity: 0 };
      const newQty = Math.max(0, current.quantity + delta);
      if (newQty === 0) {
        const copy = { ...prev };
        delete copy[addonId];
        return copy;
      }
      return {
        ...prev,
        [addonId]: { ...current, quantity: newQty }
      };
    });
  };

  const handleAddonVariationChange = (addonId: string, variationId: string) => {
    setSelectedAddons(prev => {
      const current = prev[addonId] || { quantity: 1 };
      return {
        ...prev,
        [addonId]: { ...current, variationId }
      };
    });
  };

  const handleSubmitBooking = async () => {
    setErrorMsg("");
    if (!customerName || !customerPhone || !customerAddress) {
      setErrorMsg("Please fill in your name, phone number, and address.");
      return;
    }

    setLoading(true);
    try {
      const targetServiceId = service.id || (service as any)._id || service.slug || "srv-001";
      const firstVar = service.variations?.[0];
      const targetVarId = selectedVariationId || (firstVar ? (firstVar.id || (firstVar as any)._id) : "var-101");

      const addonsPayload = Object.entries(selectedAddons)
        .filter(([_, item]) => item.quantity > 0)
        .map(([addonId, item]) => ({
          addonId,
          variationId: item.variationId,
          quantity: item.quantity
        }));

      const res = await fetch("/api/v1/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: targetServiceId,
          variationId: targetVarId,
          customerName,
          customerPhone,
          customerEmail,
          customerAddress,
          preferredDate,
          preferredTime,
          additionalInfo,
          addons: addonsPayload
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const b = data.data;
          setCreatedBooking({
            booking_number: b.bookingNumber || b.booking_number || `ZLV-${Date.now().toString().slice(-4)}`,
            total_price: b.totalPrice ?? b.total_price ?? priceBreakdown?.totalPrice ?? service.base_price ?? 2999,
            customer_name: b.customerName || b.customer_name || customerName,
            preferred_date: b.preferredDate || b.preferred_date || preferredDate,
            preferred_time: b.preferredTime || b.preferred_time || preferredTime
          });
          setStep(5); // Move to confirmation step
        } else {
          setErrorMsg(data.error || "Failed to complete booking. Please try again.");
        }
      } else {
        const errJson = await res.json().catch(() => ({}));
        setErrorMsg(errJson.error || "Failed to complete booking. Please try again.");
      }
    } catch (e: any) {
      setErrorMsg(e.message || "Network error submitting booking.");
    } finally {
      setLoading(false);
    }
  };

  const copyRefToClipboard = () => {
    if (createdBooking?.booking_number) {
      navigator.clipboard.writeText(createdBooking.booking_number);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const timeSlots = [
    "08:00 - 11:00 (Early Morning)",
    "11:00 - 14:00 (Afternoon)",
    "14:00 - 17:00 (Late Afternoon)",
    "17:00 - 20:00 (Evening)"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity">
      <div className="bg-white w-full sm:max-w-xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col shadow-2xl overflow-hidden border border-border/40 animate-slide-up sm:animate-scale-in">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-foreground to-neutral-800 text-white p-4 sm:p-5 flex items-center justify-between relative">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-primary font-bold tracking-wide uppercase">Booking Service</span>
              <h2 className="text-lg font-bold text-white line-clamp-1">{service.name}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 5 && (
          <div className="bg-secondaryBg/40 px-4 py-2.5 border-b border-border/50 flex items-center justify-between text-xs text-muted">
            <div className="flex items-center space-x-1.5 font-semibold text-foreground">
              <span className="w-5 h-5 rounded-full bg-primary text-foreground flex items-center justify-center text-[11px]">
                {step}
              </span>
              <span>
                {step === 1 && "Select Package"}
                {step === 2 && "Add-on Services"}
                {step === 3 && "Date & Time"}
                {step === 4 && "Contact & Address"}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4].map(s => (
                <div 
                  key={s} 
                  className={`h-1.5 rounded-full transition-all ${
                    s === step ? "w-6 bg-primary" : s < step ? "w-3 bg-foreground/40" : "w-2 bg-border"
                  }`} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Modal Body Scroll Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-start space-x-2 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Select Scope / Variation */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-foreground mb-1">Select Property Size / Service Scope</h3>
                <p className="text-xs text-muted">Choose the variation that matches your space for an accurate quote.</p>
              </div>

              {service.variations && service.variations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.variations.map((varItem) => {
                    const isSelected = selectedVariationId === varItem.id;
                    return (
                      <div
                        key={varItem.id}
                        onClick={() => setSelectedVariationId(varItem.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border/60 hover:border-primary/40 bg-white"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? "border-primary bg-primary" : "border-muted"
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-foreground font-bold" />}
                          </div>
                          <span className="font-semibold text-sm text-foreground">{varItem.name}</span>
                        </div>
                        <span className="font-bold text-base text-primary">₹{(varItem.price || 0).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-secondaryBg/30 text-sm text-muted">
                  Standard fixed rate package: <span className="font-bold text-primary">{service.price || "₹2,999"}</span>
                </div>
              )}

              {/* What's Included Bullets */}
              {service.inclusions && service.inclusions.length > 0 && (
                <div className="pt-3 border-t border-border/50">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Included in this package</span>
                  </h4>
                  <div className="bg-secondaryBg/30 rounded-xl p-3.5 space-y-2 text-xs text-foreground">
                    {service.inclusions.map((inc, i) => (
                      <div key={inc.id || i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{inc.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Custom Add-ons */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-foreground mb-1">Enhance Your Cleaning (Optional Add-ons)</h3>
                <p className="text-xs text-muted">Select additional specialized cleaning services for best results.</p>
              </div>

              <div className="space-y-3">
                {availableAddons.map((addon) => {
                  const currentAddon = selectedAddons[addon.id] || { quantity: 0 };
                  const isSelected = currentAddon.quantity > 0;

                  return (
                    <div
                      key={addon.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isSelected ? "border-primary bg-primary/5 shadow-sm" : "border-border/60 bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 pr-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-sm text-foreground">{addon.name}</span>
                            {addon.is_per_unit && (
                              <span className="text-[10px] bg-secondaryBg px-2 py-0.5 rounded-full text-muted font-medium">
                                per {addon.unit_name || "unit"}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted line-clamp-1">{addon.description}</p>
                          <p className="text-xs font-bold text-primary">₹{addon.base_price}</p>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center space-x-2 pt-1">
                          {currentAddon.quantity > 0 ? (
                            <div className="flex items-center bg-white border border-primary rounded-lg shadow-sm">
                              <button
                                onClick={() => handleAddonQuantityChange(addon.id, -1)}
                                className="w-7 h-7 flex items-center justify-center text-foreground hover:bg-secondaryBg transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-foreground">
                                {currentAddon.quantity}
                              </span>
                              <button
                                onClick={() => handleAddonQuantityChange(addon.id, 1)}
                                className="w-7 h-7 flex items-center justify-center text-foreground hover:bg-secondaryBg transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAddonQuantityChange(addon.id, 1)}
                              className="px-3 py-1.5 rounded-lg bg-secondaryBg hover:bg-primary hover:text-white text-xs font-bold text-foreground transition-all flex items-center space-x-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Add-on Variations Dropdown (if applicable) */}
                      {isSelected && addon.variations && addon.variations.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-primary/20">
                          <label className="text-[11px] font-semibold text-foreground block mb-1">
                            Choose Treatment Option:
                          </label>
                          <select
                            value={currentAddon.variationId || addon.variations[0]?.id}
                            onChange={(e) => handleAddonVariationChange(addon.id, e.target.value)}
                            className="w-full text-xs p-2 rounded-lg border border-border bg-white text-foreground focus:ring-1 focus:ring-primary outline-none"
                          >
                            {addon.variations.map(v => (
                              <option key={v.id} value={v.id}>
                                {v.name} (₹{v.price})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Preferred Date & Time */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-foreground mb-1">Schedule Your Cleaning Slot</h3>
                <p className="text-xs text-muted">Select your preferred date and time for technician arrival.</p>
              </div>

              {/* Date Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Preferred Date</span>
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-white text-sm font-semibold text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                />
              </div>

              {/* Time Slot Picker */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-foreground flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Arrival Time Slot</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = preferredTime === slot;
                    return (
                      <div
                        key={slot}
                        onClick={() => setPreferredTime(slot)}
                        className={`p-3 rounded-xl border-2 cursor-pointer text-xs font-semibold transition-all flex items-center space-x-2 ${
                          isSelected
                            ? "border-primary bg-primary/10 text-foreground font-bold shadow-sm"
                            : "border-border/60 hover:border-primary/40 bg-white text-muted"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-primary bg-primary" : "border-muted"
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 text-foreground" />}
                        </div>
                        <span>{slot}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Contact & Address */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-foreground mb-1">Enter Contact & Location Details</h3>
                <p className="text-xs text-muted">We will send booking confirmation & technician details to this phone number.</p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>Phone Number (for SMS & WhatsApp) *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 9876543210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span>Complete Address (House/Flat No, Building, Street, Area) *</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Flat 4B, Emerald Heights, MG Road, Trivandrum"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted">Special Instructions / Gate Code (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Please ring bell twice, pet inside"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Booking Confirmation Success Screen */}
          {step === 5 && createdBooking && (
            <div className="text-center py-4 space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Booking Confirmed
                </span>
                <h3 className="text-xl font-extrabold text-foreground mt-2">Thank You, {createdBooking.customer_name}!</h3>
                <p className="text-xs text-muted mt-1">Your cleaning service has been scheduled successfully.</p>
              </div>

              {/* Reference ID Card */}
              <div className="bg-secondaryBg/40 p-4 rounded-2xl border border-border/60 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
                  <div>
                    <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Booking Reference</span>
                    <p className="text-lg font-black text-primary font-mono">{createdBooking.booking_number}</p>
                  </div>
                  <button
                    onClick={copyRefToClipboard}
                    className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-white border border-border text-xs font-semibold text-foreground hover:border-primary transition-all"
                  >
                    {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedRef ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted block">Scheduled Date:</span>
                    <span className="font-bold text-foreground">{createdBooking.preferred_date}</span>
                  </div>
                  <div>
                    <span className="text-muted block">Time Slot:</span>
                    <span className="font-bold text-foreground">{createdBooking.preferred_time}</span>
                  </div>
                  <div>
                    <span className="text-muted block">Total Amount:</span>
                    <span className="font-bold text-primary text-base">₹{(createdBooking.total_price ?? 0).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted block">Payment Mode:</span>
                    <span className="font-bold text-foreground">Pay After Service</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 p-3 rounded-xl border border-primary/20 text-xs text-foreground text-left flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Our technician team lead will call you 1 hour before arrival. You can track your booking status anytime on our website!</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar / Price & Nav Actions */}
        <div className="bg-white border-t border-border/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {step < 5 ? (
            <>
              {/* Price Pill */}
              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start space-x-3">
                <div className="text-left">
                  <span className="text-[10px] text-muted uppercase tracking-wider font-bold block">Estimated Total</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xl font-extrabold text-primary">
                      ₹{(priceBreakdown?.totalPrice || service.base_price || 2999).toLocaleString()}
                    </span>
                    {calcLoading && <span className="text-[10px] text-muted animate-pulse">updating...</span>}
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                  Pay Post-Service
                </span>
              </div>

              {/* Navigation Buttons */}
              <div className="w-full sm:w-auto flex items-center space-x-2">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(s => s - 1)}
                    className="flex-1 sm:flex-none border-border hover:bg-secondaryBg text-foreground font-semibold px-4 py-2.5 h-auto text-xs"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                )}

                {step < 4 ? (
                  <Button
                    onClick={() => setStep(s => s + 1)}
                    className="flex-1 sm:flex-none bg-primary hover:bg-primaryHover text-white font-bold px-6 py-2.5 h-auto text-xs shadow-md transition-all"
                  >
                    Next Step <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmitBooking}
                    disabled={loading}
                    className="flex-1 sm:flex-none bg-primary hover:bg-primaryHover text-white font-bold px-6 py-2.5 h-auto text-xs shadow-md transition-all disabled:opacity-50"
                  >
                    {loading ? "Confirming..." : "Confirm & Book Now"}
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-border text-foreground font-semibold py-3 text-xs"
              >
                Close
              </Button>
              <a
                href={`/my-bookings`}
                className="flex-1"
              >
                <Button className="w-full bg-primary hover:bg-primaryHover text-white font-bold py-3 text-xs shadow-md">
                  View My Bookings
                </Button>
              </a>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
