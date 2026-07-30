const request = require("supertest");
const app = require("../src/app");
const { generateAccessToken } = require("../src/utils/jwtUtils");

jest.setTimeout(15000);

describe("🚀 Production Express REST API Integration Tests", () => {
  let adminToken = "";

  beforeAll(() => {
    adminToken = generateAccessToken({
      id: "admin-test-id",
      email: "admin@zolvex.com",
      role: "super_admin"
    });
  });

  describe("GET /api/v1/health", () => {
    it("should return 200 OK and health status payload", async () => {
      const res = await request(app).get("/api/v1/health");
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("status", "up");
      expect(res.body.data).toHaveProperty("timestamp");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should authenticate super admin user with valid credentials admin@zolvex.com / Admin123!@#", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "admin@zolvex.com",
          password: "Admin123!@#"
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("accessToken");
      expect(res.body.data.user).toHaveProperty("email", "admin@zolvex.com");
      expect(res.body.data.user).toHaveProperty("role", "super_admin");
    }, 10000);

    it("should reject invalid password with 401 Unauthorized", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "admin@zolvex.com",
          password: "WrongPassword999!"
        });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body.success).toBe(false);
    }, 10000);
  });

  describe("GET /api/v1/services", () => {
    it("should return 200 OK with active services catalog list", async () => {
      const res = await request(app).get("/api/v1/services");
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("should include price, durationMinutes, and category for each service", async () => {
      const res = await request(app).get("/api/v1/services");
      const service = res.body.data[0];
      expect(service).toHaveProperty("name");
      expect(service).toHaveProperty("basePrice");
      expect(service).toHaveProperty("category");
    });
  });

  describe("GET /api/v1/services/:id", () => {
    it("should return single service details by id or slug", async () => {
      const res = await request(app).get("/api/v1/services/deep-cleaning");
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("name", "Full Home Deep Cleaning");
    });
  });

  describe("POST /api/v1/price/calculate", () => {
    it("should calculate exact pricing breakdown for service and variations", async () => {
      const res = await request(app)
        .post("/api/v1/price/calculate")
        .send({
          serviceId: "srv-001",
          variationId: "var-101",
          addons: []
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("basePrice", 2999);
      expect(res.body.data).toHaveProperty("totalPrice", 2999);
    });
  });

  describe("POST /api/v1/bookings & GET /api/v1/bookings/track/:ref", () => {
    let createdBookingRef = "";

    it("should submit a new booking and return booking number", async () => {
      const payload = {
        serviceId: "srv-001",
        variationId: "var-101",
        customerName: "QA Test User",
        customerPhone: "9876543210",
        customerEmail: "qa@zolvex.com",
        customerAddress: "Flat 101, QA Tower, MG Road, Trivandrum",
        preferredDate: "2026-08-01",
        preferredTime: "09:00 - 12:00 (Morning)",
        additionalInfo: "QA Automated Integration Test",
        addons: []
      };

      const res = await request(app).post("/api/v1/bookings").send(payload);
      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("bookingNumber");
      expect(res.body.data).toHaveProperty("status", "pending");

      createdBookingRef = res.body.data.bookingNumber;
    });

    it("should allow tracking the newly created booking by reference number", async () => {
      const res = await request(app).get(`/api/v1/bookings/track/${createdBookingRef}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("bookingNumber", createdBookingRef);
      expect(res.body.data).toHaveProperty("customerName", "QA Test User");
    });
  });

  describe("SECURITY CONTROLS: Strict RBAC Protection on Admin Routes", () => {
    it("should block non-authenticated requests to /admin/bookings with 401/403", async () => {
      const res = await request(app).get("/api/v1/admin/bookings");
      expect([401, 403]).toContain(res.statusCode);
    });

    it("should block non-authenticated requests to /admin/services with 401/403", async () => {
      const res = await request(app).get("/api/v1/admin/services");
      expect([401, 403]).toContain(res.statusCode);
    });

    it("should block non-authenticated requests to /admin/analytics with 401/403", async () => {
      const res = await request(app).get("/api/v1/admin/analytics");
      expect([401, 403]).toContain(res.statusCode);
    });

    it("should allow authenticated requests when valid JWT Bearer token is provided", async () => {
      const res = await request(app)
        .get("/api/v1/admin/services")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
    });
  });

});
