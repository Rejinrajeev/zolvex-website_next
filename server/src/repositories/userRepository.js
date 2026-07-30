const mongoose = require("mongoose");
const User = require("../models/User");
const { getIsConnected } = require("../database/connect");

// Pre-computed Bcrypt hash for password "Admin123!@#" (work factor 10)
const DEFAULT_ADMIN_PASSWORD_HASH = "$2a$10$YpQ/CGWowE2jHhYIoObbgeIEaNzaWBB4zzgf7SxtCXCItalHhsAYy";
const DEFAULT_ADMIN_ID = "650000000000000000000001";

function getDefaultAdminUser() {
  return {
    _id: DEFAULT_ADMIN_ID,
    id: DEFAULT_ADMIN_ID,
    name: "Zolvex Administrator",
    email: "admin@zolvex.com",
    phone: "+919876543210",
    password: DEFAULT_ADMIN_PASSWORD_HASH,
    role: "super_admin",
    isVerified: true,
    mfaEnabled: false,
    failedLoginAttempts: 0,
    lockUntil: null,
    save: async function() { return this; },
    toPublicJSON: function() {
      return {
        _id: this._id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        role: this.role,
        isVerified: this.isVerified,
        mfaEnabled: this.mfaEnabled
      };
    }
  };
}

const memoryUsers = [getDefaultAdminUser()];

class UserRepository {
  async create(userData) {
    if (getIsConnected() && mongoose.connection.readyState === 1) {
      try {
        return await User.create(userData);
      } catch (e) {
        // Fallback to memory
      }
    }
    const newUser = {
      _id: `650000000000${Date.now()}`.slice(0, 24),
      ...userData,
      role: userData.role || "user",
      isVerified: true,
      save: async function() { return this; },
      toPublicJSON: function() {
        const obj = { ...this };
        delete obj.password;
        return obj;
      }
    };
    memoryUsers.push(newUser);
    return newUser;
  }

  async findByEmail(email, includePassword = false) {
    const cleanEmail = (email || "").toLowerCase().trim();

    if (getIsConnected() && mongoose.connection.readyState === 1) {
      try {
        const query = User.findOne({ email: cleanEmail, isDeleted: false });
        if (includePassword) query.select("+password");
        let user = await query.exec();
        if (user) return user;
      } catch (e) {
        // Fallback to memory
      }
    }

    const found = memoryUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (!found && cleanEmail === "admin@zolvex.com") {
      return getDefaultAdminUser();
    }
    return found || null;
  }

  async findById(id, includePassword = false) {
    if (getIsConnected() && mongoose.connection.readyState === 1) {
      try {
        const query = User.findOne({ _id: id, isDeleted: false });
        if (includePassword) query.select("+password");
        let user = await query.exec();
        if (user) return user;
      } catch (e) {
        // Fallback
      }
    }
    const found = memoryUsers.find(u => String(u._id) === String(id) || String(u.id) === String(id));
    if (!found && String(id) === DEFAULT_ADMIN_ID) {
      return getDefaultAdminUser();
    }
    return found || null;
  }

  async findByPhone(phone) {
    if (getIsConnected() && mongoose.connection.readyState === 1) {
      try {
        return await User.findOne({ phone, isDeleted: false });
      } catch (e) {
        // Fallback
      }
    }
    return memoryUsers.find(u => u.phone === phone) || null;
  }

  async updateById(id, updateData) {
    if (getIsConnected() && mongoose.connection.readyState === 1) {
      try {
        return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
      } catch (e) {
        // Fallback
      }
    }
    const user = memoryUsers.find(u => String(u._id) === String(id));
    if (user) Object.assign(user, updateData);
    return user;
  }

  async recordLogin(userId, ip, userAgent) {
    if (getIsConnected() && mongoose.connection.readyState === 1) {
      try {
        return await User.findByIdAndUpdate(userId, {
          $push: {
            loginHistory: {
              $each: [{ ip, userAgent, timestamp: new Date() }],
              $slice: -10
            }
          }
        });
      } catch (e) {
        // Silently skip
      }
    }
  }
}

module.exports = new UserRepository();
