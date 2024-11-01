# Crypto Mining Game

A web-based crypto mining simulation game built with React, TypeScript, and MongoDB, featuring Telegram authentication.

![Game Preview](https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=800&auto=format&fit=crop&q=80)

## Features

- 🎮 Real-time mining simulation
- 💰 Multiple cryptocurrency support (USDT, BTC, ETH, TON)
- 🔄 Upgradeable mining components
- 👥 Referral system
- 🔐 Secure Telegram authentication
- 💳 Withdrawal system
- 📊 Admin dashboard

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: Telegram Login Widget
- Deployment: Render

## Prerequisites

- Node.js 18+ and npm
- MongoDB database
- Telegram bot token
- Render account

## Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto-mining-game
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5173
NODE_ENV=development
MONGODB_URI=your_mongodb_uri
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
VITE_API_URL=http://localhost:5173
```

4. Start development server:
```bash
npm run dev
```

## Deployment to Render

### 1. Database Setup

1. Create a MongoDB database:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster (free tier works)
   - Get your connection string
   - Add IP `0.0.0.0/0` to allow access from Render

### 2. Telegram Bot Setup

1. Create a Telegram bot:
   - Message [@BotFather](https://t.me/BotFather)
   - Use `/newbot` command
   - Save the bot token
   - Configure bot settings and commands

### 3. Render Setup

1. Create a new Web Service:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository

2. Configure the Web Service:
   - Name: `crypto-mining-game` (or your preference)
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
   - Instance Type: Select free tier

3. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5173
   MONGODB_URI=your_mongodb_uri
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   VITE_API_URL=https://your-render-url.onrender.com
   ```

4. Deploy:
   - Click "Create Web Service"
   - Wait for the deployment to complete

### 4. Post-Deployment

1. Update Telegram Bot:
   - Set webhook URL to your Render domain
   - Update bot settings if needed

2. Verify Setup:
   - Check application logs in Render
   - Test authentication flow
   - Verify database connections

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5173) | No |
| `NODE_ENV` | Environment (development/production) | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `TELEGRAM_BOT_TOKEN` | Telegram bot API token | Yes |
| `VITE_API_URL` | Frontend API URL | Yes |

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── context/       # React context providers
│   ├── server/        # Backend server code
│   │   ├── config/    # Server configuration
│   │   ├── middleware/# Express middleware
│   │   └── routes/    # API routes
│   ├── services/      # API services
│   └── utils/         # Utility functions
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Security

- ✅ Secure authentication flow
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Environment variables
- ✅ Input validation
- ✅ Error handling

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@example.com or join our [Telegram group](https://t.me/your-group)