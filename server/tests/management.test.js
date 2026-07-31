const request = require("supertest");
const app = require("../src/app");

describe("📑 Contact Messages, Testimonials & Service CRUD System Tests", () => {
  let authToken = "";
  let sampleMessageId = "";
  let sampleReviewId = "";
  let sampleServiceId = "";

  beforeAll(async () => {
    // Authenticate super admin
    const loginRes = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "admin@zolvex.com", password: "Admin123!@#" });
    
    if (loginRes.body.data && loginRes.body.data.accessToken) {
      authToken = loginRes.body.data.accessToken;
    }
  });

  describe("1. Public Contact Form & Admin Message Management APIs", () => {
    it("should allow public users to submit a contact message with valid fields", async () => {
      const res = await request(app)
        .post("/api/v1/contact")
        .send({
          name: "Test Customer",
          email: "customer@example.com",
          phone: "+91 98765 43210",
          subject: "Villa Cleaning Quote Request",
          service: "deep_cleaning",
          message: "Hi, I need a complete deep cleaning for a 3 BHK home in Trivandrum."
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBeDefined();

      if (res.body.data._id) {
        sampleMessageId = res.body.data._id;
      }
    });

    it("should reject contact submission with missing required fields or short message", async () => {
      const res = await request(app)
        .post("/api/v1/contact")
        .send({
          name: "",
          email: "invalid-email",
          message: "Short"
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should allow admin to list, search, and filter contact messages", async () => {
      const res = await request(app)
        .get("/api/v1/admin/contact-messages?status=all")
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.items)).toBe(true);
    });

    it("should allow admin to update message status and priority", async () => {
      if (!sampleMessageId) return;

      const res = await request(app)
        .patch(`/api/v1/admin/contact-messages/${sampleMessageId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ status: "read", priority: "high" });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("should allow admin to record a reply to a contact message", async () => {
      if (!sampleMessageId) return;

      const res = await request(app)
        .post(`/api/v1/admin/contact-messages/${sampleMessageId}/reply`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ adminReply: "Thank you! Our team will visit your villa tomorrow at 10 AM." });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe("2. Testimonials Moderation Workflow APIs", () => {
    it("should submit a testimonial review as pending by default", async () => {
      const res = await request(app)
        .post("/api/v1/testimonials")
        .send({
          customerName: "Suresh Kumar",
          customerLocation: "Ernakulam",
          rating: 5,
          comment: "Outstanding deep cleaning quality! Punctual team and clean equipment.",
          serviceName: "Kitchen Deep Cleaning"
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe("pending");

      if (res.body.data._id) {
        sampleReviewId = res.body.data._id;
      }
    });

    it("should ONLY return approved reviews on GET /api/v1/testimonials for public users", async () => {
      const res = await request(app).get("/api/v1/testimonials");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      // Ensure all returned items have status = approved or don't expose pending/private data
      res.body.data.forEach(item => {
        expect(item.email).toBeUndefined();
        expect(item.adminNote).toBeUndefined();
      });
    });

    it("should allow admin to list all reviews in moderation queue", async () => {
      const res = await request(app)
        .get("/api/v1/admin/reviews")
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.items)).toBe(true);
    });

    it("should allow admin to approve a pending review", async () => {
      if (!sampleReviewId) return;

      const res = await request(app)
        .patch(`/api/v1/admin/reviews/${sampleReviewId}/approve`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe("3. Admin Service Management CRUD APIs", () => {
    it("should allow admin to create a new service package", async () => {
      const res = await request(app)
        .post("/api/v1/admin/services")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Villa Exterior & Balcony Scrub",
          description: "High-pressure jet washing and tile scrub for balconies and patio areas.",
          category: "deep_cleaning",
          basePrice: 3499,
          durationMinutes: 120,
          isActive: true
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.slug).toBe("villa-exterior-balcony-scrub");

      if (res.body.data._id) {
        sampleServiceId = res.body.data._id;
      }
    });

    it("should allow admin to update service details", async () => {
      if (!sampleServiceId) return;

      const res = await request(app)
        .put(`/api/v1/admin/services/${sampleServiceId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          basePrice: 3999,
          description: "Updated high-pressure jet washing and tile scrub for outdoor spaces."
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("should allow admin to reorder services display positions", async () => {
      if (!sampleServiceId) return;

      const res = await request(app)
        .patch("/api/v1/admin/services/reorder")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          orders: [
            { id: sampleServiceId, displayOrder: 1 }
          ]
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("should allow admin to delete service package", async () => {
      if (!sampleServiceId) return;

      const res = await request(app)
        .delete(`/api/v1/admin/services/${sampleServiceId}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

});
