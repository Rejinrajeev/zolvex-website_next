const serviceRepository = require("../repositories/serviceRepository");
const addonRepository = require("../repositories/addonRepository");
const { NotFoundError } = require("../utils/appError");

class ServiceService {
  async getAllServices() {
    return serviceRepository.findAllActive();
  }

  async getServiceBySlugOrId(idOrSlug) {
    const service = await serviceRepository.findBySlugOrId(idOrSlug);
    if (!service) {
      throw new NotFoundError("Service not found");
    }
    return service;
  }

  async getAllAddons() {
    return addonRepository.findAllActive();
  }
}

module.exports = new ServiceService();
