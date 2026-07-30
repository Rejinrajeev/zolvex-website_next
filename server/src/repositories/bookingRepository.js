const Booking = require("../models/Booking");
const { getIsConnected } = require("../database/connect");

const memoryBookings = [];

class BookingRepository {
  async create(bookingData) {
    const statusHistory = [{ status: bookingData.status || "pending", timestamp: new Date(), note: "Booking submitted" }];
    const fullData = { ...bookingData, statusHistory };

    if (getIsConnected()) {
      try {
        return await Booking.create(fullData);
      } catch (e) {
        console.warn("Mongoose create booking error, writing to memory store:", e.message);
      }
    }
    const newBooking = {
      _id: `bk-${Date.now()}`,
      id: `bk-${Date.now()}`,
      ...fullData,
      isDeleted: false,
      createdAt: new Date().toISOString()
    };
    memoryBookings.unshift(newBooking);
    return newBooking;
  }

  async findByBookingNumberOrPhone(query) {
    const cleanQuery = query.trim().toLowerCase();
    if (getIsConnected()) {
      try {
        const results = await Booking.find({
          $or: [
            { bookingNumber: { $regex: cleanQuery, $options: "i" } },
            { customerPhone: { $regex: cleanQuery, $options: "i" } }
          ],
          isDeleted: false
        })
          .sort({ createdAt: -1 })
          .lean();
        if (results && results.length > 0) return results;
      } catch (e) {}
    }

    return memoryBookings.filter(b =>
      b.bookingNumber.toLowerCase().includes(cleanQuery) ||
      b.customerPhone.includes(cleanQuery)
    );
  }

  async findAll(filter = {}, page = 1, limit = 20) {
    if (getIsConnected()) {
      try {
        const skip = (page - 1) * limit;
        const query = { isDeleted: false, ...filter };

        const [bookings, total] = await Promise.all([
          Booking.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
          Booking.countDocuments(query)
        ]);

        return { bookings, total, page, limit, totalPages: Math.ceil(total / limit) };
      } catch (e) {}
    }

    const total = memoryBookings.length;
    return { bookings: memoryBookings, total, page, limit, totalPages: 1 };
  }

  async findById(id) {
    if (getIsConnected()) {
      try {
        const booking = await Booking.findOne({ _id: id, isDeleted: false }).lean();
        if (booking) return booking;
      } catch (e) {}
    }
    return memoryBookings.find(b => b._id === id || b.id === id) || null;
  }

  async updateStatus(id, status, note = "") {
    const historyItem = { status, timestamp: new Date(), note: note || `Status updated to ${status}` };
    if (getIsConnected()) {
      try {
        return await Booking.findByIdAndUpdate(
          id,
          { status, $push: { statusHistory: historyItem } },
          { new: true }
        );
      } catch (e) {}
    }
    const booking = memoryBookings.find(b => b._id === id || b.id === id);
    if (booking) {
      booking.status = status;
      if (!booking.statusHistory) booking.statusHistory = [];
      booking.statusHistory.push(historyItem);
      return booking;
    }
    return null;
  }

  async assignTechnician(id, techData) {
    const assignedTechnician = {
      name: techData.name,
      phone: techData.phone,
      photo: techData.photo || "/images/work_img_1.jpeg",
      rating: techData.rating || 4.9,
      assignedAt: new Date()
    };
    const historyItem = { status: "assigned", timestamp: new Date(), note: `Assigned technician ${techData.name}` };

    if (getIsConnected()) {
      try {
        return await Booking.findByIdAndUpdate(
          id,
          { status: "assigned", assignedTechnician, $push: { statusHistory: historyItem } },
          { new: true }
        );
      } catch (e) {}
    }

    const booking = memoryBookings.find(b => b._id === id || b.id === id);
    if (booking) {
      booking.status = "assigned";
      booking.assignedTechnician = assignedTechnician;
      if (!booking.statusHistory) booking.statusHistory = [];
      booking.statusHistory.push(historyItem);
      return booking;
    }
    return null;
  }
}

module.exports = new BookingRepository();
