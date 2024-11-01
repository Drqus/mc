import React from 'react';
import { useGame } from '../context/GameContext';
import TelegramLogin from './TelegramLogin';
import { loginWithTelegram } from '../services/api';
import { Cpu } from 'lucide-react';

export default function AuthScreen() {
  const { dispatch } = useGame();

  const handleTelegramAuth = async (user: any) => {
    try {
      const response = await loginWithTelegram(user);
      dispatch({ type: 'SET_USER', payload: response.user });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="glassmorphism rounded-2xl p-8 border border-gray-700/50">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-xl bg-emerald-500/20">
                <Cpu className="w-12 h-12 text-emerald-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome to Crypto Miner</h1>
            <p className="text-gray-400">Login to start your mining journey</p>
          </div>

          <TelegramLogin onAuth={handleTelegramAuth} />
        </div>
      </div>
    </div>
  );
}