const ContactMessage = require("../models/ContactMessage");
const authService = require("../services/authService");
const ApiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");
const { ValidationError, NotFoundError } = require("../utils/appError");
const { getIsConnected } = require("../database/connect");

/**
 * Public Contact Form Submission Endpoint
 */
const submitContact = catchAsync(async (req, res) => {
  const { name, email, phone, subject, service, message } = req.body;

  if (!name || !name.trim()) {
    throw new ValidationError("Name is required");
  }
  if (!email || !email.includes("@")) {
    throw new ValidationError("A valid email address is required");
  }
  if (!message || message.trim().length < 10) {
    throw new ValidationError("Please provide a detailed message (minimum 10 characters)");
  }

  let doc = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone ? phone.trim() : "",
    subject: subject ? subject.trim() : "General Inquiry",
    service: service ? service.trim() : "general",
    message: message.trim(),
    status: "unread",
    priority: "normal",
    ipAddress: req.ip || "127.0.0.1"
  };

  if (getIsConnected()) {
    doc = await ContactMessage.create(doc);
  } else {
    doc = { _id: `msg-${Date.now()}`, ...doc, createdAt: new Date().toISOString() };
  }

  return ApiResponse.success(
    res,
    "Thank you for contacting Zolvex Deep Clean. Our team will get back to you shortly!",
    doc,
    201
  );
});

/**
 * Admin Contact Messages Search & Paginated Listing
 */
const getAdminMessages = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;
  const status = req.query.status;
  const priority = req.query.priority;
  const search = req.query.search;

  const query = {};
  if (status && status !== "all") query.status = status;
  if (priority && priority !== "all") query.priority = priority;

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { subject: { $regex: search, $options: "i" } },
      { message: { $regex: search, $options: "i" } }
    ];
  }

  let items = [];
  let total = 0;
  let unreadCount = 0;

  if (getIsConnected()) {
    items = await ContactMessage.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    total = await ContactMessage.countDocuments(query);
    unreadCount = await ContactMessage.countDocuments({ status: "unread" });
  } else {
    items = [
      {
        _id: "msg-001",
        name: "Anand Kumar",
        email: "anand@example.com",
        phone: "+91 98765 43210",
        subject: "Villa Deep Clean Inquiry",
        service: "deep_cleaning",
        message: "Hi, I have a 4 BHK villa in Trivandrum. Do you provide steam sanitization for kitchen tiles?",
        status: "unread",
        priority: "normal",
        createdAt: new Date().toISOString()
      }
    ];
    total = items.length;
    unreadCount = 1;
  }

  return ApiResponse.success(res, "Contact messages retrieved", {
    items,
    unreadCount,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1
    }
  });
});

const getMessageById = catchAsync(async (req, res) => {
  let message = null;
  if (getIsConnected()) {
    message = await ContactMessage.findById(req.params.id);
    if (message && message.status === "unread") {
      message.status = "read";
      await message.save();
    }
  }
  if (!message) {
    throw new NotFoundError("Contact message not found");
  }
  return ApiResponse.success(res, "Message details retrieved", message);
});

const updateMessageStatus = catchAsync(async (req, res) => {
  const { status, priority } = req.body;
  let message = null;

  if (getIsConnected()) {
    message = await ContactMessage.findById(req.params.id);
    if (!message) throw new NotFoundError("Contact message not found");

    if (status) message.status = status;
    if (priority) message.priority = priority;
    await message.save();
  }

  if (req.user) {
    await authService.logSecurityEvent(
      req.user._id,
      req.user.email,
      "CONTACT_MESSAGE_UPDATED",
      req,
      "SUCCESS",
      { messageId: req.params.id, status, priority }
    );
  }

  return ApiResponse.success(res, "Message status updated", message);
});

const replyToMessage = catchAsync(async (req, res) => {
  const { adminReply } = req.body;
  if (!adminReply || !adminReply.trim()) {
    throw new ValidationError("Reply content is required");
  }

  let message = null;
  if (getIsConnected()) {
    message = await ContactMessage.findById(req.params.id);
    if (!message) throw new NotFoundError("Contact message not found");

    message.adminReply = adminReply.trim();
    message.repliedAt = new Date();
    message.repliedBy = req.user ? req.user._id : null;
    message.status = "replied";
    await message.save();
  }

  return ApiResponse.success(res, "Admin reply saved and marked as replied", message);
});

const deleteMessage = catchAsync(async (req, res) => {
  if (getIsConnected()) {
    await ContactMessage.findByIdAndDelete(req.params.id);
  }
  return ApiResponse.success(res, "Contact message deleted");
});

module.exports = {
  submitContact,
  getAdminMessages,
  getMessageById,
  updateMessageStatus,
  replyToMessage,
  deleteMessage
};
