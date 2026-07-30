import { Request, Response } from "express";
import { calculatePrice } from "../services/db.js";

export async function handleCalculatePrice(req: Request, res: Response) {
  try {
    const { serviceId, variationId, addons } = req.body;

    if (!serviceId || !variationId) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: serviceId and variationId"
      });
    }

    const priceResult = await calculatePrice(serviceId, variationId, addons);
    return res.json({
      success: true,
      data: priceResult
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to calculate price"
    });
  }
}
