import React from 'react';
import {WifiOff} from 'lucide-react';
import {useOnlineStatus} from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-24 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-[#f0d9a9] bg-[#fff8ea] px-3.5 py-2 text-xs font-medium text-[#60461c] shadow-lg lg:bottom-5 lg:left-5 lg:translate-x-0"
    >
      <WifiOff className="h-3.5 w-3.5 shrink-0 text-[#996515]" aria-hidden="true" />
      <span className="whitespace-nowrap">Modo sin conexión · Guía guardada localmente</span>
    </div>
  );
};
