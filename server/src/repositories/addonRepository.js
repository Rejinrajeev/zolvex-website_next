const Addon = require("../models/Addon");
const { getIsConnected } = require("../database/connect");

const fallbackAddons = [
  {
    _id: "add-001",
    id: "add-001",
    name: "Balcony Pressure Wash",
    description: "High-pressure floor jet wash for balcony tiles and railings.",
    basePrice: 499,
    isPerUnit: true,
    unitName: "balcony",
    category: "outdoor",
    isActive: true,
    displayOrder: 1
  },
  {
    _id: "add-002",
    id: "add-002",
    name: "Fridge Interior Deep Clean",
    description: "Removal of food stains, shelf washing & anti-odor wipe down.",
    basePrice: 499,
    isPerUnit: false,
    category: "kitchen",
    isActive: true,
    displayOrder: 2
  },
  {
    _id: "add-003",
    id: "add-003",
    name: "Microwave & Oven Cleaning",
    description: "Degreasing interior grease stains and turntable sanitization.",
    basePrice: 399,
    isPerUnit: false,
    category: "kitchen",
    isActive: true,
    displayOrder: 3
  },
  {
    _id: "add-004",
    id: "add-004",
    name: "Extra Bathroom Deep Scrub",
    description: "Deep cleaning treatment for an additional bathroom.",
    basePrice: 699,
    isPerUnit: true,
    unitName: "bathroom",
    category: "bathroom",
    isActive: true,
    displayOrder: 4,
    variations: [
      { _id: "addvar-601", id: "addvar-601", name: "Standard Acid Scrub", price: 699, displayOrder: 1 },
      { _id: "addvar-602", id: "addvar-602", name: "Steam Sanitization Scrub", price: 999, displayOrder: 2 }
    ]
  }
];

class AddonRepository {
  async findAllActive() {
    if (getIsConnected()) {
      try {
        const addons = await Addon.find({ isActive: true }).sort({ displayOrder: 1 }).lean();
        if (addons && addons.length > 0) return addons;
      } catch (e) {}
    }
    return fallbackAddons;
  }

  async findById(id) {
    if (getIsConnected()) {
      try {
        const addon = await Addon.findById(id).lean();
        if (addon) return addon;
      } catch (e) {}
    }
    return fallbackAddons.find(a => a._id === id || a.id === id) || null;
  }

  async create(addonData) {
    if (getIsConnected()) {
      return Addon.create(addonData);
    }
    const newAddon = { ...addonData, _id: `add-${Date.now()}` };
    fallbackAddons.push(newAddon);
    return newAddon;
  }
}

module.exports = new AddonRepository();
