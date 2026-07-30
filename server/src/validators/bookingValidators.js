const { z } = require("zod");

const createBookingSchema = {
  body: z.object({
    serviceId: z.string().min(1, "serviceId is required"),
    variationId: z.string().min(1, "variationId is required"),
    customerName: z.string().min(2, "Customer name is required"),
    customerPhone: z.string().min(10, "Customer phone number is required"),
    customerEmail: z.string().email("Invalid email format").optional().or(z.literal("")),
    customerAddress: z.string().min(5, "Complete address is required"),
    preferredDate: z.string().min(1, "Preferred date is required"),
    preferredTime: z.string().min(1, "Preferred time slot is required"),
    additionalInfo: z.string().optional(),
    addons: z.array(
      z.object({
        addonId: z.string(),
        variationId: z.string().optional(),
        quantity: z.number().min(1).optional()
      })
    ).optional()
  })
};

const calculatePriceSchema = {
  body: z.object({
    serviceId: z.string().min(1, "serviceId is required"),
    variationId: z.string().min(1, "variationId is required"),
    addons: z.array(
      z.object({
        addonId: z.string(),
        variationId: z.string().optional(),
        quantity: z.number().min(1).optional()
      })
    ).optional()
  })
};

module.exports = {
  createBookingSchema,
  calculatePriceSchema
};
