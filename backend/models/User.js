const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    trim: true,         // Email ke aage-piche se faltu space hata dega
    lowercase: true,    // Hamesha small letters mein save karega (e.g., User@Gmail.com -> user@gmail.com)
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
      'Please fill a valid email address' // Agar galat format hua toh ye error message dikhayega
    ]
  },
  password: { 
    type: String, 
    required: true 
  },
  profilePic: { 
    type: String, 
    default: "" 
  },
  bio: { 
    type: String, 
    default: "" 
  },

  // 🔥 NEW FIELDS FOR TRACKING LOGINS
  lastLogin: { type: Date },
  lastLogout: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);