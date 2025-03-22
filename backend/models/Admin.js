const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Hashed, optional for OAuth users
  googleId: { type: String },
  facebookId: { type: String },
});

module.exports = mongoose.model('Admin', adminSchema);