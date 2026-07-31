const crypto = require("crypto");
const QRCode = require("qrcode");

// Base32 Alphabet RFC 4648
const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

// Secret encryption key derived from environment or fallback (must be 32 bytes)
const ENCRYPTION_KEY = crypto
  .createHash("sha256")
  .update(process.env.JWT_SECRET || "zolvex-default-master-secret-key-2026")
  .digest();

/**
 * AES-256-GCM Encryption for stored TOTP secrets
 */
function encryptSecret(plaintextSecret) {
  if (!plaintextSecret) return null;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(plaintextSecret, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");
  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
}

/**
 * AES-256-GCM Decryption for stored TOTP secrets
 */
function decryptSecret(encryptedPayload) {
  if (!encryptedPayload) return null;
  // If not in encrypted format (legacy unencrypted secret), return as is
  if (!encryptedPayload.includes(":")) return encryptedPayload;

  const parts = encryptedPayload.split(":");
  if (parts.length !== 3) return encryptedPayload;

  const [ivHex, authTagHex, encryptedHex] = parts;
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-gcm", ENCRYPTION_KEY, iv);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encryptedHex, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

function base32Decode(base32Str) {
  const cleanStr = base32Str.toUpperCase().replace(/=+$/, "");
  let bits = "";
  for (let i = 0; i < cleanStr.length; i++) {
    const val = BASE32_ALPHABET.indexOf(cleanStr[i]);
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, "0");
  }
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substring(i, i + 8), 2));
  }
  return Buffer.from(bytes);
}

function base32Encode(buffer) {
  let bits = "";
  for (let i = 0; i < buffer.length; i++) {
    bits += buffer[i].toString(2).padStart(8, "0");
  }
  let base32 = "";
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.substring(i, i + 5).padEnd(5, "0");
    base32 += BASE32_ALPHABET[parseInt(chunk, 2)];
  }
  return base32;
}

function generateSecret(length = 20) {
  const randomBytes = crypto.randomBytes(length);
  return base32Encode(randomBytes);
}

function generateTOTP(secret, timeStep = 30, window = 0) {
  const decryptedSecret = decryptSecret(secret) || secret;
  const key = base32Decode(decryptedSecret);
  const epoch = Math.floor(Date.now() / 1000);
  const time = Math.floor(epoch / timeStep) + window;

  const buffer = Buffer.alloc(8);
  buffer.writeUInt32BE(0, 0);
  buffer.writeUInt32BE(time, 4);

  const hmac = crypto.createHmac("sha1", key);
  hmac.update(buffer);
  const digest = hmac.digest();

  const offset = digest[digest.length - 1] & 0xf;
  const codeInt =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);

  const code = (codeInt % 1000000).toString().padStart(6, "0");
  return code;
}

function verifyTOTP(token, secret) {
  if (!token || !secret) return false;
  const cleanToken = token.trim();
  
  // Check current time step and adjacent windows (±1 time step to account for clock skew)
  for (let window = -1; window <= 1; window++) {
    const expected = generateTOTP(secret, 30, window);
    if (expected === cleanToken) {
      return true;
    }
  }
  return false;
}

function generateBackupCodes(count = 10) {
  const codes = [];
  for (let i = 0; i < count; i++) {
    const raw = crypto.randomBytes(4).toString("hex").toUpperCase();
    codes.push(`${raw.slice(0, 4)}-${raw.slice(4)}`);
  }
  return codes;
}

function hashBackupCode(code) {
  return crypto.createHash("sha256").update(code.trim().toUpperCase()).digest("hex");
}

function generateOtpAuthUrl(userEmail, secret, issuer = "Zolvex DeepClean Admin") {
  const decryptedSecret = decryptSecret(secret) || secret;
  const encodedIssuer = encodeURIComponent(issuer);
  const encodedAccount = encodeURIComponent(userEmail);
  return `otpauth://totp/${encodedIssuer}:${encodedAccount}?secret=${decryptedSecret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`;
}

async function generateQRCodeDataURL(otpAuthUrl) {
  try {
    return await QRCode.toDataURL(otpAuthUrl, {
      margin: 2,
      width: 240,
      color: {
        dark: "#E6C15A",
        light: "#141414"
      }
    });
  } catch (err) {
    console.error("Failed to generate QR Code Data URL:", err);
    return null;
  }
}

module.exports = {
  encryptSecret,
  decryptSecret,
  generateSecret,
  generateTOTP,
  verifyTOTP,
  generateBackupCodes,
  hashBackupCode,
  generateOtpAuthUrl,
  generateQRCodeDataURL
};
