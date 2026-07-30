const mongoose = require("mongoose");
const config = require("../config");
const logger = require("../config/logger");
const User = require("../models/User");
const Service = require("../models/Service");
const Addon = require("../models/Addon");
const { hashPassword } = require("../utils/passwordUtils");

const seedServices = [
  {
    name: "Full Home Deep Cleaning",
    slug: "deep-cleaning",
    description: "Complete home sanitization and deep cleaning from ceiling to floor, including kitchen and bathrooms.",
    category: "deep_cleaning",
    basePrice: 2999,
    isActive: true,
    displayOrder: 1,
    image: "/images/work_img_1.jpeg",
    rating: 4.9,
    reviews: 142,
    variations: [
      { name: "1 BHK", price: 2999, displayOrder: 1 },
      { name: "2 BHK", price: 3999, displayOrder: 2 },
      { name: "3 BHK", price: 4999, displayOrder: 3 },
      { name: "4+ BHK / Villa", price: 6999, displayOrder: 4 }
    ],
    inclusions: [
      { description: "Living room & bedroom dusting, mopping & vacuuming", displayOrder: 1 },
      { description: "Kitchen degreasing, chimney exterior & countertop scrub", displayOrder: 2 },
      { description: "Bathroom hard water stain removal & tile sanitization", displayOrder: 3 },
      { description: "Balcony scrubbing & window glass wipe down", displayOrder: 4 }
    ]
  },
  {
    name: "Kitchen Deep Cleaning",
    slug: "kitchen-cleaning",
    description: "Specialized oil degreasing, cabinet interior/exterior scrubbing, and appliance surface polish.",
    category: "kitchen",
    basePrice: 1799,
    isActive: true,
    displayOrder: 2,
    image: "/images/work_img_2.jpeg",
    rating: 4.8,
    reviews: 98,
    variations: [
      { name: "Standard Kitchen", price: 1799, displayOrder: 1 },
      { name: "Large / Modular Kitchen", price: 2499, displayOrder: 2 }
    ],
    inclusions: [
      { description: "Oil & grease removal from wall tiles & stove area", displayOrder: 1 },
      { description: "Cabinet exterior & handle degreasing", displayOrder: 2 },
      { description: "Sink descaling & floor scrubbing", displayOrder: 3 }
    ]
  },
  {
    name: "Bathroom Sanitization & Cleaning",
    slug: "bathroom-cleaning",
    description: "Eliminate tough limescale, mold, and germs with eco-friendly chemical treatment and high-pressure scrub.",
    category: "bathroom",
    basePrice: 1299,
    isActive: true,
    displayOrder: 3,
    image: "/images/work_img_3.jpeg",
    rating: 4.85,
    reviews: 115,
    variations: [
      { name: "1 Bathroom", price: 1299, displayOrder: 1 },
      { name: "2 Bathrooms", price: 2199, displayOrder: 2 },
      { name: "3 Bathrooms", price: 2999, displayOrder: 3 }
    ],
    inclusions: [
      { description: "Limescale & hard water deposit removal from fittings", displayOrder: 1 },
      { description: "WC bowl, wash basin & mirror descaling", displayOrder: 2 },
      { description: "Wall tiles & floor scrubbing", displayOrder: 3 }
    ]
  },
  {
    name: "Sofa & Upholstery Deep Cleaning",
    slug: "sofa-cleaning",
    description: "Deep injection-extraction shampooing to remove deep-seated dirt, food stains, and allergen buildup.",
    category: "sofa",
    basePrice: 1499,
    isActive: true,
    displayOrder: 4,
    image: "/images/work_img_7.jpeg",
    rating: 4.75,
    reviews: 86,
    variations: [
      { name: "3 Seater Sofa", price: 1499, displayOrder: 1 },
      { name: "5 Seater Sofa", price: 1999, displayOrder: 2 },
      { name: "7 Seater / L-Shape Sofa", price: 2699, displayOrder: 3 }
    ],
    inclusions: [
      { description: "Dry vacuuming to extract dust & pet hair", displayOrder: 1 },
      { description: "Fabric-safe foam shampooing & stain removal", displayOrder: 2 },
      { description: "High-suction moisture extraction & deodorization", displayOrder: 3 }
    ]
  },
  {
    name: "Water Tank Cleaning",
    slug: "water-tank-cleaning",
    description: "Hygienic 6-stage overhead tank cleaning with sludge extraction and UV anti-bacterial treatment.",
    category: "water_tank",
    basePrice: 999,
    isActive: true,
    displayOrder: 5,
    image: "/images/work_img_5.jpeg",
    rating: 4.9,
    reviews: 73,
    variations: [
      { name: "Up to 500L Tank", price: 999, displayOrder: 1 },
      { name: "1000L Tank", price: 1499, displayOrder: 2 },
      { name: "2000L+ Tank", price: 2299, displayOrder: 3 }
    ],
    inclusions: [
      { description: "Dewatering & bottom sludge removal", displayOrder: 1 },
      { description: "High-pressure water jet scrubbing", displayOrder: 2 },
      { description: "Anti-bacterial disinfectant wash", displayOrder: 3 }
    ]
  }
];

const seedAddons = [
  {
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
    name: "Fridge Interior Deep Clean",
    description: "Removal of food stains, shelf washing & anti-odor wipe down.",
    basePrice: 499,
    isPerUnit: false,
    category: "kitchen",
    isActive: true,
    displayOrder: 2
  },
  {
    name: "Microwave & Oven Cleaning",
    description: "Degreasing interior grease stains and turntable sanitization.",
    basePrice: 399,
    isPerUnit: false,
    category: "kitchen",
    isActive: true,
    displayOrder: 3
  },
  {
    name: "Extra Bathroom Deep Scrub",
    description: "Deep cleaning treatment for an additional bathroom.",
    basePrice: 699,
    isPerUnit: true,
    unitName: "bathroom",
    category: "bathroom",
    isActive: true,
    displayOrder: 4,
    variations: [
      { name: "Standard Acid Scrub", price: 699, displayOrder: 1 },
      { name: "Steam Sanitization Scrub", price: 999, displayOrder: 2 }
    ]
  }
];

async function runSeed() {
  try {
    await mongoose.connect(config.mongoose.url);
    logger.info("Connected to MongoDB for seeding...");

    // Clear existing catalog & admin
    await Service.deleteMany({});
    await Addon.deleteMany({});

    await Service.insertMany(seedServices);
    await Addon.insertMany(seedAddons);

    // Create Super Admin User if not exists
    const adminExists = await User.findOne({ email: "admin@zolvex.com" });
    if (!adminExists) {
      const hashedPassword = await hashPassword("Admin123!@#");
      await User.create({
        name: "Zolvex Administrator",
        email: "admin@zolvex.com",
        phone: "+919876543210",
        password: hashedPassword,
        role: "super_admin"
      });
      logger.info("👑 Super Admin User created: admin@zolvex.com / Admin123!@#");
    }

    logger.info("🌱 Database Seeded Successfully!");
    process.exit(0);
  } catch (error) {
    logger.error("Error seeding database:", error);
    process.exit(1);
  }
}

runSeed();
