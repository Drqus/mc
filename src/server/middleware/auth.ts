import { Request, Response, NextFunction } from 'express';
import { createHmac } from 'crypto';
import { User } from '../models/User';

interface TelegramAuthData {
  id: number;
  first_name: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const validateTelegramAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authData = req.body as TelegramAuthData;
    const { hash, ...data } = authData;
    
    // Check if auth_date is not expired (24h)
    const authDate = data.auth_date;
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime - authDate > 86400) {
      return res.status(401).json({ error: 'Authentication expired' });
    }

    // Validate Telegram hash
    const botToken = process.env.TELEGRAM_BOT_TOKEN as string;
    const secretKey = createHmac('sha256', 'WebAppData').update(botToken).digest();
    
    const dataCheckString = Object.keys(data)
      .sort()
      .map(k => `${k}=${data[k]}`)
      .join('\n');
    
    const generatedHash = createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (generatedHash !== hash) {
      return res.status(401).json({ error: 'Invalid authentication' });
    }

    // Check if user exists
    const userId = String(data.id);
    const user = await User.findOne({ telegramId: userId });

    if (!user) {
      req.user = { id: userId };
      return next();
    }

    // Update last login
    await User.updateOne(
      { telegramId: userId },
      { $set: { lastLogin: new Date() } }
    );

    req.user = { id: userId };
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};