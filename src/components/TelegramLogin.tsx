import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';

declare global {
  interface Window {
    TelegramLoginWidget: {
      dataOnauth: (user: any) => void;
    };
  }
}

interface TelegramLoginProps {
  onAuth: (user: any) => void;
}

export default function TelegramLogin({ onAuth }: TelegramLoginProps) {
  useEffect(() => {
    // Create Telegram script
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'RCMinebot'); // Updated bot username
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '8');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-auth-url', 'http://localhost:5174/auth/telegram');
    script.async = true;

    // Setup callback
    window.TelegramLoginWidget = {
      dataOnauth: (user: any) => {
        onAuth(user);
      }
    };

    // Add script to document
    const container = document.getElementById('telegram-login');
    if (container) {
      container.appendChild(script);
    }

    // Cleanup
    return () => {
      if (container) {
        container.innerHTML = '';
      }
      delete window.TelegramLoginWidget;
    };
  }, [onAuth]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div id="telegram-login" className="flex justify-center"></div>
      <p className="text-sm text-gray-400">Login securely with your Telegram account</p>
    </div>
  );
}