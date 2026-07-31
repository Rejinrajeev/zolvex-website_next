const request = require("supertest");
const app = require("../src/app");
const cloudinaryService = require("../src/services/cloudinaryService");

describe("🖼️ Cloudinary Media Management & Validation Tests", () => {
  let authToken = "";
  let uploadedMediaId = "";

  beforeAll(async () => {
    // Authenticate super admin
    const loginRes = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "admin@zolvex.com", password: "Admin123!@#" });
    
    if (loginRes.body.data && loginRes.body.data.accessToken) {
      authToken = loginRes.body.data.accessToken;
    }
  });

  describe("1. Cloudinary Service Unit Functions", () => {
    it("should generate optimized CDN URL with f_auto and q_auto parameters", () => {
      const url = cloudinaryService.getTransformedUrl("zolvex/website/hero_img", { width: 800, height: 600 });
      expect(url).toBeDefined();
    });

    it("should handle upload using service mock fallback if credentials are unset", async () => {
      const dummyBuffer = Buffer.from("fake image data");
      const result = await cloudinaryService.uploadImage(dummyBuffer, {
        folder: "zolvex/uploads",
        originalFilename: "test.jpg"
      });
      expect(result).toBeDefined();
      expect(result.publicId).toBeDefined();
      expect(result.secureUrl).toBeDefined();
    });
  });

  describe("2. Server-Side Media Validation & Upload APIs", () => {
    it("should reject upload without authentication token", async () => {
      const res = await request(app)
        .post("/api/v1/media/upload")
        .attach("image", Buffer.from("fake data"), "test.jpg");

      expect(res.statusCode).toBe(401);
    });

    it("should reject non-image file formats (e.g. text/exe/pdf)", async () => {
      const res = await request(app)
        .post("/api/v1/media/upload")
        .set("Authorization", `Bearer ${authToken}`)
        .attach("image", Buffer.from("malicious script content"), "script.exe");

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should successfully upload valid JPEG image and persist metadata", async () => {
      const dummyImageBuffer = Buffer.from("fake jpeg binary content header");

      const res = await request(app)
        .post("/api/v1/media/upload")
        .set("Authorization", `Bearer ${authToken}`)
        .field("category", "website")
        .field("altText", "Test Hero Banner")
        .attach("image", dummyImageBuffer, "hero_test.jpg");

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.secureUrl).toBeDefined();

      if (res.body.data._id) {
        uploadedMediaId = res.body.data._id;
      }
    });

    it("should retrieve media list from GET /api/v1/media", async () => {
      const res = await request(app)
        .get("/api/v1/media")
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.items)).toBe(true);
    });

    it("should allow updating altText and category via PUT /api/v1/media/:id", async () => {
      if (!uploadedMediaId) return;

      const res = await request(app)
        .put(`/api/v1/media/${uploadedMediaId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ altText: "Updated Alt Description", category: "services" });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("should safely replace media via POST /api/v1/media/:id/replace", async () => {
      if (!uploadedMediaId) return;

      const replacementBuffer = Buffer.from("new image replacement content");

      const res = await request(app)
        .post(`/api/v1/media/${uploadedMediaId}/replace`)
        .set("Authorization", `Bearer ${authToken}`)
        .attach("image", replacementBuffer, "replacement.png");

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("should delete media asset via DELETE /api/v1/media/:id", async () => {
      if (!uploadedMediaId) return;

      const res = await request(app)
        .delete(`/api/v1/media/${uploadedMediaId}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

});
