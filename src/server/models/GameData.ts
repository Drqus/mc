import mongoose from 'mongoose';

const gameDataSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  miningPower: { type: Number, default: 1 },
  selectedCrypto: { type: String },
  unlockedMiners: [{ type: String }],
  lastPurchaseTime: { type: Date },
  referralBonus: { type: Number, default: 0 },
  components: {
    miningRig: { type: Number, default: 1 },
    powerSupply: { type: Number, default: 1 },
    motherboard: { type: Number, default: 1 },
    cooling: { type: Number, default: 1 },
    network: { type: Number, default: 1 },
    software: { type: Number, default: 1 }
  },
  updatedAt: { type: Date, default: Date.now }
});

export const GameData = mongoose.model('GameData', gameDataSchema);