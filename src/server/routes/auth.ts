import { Router } from 'express';
import { validateTelegramAuth } from '../middleware/auth';
import { User } from '../models/User';
import { GameData } from '../models/GameData';

const router = Router();

router.post('/login', validateTelegramAuth, async (req, res) => {
  try {
    const userId = req.user?.id;
    let user = await User.findOne({ telegramId: userId });
    
    if (!user) {
      // Create new user
      user = new User({
        telegramId: userId,
        firstName: req.body.first_name,
        username: req.body.username,
        photoUrl: req.body.photo_url,
        referralCode: Math.random().toString(36).substring(2, 8).toUpperCase()
      });
      await user.save();

      // Initialize game data
      const gameData = new GameData({
        userId,
        unlockedMiners: ['USDT']
      });
      await gameData.save();
    } else {
      // Update last login
      user.lastLogin = new Date();
      await user.save();
    }

    res.json({ user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;