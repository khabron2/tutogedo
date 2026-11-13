import React, {useState} from 'react';
import {Download, Share, Smartphone, X} from 'lucide-react';
import {usePWAInstall} from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'header' | 'card';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({variant = 'header'}) => {
  const {isInstallable, isInstalled, isIOS, install} = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) {
    if (variant === 'card') {
      return (
        <div className="rounded-xl border border-[#dce6e2] bg-[#f1f8f5] px-4 py-3 text-sm text-[#075f5b]">
          Aplicación instalada en este dispositivo y lista para uso sin conexión.
        </div>
      );
    }
    return null;
  }

  const handleAction = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuide(true);
    }
  };

  if (variant === 'header') {
    if (!isInstallable && !isIOS) {
      return null;
    }
    return (
      <>
        <button
          type="button"
          onClick={handleAction}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-[#087e79] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#066864] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9fd6c9] whitespace-nowrap shrink-0"
        >
          <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Instalar app</span>
        </button>
        {showGuide && <InstallGuideModal isIOS={isIOS} onClose={() => setShowGuide(false)} />}
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleAction}
        className="inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#087e79] px-5 py-3 text-sm font-semibold text-white transition-transform active:scale-[0.99] hover:bg-[#066864] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087e79] whitespace-nowrap"
      >
        <Smartphone className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>
          {isInstallable
            ? 'Instalar aplicación en el teléfono'
            : isIOS
              ? 'Cómo instalar en iPhone / iPad'
              : 'Cómo instalar como app móvil'}
        </span>
      </button>
      {showGuide && <InstallGuideModal isIOS={isIOS} onClose={() => setShowGuide(false)} />}
    </>
  );
};

const InstallGuideModal: React.FC<{isIOS: boolean; onClose: () => void}> = ({isIOS, onClose}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#071a20]/65 backdrop-blur-xs sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-guide-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-white p-6 pb-8 shadow-2xl sm:rounded-2xl sm:pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-[#dce6e2] sm:hidden" />
        <div className="flex items-start justify-between gap-4">
          <h3 id="install-guide-title" className="text-lg font-bold text-[#142d38]">
            {isIOS ? 'Instalar en iPhone o iPad' : 'Instalar en Android o navegador'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar instrucciones de instalación"
            className="flex min-h-[44px] min-w-[44px] -mr-2 -mt-2 items-center justify-center rounded-full text-[#60747d] hover:bg-[#f4f7f5] hover:text-[#142d38]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isIOS ? (
          <ol className="mt-4 space-y-3 text-sm text-[#49616b]">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#eaf5f1] text-xs font-bold text-[#075f5b]">
                1
              </span>
              <span>
                Toque el botón <strong className="text-[#142d38]">Compartir</strong>{' '}
                <Share className="inline h-4 w-4 text-[#087e79] align-text-bottom" /> en la barra
                de Safari.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#eaf5f1] text-xs font-bold text-[#075f5b]">
                2
              </span>
              <span>
                Deslice hacia abajo y seleccione{' '}
                <strong className="text-[#142d38]">Agregar a inicio</strong>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#eaf5f1] text-xs font-bold text-[#075f5b]">
                3
              </span>
              <span>
                Confirme tocando <strong className="text-[#142d38]">Agregar</strong> para abrirla en
                pantalla completa y usarla sin conexión.
              </span>
            </li>
          </ol>
        ) : (
          <ol className="mt-4 space-y-3 text-sm text-[#49616b]">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#eaf5f1] text-xs font-bold text-[#075f5b]">
                1
              </span>
              <span>
                Abra el menú del navegador (tres puntos en la esquina superior derecha en Chrome o
                Edge).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#eaf5f1] text-xs font-bold text-[#075f5b]">
                2
              </span>
              <span>
                Toque <strong className="text-[#142d38]">Instalar aplicación</strong> o{' '}
                <strong className="text-[#142d38]">Agregar a pantalla de inicio</strong>.
              </span>
            </li>
          </ol>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-6 flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#102c3a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#173d50]"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};
