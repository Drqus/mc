import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  username: { type: String },
  photoUrl: { type: String },
  lastLogin: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
  referralCode: { type: String, required: true, unique: true },
  referredBy: { type: String },
  referrals: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);