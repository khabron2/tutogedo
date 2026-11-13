import React, {useEffect, useRef, useState} from 'react';
import {ChevronLeft, ChevronRight, ImageOff, X, ZoomIn, ZoomOut} from 'lucide-react';
import {resolveImageUrl} from '../data/guideData';

export interface LightboxState {
  stepTitle: string;
  images: string[];
  index: number;
}

interface LightboxModalProps {
  state: LightboxState | null;
  onClose: () => void;
  onChangeIndex: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({state, onClose, onChangeIndex}) => {
  const [zoomed, setZoomed] = useState(false);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setZoomed(false);
    setFailedSrc(null);
  }, [state?.index, state?.stepTitle]);

  useEffect(() => {
    if (!state) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && state.index > 0) onChangeIndex(state.index - 1);
      if (e.key === 'ArrowRight' && state.index < state.images.length - 1)
        onChangeIndex(state.index + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [state, onClose, onChangeIndex]);

  if (!state) return null;

  const currentFile = state.images[state.index];
  const src = resolveImageUrl(currentFile);
  const hasPrev = state.index > 0;
  const hasNext = state.index < state.images.length - 1;
  const isError = failedSrc === src;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoomed) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (zoomed || touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta > 55 && hasPrev) onChangeIndex(state.index - 1);
    if (delta < -55 && hasNext) onChangeIndex(state.index + 1);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#071a20]/95 text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`Captura ampliada de ${state.stepTitle}`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 pt-safe">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white">{state.stepTitle}</div>
          <div className="text-xs text-[#9fd6c9] tabular-nums">
            Captura {state.index + 1} de {state.images.length}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            aria-label={zoomed ? 'Reducir zoom' : 'Ampliar zoom'}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3 text-xs font-medium text-white hover:bg-white/20"
          >
            {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
            <span className="hidden sm:inline">{zoomed ? '1x' : '2x'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar vista ampliada"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-white text-[#102c3a] hover:bg-[#e8efec]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Image Viewport */}
      <div
        className={`relative flex-1 overflow-auto p-4 ${
          zoomed ? 'cursor-zoom-out' : 'flex items-center justify-center'
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {isError ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/5 p-8 text-center">
            <ImageOff className="mb-3 h-8 w-8 text-[#9fd6c9]" />
            <p className="text-sm font-medium text-white">No se pudo cargar la captura</p>
            <p className="mt-1 text-xs text-white/70">{state.stepTitle}</p>
          </div>
        ) : (
          <img
            src={src}
            alt={`Captura ${state.index + 1}: ${state.stepTitle}`}
            referrerPolicy="no-referrer"
            onError={() => setFailedSrc(src)}
            onClick={() => setZoomed((z) => !z)}
            className={
              zoomed
                ? 'mx-auto min-w-[175vw] max-w-none rounded-lg bg-white shadow-2xl sm:min-w-[1400px]'
                : 'max-h-[74vh] max-w-full rounded-lg bg-white object-contain shadow-2xl transition-transform duration-200 cursor-zoom-in'
            }
          />
        )}
      </div>

      {/* Bottom Controls */}
      {state.images.length > 1 && (
        <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 pb-safe">
          <button
            type="button"
            disabled={!hasPrev}
            onClick={() => onChangeIndex(state.index - 1)}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-white/10 px-4 text-sm font-medium text-white disabled:opacity-35 hover:bg-white/20"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Anterior</span>
          </button>

          <div className="flex items-center gap-1.5" aria-hidden="true">
            {state.images.map((img, i) => (
              <button
                key={`${img}-${i}`}
                type="button"
                onClick={() => onChangeIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === state.index ? 'w-5 bg-[#9fd6c9]' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            disabled={!hasNext}
            onClick={() => onChangeIndex(state.index + 1)}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-white/10 px-4 text-sm font-medium text-white disabled:opacity-35 hover:bg-white/20"
          >
            <span>Siguiente</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
