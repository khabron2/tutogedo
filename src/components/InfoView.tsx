import React, {useState} from 'react';
import {AlertTriangle, Copy, ShieldCheck} from 'lucide-react';
import {GUIDE_NOTES, NOTICE_INFO, QUICK_FORMATS} from '../data/guideData';
import {PWAInstallButton} from './PWAInstallButton';

export const InfoView: React.FC = () => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = async (value: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1600);
    } catch {
      // Clipboard may be restricted
    }
  };

  return (
    <div className="space-y-4">
      {/* Privacy & Tool Notice */}
      <section className="rounded-2xl border border-[#f0d9a9] bg-[#fff8ea] p-5 text-[#60461c]">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#996515]" aria-hidden="true" />
          <div>
            <h2 className="text-base font-bold text-[#4a3512]">{NOTICE_INFO.title}</h2>
            <p className="mt-1 text-sm leading-relaxed">{NOTICE_INFO.body}</p>
          </div>
        </div>
      </section>

      {/* Mobile PWA Install Card */}
      <section className="rounded-2xl border border-[#dce6e2] bg-white p-5">
        <h2 className="text-lg font-bold text-[#142d38]">Aplicación móvil y uso sin conexión</h2>
        <p className="mt-1 text-sm text-[#60747d]">
          Instale esta guía en la pantalla de inicio de su teléfono para consultarla rápidamente en
          modo pantalla completa.
        </p>
        <div className="mt-4">
          <PWAInstallButton variant="card" />
        </div>
      </section>

      {/* Quick Reference Codes & Formats */}
      <section className="rounded-2xl border border-[#dce6e2] bg-white p-5">
        <h2 className="text-lg font-bold text-[#142d38]">Códigos y formatos frecuentes</h2>
        <p className="mt-1 text-sm text-[#60747d]">
          Toque cualquier formato para copiarlo al portapapeles.
        </p>
        <div className="mt-3 divide-y divide-[#e9efec]">
          {QUICK_FORMATS.map((item, idx) => (
            <div key={item.label} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <div className="text-xs font-medium text-[#60747d]">{item.label}</div>
                <div className="mt-0.5 break-all font-mono text-xs font-semibold text-[#142d38]">
                  {item.value}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(item.value, idx)}
                aria-label={`Copiar ${item.label}`}
                className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-lg border border-[#dce6e2] bg-[#f4f7f5] px-3 text-xs font-semibold text-[#075f5b] hover:bg-[#eaf5f1]"
              >
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{copiedIdx === idx ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* General Notes from LEEME */}
      <section className="rounded-2xl border border-[#dce6e2] bg-white p-5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#087e79]" aria-hidden="true" />
          <h2 className="text-lg font-bold text-[#142d38]">Sobre esta guía</h2>
        </div>
        <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#49616b]">
          {GUIDE_NOTES.map((note, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#087e79]" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
