import { Request, Response } from "express";
import { createBooking, getBookingByRefOrPhone, getAllBookings, updateBookingStatus } from "../services/db.js";

export async function handleCreateBooking(req: Request, res: Response) {
  try {
    const {
      serviceId,
      variationId,
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      preferredDate,
      preferredTime,
      additionalInfo,
      addons
    } = req.body;

    if (!serviceId || !variationId || !customerName || !customerPhone || !customerAddress || !preferredDate || !preferredTime) {
      return res.status(400).json({
        success: false,
        error: "Missing required booking details (serviceId, variationId, customerName, customerPhone, customerAddress, preferredDate, preferredTime)"
      });
    }

    const booking = await createBooking({
      serviceId,
      variationId,
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      preferredDate,
      preferredTime,
      additionalInfo,
      addons
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to create booking"
    });
  }
}

export async function handleGetBookingByRef(req: Request, res: Response) {
  try {
    const { ref } = req.params;
    if (!ref) {
      return res.status(400).json({ success: false, error: "Search query required" });
    }

    const bookings = await getBookingByRefOrPhone(ref);
    return res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to retrieve booking"
    });
  }
}

export async function handleGetAllBookings(req: Request, res: Response) {
  try {
    const bookings = await getAllBookings();
    return res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch bookings list"
    });
  }
}

export async function handleUpdateBookingStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['draft', 'pending', 'confirmed', 'assigned', 'in_progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status value" });
    }

    const success = await updateBookingStatus(id, status);
    if (!success) {
      return res.status(404).json({ success: false, error: "Booking not found or update failed" });
    }

    return res.json({ success: true, message: `Booking status updated to ${status}` });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message || "Failed to update booking status" });
  }
}
