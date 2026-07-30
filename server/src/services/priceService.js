const serviceRepository = require("../repositories/serviceRepository");
const addonRepository = require("../repositories/addonRepository");
const { NotFoundError, ValidationError } = require("../utils/appError");

class PriceService {
  async calculatePrice(serviceId, variationId, addonsPayload = []) {
    if (!serviceId || !variationId) {
      throw new ValidationError("serviceId and variationId are required");
    }

    const service = await serviceRepository.findBySlugOrId(serviceId);
    if (!service) {
      throw new NotFoundError("Service not found");
    }

    const variation = service.variations ? service.variations.find(v => v._id.toString() === variationId || v.id === variationId) : null;
    const basePrice = variation ? Number(variation.price) : Number(service.basePrice || 2999);

    let addonsTotal = 0;
    const breakdown = [];

    if (Array.isArray(addonsPayload) && addonsPayload.length > 0) {
      const allAddons = await addonRepository.findAllActive();

      for (const item of addonsPayload) {
        const { addonId, variationId: addonVarId, quantity = 1 } = item;
        const targetAddon = allAddons.find(a => a._id.toString() === addonId || a.id === addonId);
        if (!targetAddon) continue;

        let unitPrice = Number(targetAddon.basePrice);
        if (addonVarId && targetAddon.variations) {
          const addonVar = targetAddon.variations.find(v => v._id.toString() === addonVarId || v.id === addonVarId);
          if (addonVar) {
            unitPrice = Number(addonVar.price);
          }
        }

        const qty = targetAddon.isPerUnit ? Math.max(1, quantity) : 1;
        const itemTotal = unitPrice * qty;

        addonsTotal += itemTotal;
        breakdown.push({
          addonId: targetAddon._id ? targetAddon._id.toString() : addonId,
          name: targetAddon.name,
          quantity: qty,
          unitPrice,
          total: itemTotal
        });
      }
    }

    const totalPrice = basePrice + addonsTotal;

    return {
      serviceName: service.name,
      variationName: variation ? variation.name : "Standard Package",
      basePrice,
      addonsTotal,
      totalPrice,
      breakdown
    };
  }
}

module.exports = new PriceService();
