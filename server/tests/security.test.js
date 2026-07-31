const request = require("supertest");
const app = require("../src/app");
const {
  encryptSecret,
  decryptSecret,
  generateSecret,
  generateTOTP,
  verifyTOTP,
  generateBackupCodes,
  hashBackupCode,
  generateQRCodeDataURL
} = require("../src/utils/mfaUtils");

describe("🔐 Enterprise Security & MFA System Tests", () => {
  
  let authToken = "";
  let sampleSecret = "";

  beforeAll(async () => {
    // Authenticate super admin
    const loginRes = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "admin@zolvex.com", password: "Admin123!@#" });
    
    if (loginRes.body.data && loginRes.body.data.accessToken) {
      authToken = loginRes.body.data.accessToken;
    }
  });

  describe("1. Crypto & MFA Utility Functions", () => {
    it("should encrypt and decrypt TOTP secrets using AES-256-GCM", () => {
      const originalSecret = "JBSWY3DPEHPK3PXP";
      const encrypted = encryptSecret(originalSecret);
      expect(encrypted).toContain(":");
      const decrypted = decryptSecret(encrypted);
      expect(decrypted).toBe(originalSecret);
    });

    it("should generate valid TOTP codes and verify them within window", () => {
      const secret = generateSecret();
      sampleSecret = secret;
      const code = generateTOTP(secret);
      expect(code).toHaveLength(6);
      expect(verifyTOTP(code, secret)).toBe(true);
      expect(verifyTOTP("000000", secret)).toBe(false);
    });

    it("should generate 10 unique backup recovery codes and hash them cleanly", () => {
      const codes = generateBackupCodes(10);
      expect(codes).toHaveLength(10);
      const hashed = hashBackupCode(codes[0]);
      expect(hashed).toHaveLength(64); // SHA-256 hex string
    });

    it("should generate a valid QR Code Data URL string", async () => {
      const qrDataUrl = await generateQRCodeDataURL("otpauth://totp/Zolvex:admin@zolvex.com?secret=JBSWY3DPEHPK3PXP");
      expect(qrDataUrl).toMatch(/^data:image\/png;base64,/);
    });
  });

  describe("2. Security Endpoints Integration", () => {
    it("should setup MFA and return TOTP secret & QR Code Data URL", async () => {
      const res = await request(app)
        .post("/api/v1/auth/mfa/setup")
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.secret).toBeDefined();
      expect(res.body.data.qrCodeDataUrl).toMatch(/^data:image\/png;base64,/);
    });

    it("should reject invalid TOTP verification code when enabling MFA", async () => {
      const res = await request(app)
        .post("/api/v1/auth/mfa/enable")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ code: "000000" });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should return security stats and health score", async () => {
      const res = await request(app)
        .get("/api/v1/auth/security-stats")
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.securityScore).toBeGreaterThanOrEqual(0);
      expect(res.body.data.activeSessionsCount).toBeGreaterThanOrEqual(1);
    });

    it("should list active sessions for authenticated admin", async () => {
      const res = await request(app)
        .get("/api/v1/auth/sessions")
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("should allow revoking all other remote sessions", async () => {
      const res = await request(app)
        .delete("/api/v1/auth/sessions/all-other")
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

});
