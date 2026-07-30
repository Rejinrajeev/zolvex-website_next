import { Request, Response } from "express";
import { getServices, getServiceBySlugOrId, getAddons } from "../services/db.js";

export async function handleGetServices(req: Request, res: Response) {
  try {
    const services = await getServices();
    res.json({ success: true, count: services.length, data: services });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || "Failed to fetch services" });
  }
}

export async function handleGetServiceById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const service = await getServiceBySlugOrId(id);
    if (!service) {
      return res.status(404).json({ success: false, error: "Service not found" });
    }
    res.json({ success: true, data: service });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || "Failed to fetch service detail" });
  }
}

export async function handleGetAddons(req: Request, res: Response) {
  try {
    const addons = await getAddons();
    res.json({ success: true, count: addons.length, data: addons });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || "Failed to fetch add-ons" });
  }
}
