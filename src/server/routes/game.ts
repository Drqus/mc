import { Router } from 'express';
import { validateTelegramAuth } from '../middleware/auth';
import { User } from '../models/User';
import { GameData } from '../models/GameData';

const router = Router();

// Get user game data
router.get('/user/:userId/data', validateTelegramAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (req.user?.id !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const user = await User.findOne({ telegramId: userId });
    const gameData = await GameData.findOne({ userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user,
      gameData: gameData || {
        balance: 0,
        miningPower: 1,
        components: {
          miningRig: 1,
          powerSupply: 1,
          motherboard: 1,
          cooling: 1,
          network: 1,
          software: 1
        }
      }
    });
  } catch (error) {
    console.error('Get user data error:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Update game data
router.post('/user/:userId/update', validateTelegramAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    
    if (req.user?.id !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const gameData = await GameData.findOneAndUpdate(
      { userId },
      { ...updates, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    
    res.json({ success: true, gameData });
  } catch (error) {
    console.error('Update game data error:', error);
    res.status(500).json({ error: 'Failed to update game data' });
  }
});

export default router;