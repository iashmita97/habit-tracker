const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" },
  bio: { type: String, default: "" },

  // 🔥 NEW FIELDS FOR TRACKING LOGINS
  lastLogin: { type: Date },
  lastLogout: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);