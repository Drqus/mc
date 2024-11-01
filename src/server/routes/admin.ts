import { Router } from 'express';
import { validateTelegramAuth } from '../middleware/auth';
import { User } from '../models/User';
import { GameData } from '../models/GameData';

const router = Router();

const isAdmin = async (userId: string) => {
  const user = await User.findOne({ telegramId: userId });
  return user?.isAdmin === true;
};

// Get all users data
router.get('/users', validateTelegramAuth, async (req, res) => {
  try {
    if (!req.user?.id || !(await isAdmin(req.user.id))) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const users = await User.find().select('-__v');
    res.json({ users });
  } catch (error) {
    console.error('Admin users fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get game statistics
router.get('/stats', validateTelegramAuth, async (req, res) => {
  try {
    if (!req.user?.id || !(await isAdmin(req.user.id))) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const usersCount = await User.countDocuments();
    const gameDataAggregation = await GameData.aggregate([
      {
        $group: {
          _id: null,
          totalBalance: { $sum: '$balance' },
          totalMiningPower: { $sum: '$miningPower' }
        }
      }
    ]);

    const stats = gameDataAggregation[0] || { totalBalance: 0, totalMiningPower: 0 };

    res.json({
      stats: {
        totalUsers: usersCount,
        totalBalance: stats.totalBalance,
        totalMiningPower: stats.totalMiningPower,
        averageBalance: stats.totalBalance / usersCount || 0,
        averageMiningPower: stats.totalMiningPower / usersCount || 0
      }
    });
  } catch (error) {
    console.error('Admin stats fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;