const User = require("../models/User");
const { getIsConnected } = require("../database/connect");

const memoryUsers = [];

class UserRepository {
  async create(userData) {
    if (getIsConnected()) {
      return User.create(userData);
    }
    const newUser = {
      _id: `usr-${Date.now()}`,
      ...userData,
      role: userData.role || "user",
      isVerified: true,
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
    if (getIsConnected()) {
      const query = User.findOne({ email: email.toLowerCase(), isDeleted: false });
      if (includePassword) query.select("+password");
      return query.exec();
    }
    return memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async findById(id, includePassword = false) {
    if (getIsConnected()) {
      const query = User.findOne({ _id: id, isDeleted: false });
      if (includePassword) query.select("+password");
      return query.exec();
    }
    return memoryUsers.find(u => u._id === id || u.id === id) || null;
  }

  async findByPhone(phone) {
    if (getIsConnected()) {
      return User.findOne({ phone, isDeleted: false });
    }
    return memoryUsers.find(u => u.phone === phone) || null;
  }

  async updateById(id, updateData) {
    if (getIsConnected()) {
      return User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    }
    const user = memoryUsers.find(u => u._id === id || u.id === id);
    if (user) Object.assign(user, updateData);
    return user;
  }

  async recordLogin(userId, ip, userAgent) {
    if (getIsConnected()) {
      return User.findByIdAndUpdate(userId, {
        $push: {
          loginHistory: {
            $each: [{ ip, userAgent, timestamp: new Date() }],
            $slice: -10
          }
        }
      });
    }
  }
}

module.exports = new UserRepository();
