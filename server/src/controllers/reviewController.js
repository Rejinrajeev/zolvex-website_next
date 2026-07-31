const Review = require("../models/Review");
const ApiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");
const { ValidationError, NotFoundError } = require("../utils/appError");
const { getIsConnected } = require("../database/connect");

/**
 * Public Testimonial Submission (Status default: pending)
 */
const submitReview = catchAsync(async (req, res) => {
  const { customerName, customerLocation, email, rating, comment, serviceName } = req.body;

  if (!customerName || !customerName.trim()) {
    throw new ValidationError("Customer name is required");
  }
  if (!rating || rating < 1 || rating > 5) {
    throw new ValidationError("Rating must be between 1 and 5 stars");
  }
  if (!comment || comment.trim().length < 10) {
    throw new ValidationError("Please provide a testimonial comment (minimum 10 characters)");
  }

  let doc = {
    customerName: customerName.trim(),
    customerLocation: customerLocation ? customerLocation.trim() : "Kerala",
    email: email ? email.trim().toLowerCase() : undefined,
    rating: Number(rating),
    comment: comment.trim(),
    serviceName: serviceName ? serviceName.trim() : "General Deep Cleaning",
    status: "pending",
    isFeatured: false
  };

  if (getIsConnected()) {
    doc = await Review.create(doc);
  } else {
    doc = { _id: `rev-${Date.now()}`, ...doc, createdAt: new Date().toISOString() };
  }

  return ApiResponse.success(
    res,
    "Thank you for your review! Your testimonial has been submitted and is currently pending moderation.",
    {
      _id: doc._id,
      customerName: doc.customerName,
      rating: doc.rating,
      comment: doc.comment,
      status: doc.status
    },
    201
  );
});

/**
 * Public Testimonials Endpoint (Only APPROVED reviews exposed)
 */
const getPublicReviews = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const featuredOnly = req.query.featured === "true";

  const query = { status: "approved" };
  if (featuredOnly) query.isFeatured = true;

  let items = [];
  if (getIsConnected()) {
    items = await Review.find(query)
      .select("customerName customerLocation rating comment serviceName isFeatured createdAt")
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(limit)
      .lean();
  } else {
    items = [
      {
        _id: "rev-001",
        customerName: "Dr. Lakshmi Nair",
        customerLocation: "Trivandrum",
        rating: 5,
        comment: "Zolvex team transformed our home before our family event. Kitchen degreasing was impressive!",
        serviceName: "Full Home Deep Cleaning",
        status: "approved",
        isFeatured: true,
        createdAt: new Date().toISOString()
      },
      {
        _id: "rev-002",
        customerName: "Rajesh Varma",
        customerLocation: "Ernakulam",
        rating: 5,
        comment: "Very professional water tank cleaning. Arrived on time with proper high-pressure equipment.",
        serviceName: "Water Tank Cleaning",
        status: "approved",
        isFeatured: true,
        createdAt: new Date().toISOString()
      }
    ];
  }

  return ApiResponse.success(res, "Public testimonials retrieved", items);
});

/**
 * Admin Testimonials Moderation List (Pending / Approved / Rejected)
 */
const getAdminReviews = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;
  const status = req.query.status;
  const search = req.query.search;

  const query = {};
  if (status && status !== "all") query.status = status;
  if (search) {
    query.$or = [
      { customerName: { $regex: search, $options: "i" } },
      { comment: { $regex: search, $options: "i" } },
      { serviceName: { $regex: search, $options: "i" } }
    ];
  }

  let items = [];
  let total = 0;
  let pendingCount = 0;

  if (getIsConnected()) {
    items = await Review.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    total = await Review.countDocuments(query);
    pendingCount = await Review.countDocuments({ status: "pending" });
  } else {
    items = [
      {
        _id: "rev-001",
        customerName: "Dr. Lakshmi Nair",
        customerLocation: "Trivandrum",
        rating: 5,
        comment: "Zolvex team transformed our home before our family event. Kitchen degreasing was impressive!",
        serviceName: "Full Home Deep Cleaning",
        status: "approved",
        isFeatured: true,
        createdAt: new Date().toISOString()
      },
      {
        _id: "rev-003",
        customerName: "Mathew Joseph",
        customerLocation: "Kochi",
        rating: 5,
        comment: "Sofa shampooing removed all old stains! Excellent service.",
        serviceName: "Sofa & Upholstery Cleaning",
        status: "pending",
        isFeatured: false,
        createdAt: new Date().toISOString()
      }
    ];
    total = items.length;
    pendingCount = 1;
  }

  return ApiResponse.success(res, "Admin reviews list retrieved", {
    items,
    pendingCount,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1
    }
  });
});

const approveReview = catchAsync(async (req, res) => {
  let review = null;
  if (getIsConnected()) {
    review = await Review.findById(req.params.id);
    if (!review) throw new NotFoundError("Testimonial not found");

    review.status = "approved";
    review.approvedAt = new Date();
    review.approvedBy = req.user ? req.user._id : null;
    await review.save();
  }
  return ApiResponse.success(res, "Testimonial approved for public display", review);
});

const rejectReview = catchAsync(async (req, res) => {
  let review = null;
  if (getIsConnected()) {
    review = await Review.findById(req.params.id);
    if (!review) throw new NotFoundError("Testimonial not found");

    review.status = "rejected";
    await review.save();
  }
  return ApiResponse.success(res, "Testimonial rejected", review);
});

const updateReview = catchAsync(async (req, res) => {
  const { customerName, customerLocation, rating, comment, isFeatured, adminNote } = req.body;
  let review = null;

  if (getIsConnected()) {
    review = await Review.findById(req.params.id);
    if (!review) throw new NotFoundError("Testimonial not found");

    if (customerName) review.customerName = customerName;
    if (customerLocation) review.customerLocation = customerLocation;
    if (rating) review.rating = Number(rating);
    if (comment) review.comment = comment;
    if (isFeatured !== undefined) review.isFeatured = isFeatured;
    if (adminNote !== undefined) review.adminNote = adminNote;
    await review.save();
  }

  return ApiResponse.success(res, "Testimonial updated", review);
});

const deleteReview = catchAsync(async (req, res) => {
  if (getIsConnected()) {
    await Review.findByIdAndDelete(req.params.id);
  }
  return ApiResponse.success(res, "Testimonial deleted");
});

module.exports = {
  submitReview,
  getPublicReviews,
  getAdminReviews,
  approveReview,
  rejectReview,
  updateReview,
  deleteReview
};
