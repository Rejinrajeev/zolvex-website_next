const Service = require("../models/Service");
const { getIsConnected } = require("../database/connect");

const fallbackServices = [
  {
    _id: "srv-001",
    id: "srv-001",
    name: "Full Home Deep Cleaning",
    slug: "deep-cleaning",
    description: "Complete home sanitization and deep cleaning from ceiling to floor, including kitchen and bathrooms.",
    category: "deep_cleaning",
    basePrice: 2999,
    durationMinutes: 180,
    isAvailable: true,
    isActive: true,
    displayOrder: 1,
    image: "/images/work_img_1.jpeg",
    rating: 4.9,
    reviews: 142,
    variations: [
      { _id: "var-101", id: "var-101", name: "1 BHK", price: 2999, displayOrder: 1 },
      { _id: "var-102", id: "var-102", name: "2 BHK", price: 3999, displayOrder: 2 },
      { _id: "var-103", id: "var-103", name: "3 BHK", price: 4999, displayOrder: 3 },
      { _id: "var-104", id: "var-104", name: "4+ BHK / Villa", price: 6999, displayOrder: 4 }
    ],
    inclusions: [
      { _id: "inc-101", description: "Living room & bedroom dusting, mopping & vacuuming", displayOrder: 1 },
      { _id: "inc-102", description: "Kitchen degreasing, chimney exterior & countertop scrub", displayOrder: 2 },
      { _id: "inc-103", description: "Bathroom hard water stain removal & tile sanitization", displayOrder: 3 },
      { _id: "inc-104", description: "Balcony scrubbing & window glass wipe down", displayOrder: 4 }
    ]
  },
  {
    _id: "srv-002",
    id: "srv-002",
    name: "Kitchen Deep Cleaning",
    slug: "kitchen-cleaning",
    description: "Specialized oil degreasing, cabinet interior/exterior scrubbing, and appliance surface polish.",
    category: "kitchen",
    basePrice: 1799,
    durationMinutes: 120,
    isAvailable: true,
    isActive: true,
    displayOrder: 2,
    image: "/images/work_img_2.jpeg",
    rating: 4.8,
    reviews: 98,
    variations: [
      { _id: "var-201", id: "var-201", name: "Standard Kitchen", price: 1799, displayOrder: 1 },
      { _id: "var-202", id: "var-202", name: "Large / Modular Kitchen", price: 2499, displayOrder: 2 }
    ],
    inclusions: [
      { _id: "inc-201", description: "Oil & grease removal from wall tiles & stove area", displayOrder: 1 },
      { _id: "inc-202", description: "Cabinet exterior & handle degreasing", displayOrder: 2 },
      { _id: "inc-203", description: "Sink descaling & floor scrubbing", displayOrder: 3 }
    ]
  },
  {
    _id: "srv-003",
    id: "srv-003",
    name: "Bathroom Sanitization & Cleaning",
    slug: "bathroom-cleaning",
    description: "Eliminate tough limescale, mold, and germs with eco-friendly chemical treatment and high-pressure scrub.",
    category: "bathroom",
    basePrice: 1299,
    durationMinutes: 90,
    isAvailable: true,
    isActive: true,
    displayOrder: 3,
    image: "/images/work_img_3.jpeg",
    rating: 4.85,
    reviews: 115,
    variations: [
      { _id: "var-301", id: "var-301", name: "1 Bathroom", price: 1299, displayOrder: 1 },
      { _id: "var-302", id: "var-302", name: "2 Bathrooms", price: 2199, displayOrder: 2 },
      { _id: "var-303", id: "var-303", name: "3 Bathrooms", price: 2999, displayOrder: 3 }
    ],
    inclusions: [
      { _id: "inc-301", description: "Limescale & hard water deposit removal from fittings", displayOrder: 1 },
      { _id: "inc-302", description: "WC bowl, wash basin & mirror descaling", displayOrder: 2 },
      { _id: "inc-303", description: "Wall tiles & floor scrubbing", displayOrder: 3 }
    ]
  },
  {
    _id: "srv-004",
    id: "srv-004",
    name: "Sofa & Upholstery Deep Cleaning",
    slug: "sofa-cleaning",
    description: "Deep injection-extraction shampooing to remove deep-seated dirt, food stains, and allergen buildup.",
    category: "sofa",
    basePrice: 1499,
    durationMinutes: 90,
    isAvailable: true,
    isActive: true,
    displayOrder: 4,
    image: "/images/work_img_7.jpeg",
    rating: 4.75,
    reviews: 86,
    variations: [
      { _id: "var-401", id: "var-401", name: "3 Seater Sofa", price: 1499, displayOrder: 1 },
      { _id: "var-402", id: "var-402", name: "5 Seater Sofa", price: 1999, displayOrder: 2 },
      { _id: "var-403", id: "var-403", name: "7 Seater / L-Shape Sofa", price: 2699, displayOrder: 3 }
    ],
    inclusions: [
      { _id: "inc-401", description: "Dry vacuuming to extract dust & pet hair", displayOrder: 1 },
      { _id: "inc-402", description: "Fabric-safe foam shampooing & stain removal", displayOrder: 2 },
      { _id: "inc-403", description: "High-suction moisture extraction & deodorization", displayOrder: 3 }
    ]
  },
  {
    _id: "srv-005",
    id: "srv-005",
    name: "Water Tank Cleaning",
    slug: "water-tank-cleaning",
    description: "Hygienic 6-stage overhead tank cleaning with sludge extraction and UV anti-bacterial treatment.",
    category: "water_tank",
    basePrice: 999,
    durationMinutes: 60,
    isAvailable: true,
    isActive: true,
    displayOrder: 5,
    image: "/images/work_img_5.jpeg",
    rating: 4.9,
    reviews: 73,
    variations: [
      { _id: "var-501", id: "var-501", name: "Up to 500L Tank", price: 999, displayOrder: 1 },
      { _id: "var-502", id: "var-502", name: "1000L Tank", price: 1499, displayOrder: 2 },
      { _id: "var-503", id: "var-503", name: "2000L+ Tank", price: 2299, displayOrder: 3 }
    ],
    inclusions: [
      { _id: "inc-501", description: "Dewatering & bottom sludge removal", displayOrder: 1 },
      { _id: "inc-502", description: "High-pressure water jet scrubbing", displayOrder: 2 },
      { _id: "inc-503", description: "Anti-bacterial disinfectant wash", displayOrder: 3 }
    ]
  }
];

class ServiceRepository {
  async findAllActive() {
    if (getIsConnected()) {
      try {
        const services = await Service.find({ isActive: true }).sort({ displayOrder: 1 }).lean();
        if (services && services.length > 0) return services;
      } catch (e) {
        console.warn("Mongoose query error, falling back to local dataset:", e.message);
      }
    }
    return fallbackServices.filter(s => s.isActive);
  }

  async findAllAdmin() {
    if (getIsConnected()) {
      try {
        const services = await Service.find({}).sort({ displayOrder: 1 }).lean();
        if (services && services.length > 0) return services;
      } catch (e) {}
    }
    return fallbackServices;
  }

  async findBySlugOrId(idOrSlug) {
    if (getIsConnected()) {
      try {
        const isValidObjectId = idOrSlug.match(/^[0-9a-fA-F]{24}$/);
        const service = await Service.findOne({
          $or: [{ _id: isValidObjectId ? idOrSlug : null }, { slug: idOrSlug }]
        }).lean();
        if (service) return service;
      } catch (e) {
        console.warn("Mongoose findOne error:", e.message);
      }
    }
    return fallbackServices.find(s => s._id === idOrSlug || s.id === idOrSlug || s.slug === idOrSlug) || null;
  }

  async searchServices(searchQuery) {
    if (getIsConnected()) {
      try {
        return await Service.find(
          { $text: { $search: searchQuery }, isActive: true },
          { score: { $meta: "textScore" } }
        )
          .sort({ score: { $meta: "textScore" } })
          .lean();
      } catch (e) {}
    }
    const q = searchQuery.toLowerCase();
    return fallbackServices.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  }

  async create(serviceData) {
    const slug = serviceData.slug || serviceData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (getIsConnected()) {
      return Service.create({ ...serviceData, slug });
    }
    const newService = { ...serviceData, slug, _id: `srv-${Date.now()}`, isActive: true };
    fallbackServices.push(newService);
    return newService;
  }

  async update(id, serviceData) {
    if (getIsConnected()) {
      return Service.findByIdAndUpdate(id, serviceData, { new: true });
    }
    const s = fallbackServices.find(srv => srv._id === id || srv.id === id);
    if (s) Object.assign(s, serviceData);
    return s;
  }

  async delete(id) {
    if (getIsConnected()) {
      return Service.findByIdAndDelete(id);
    }
    const idx = fallbackServices.findIndex(srv => srv._id === id || srv.id === id);
    if (idx !== -1) fallbackServices.splice(idx, 1);
    return true;
  }
}

module.exports = new ServiceRepository();
