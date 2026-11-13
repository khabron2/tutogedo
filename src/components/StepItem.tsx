import React, {useState} from 'react';
import {Copy, Expand, ImageOff} from 'lucide-react';
import {GuideStep, resolveImageUrl} from '../data/guideData';

interface StepItemProps {
  step: GuideStep;
  stepNumber: number;
  isHighlighted?: boolean;
  onOpenImage: (stepTitle: string, images: string[], index: number) => void;
}

export const StepItem: React.FC<StepItemProps> = ({
  step,
  stepNumber,
  isHighlighted = false,
  onOpenImage,
}) => {
  const [copied, setCopied] = useState(false);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const handleCopy = async () => {
    if (!step.copyFormat) return;
    try {
      await navigator.clipboard.writeText(step.copyFormat.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API may be restricted in non-HTTPS contexts
    }
  };

  return (
    <div
      id={`step-${step.id}`}
      className={`border-t border-[#e9efec] py-5 first:border-t-0 first:pt-2 transition-colors ${
        isHighlighted ? 'bg-[#eaf5f1]/60 -mx-4 px-4 rounded-xl' : ''
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-baseline gap-2.5">
          <span className="font-mono text-xs font-bold text-[#087e79] tabular-nums shrink-0">
            {String(stepNumber).padStart(2, '0')}
          </span>
          <h3 className="text-base font-bold leading-snug text-[#142d38] sm:text-[17px]">
            {step.title}
          </h3>
        </div>

        <p className="mt-1.5 text-[15px] leading-relaxed text-[#4e626a]">{step.description}</p>

        {step.copyFormat && (
          <div className="mt-3">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex min-h-[40px] max-w-full items-center gap-2 rounded-lg border border-[#dce6e2] bg-[#f4f7f5] px-3 py-1.5 text-left text-xs font-medium text-[#142d38] transition-colors hover:border-[#087e79]/50 hover:bg-[#eaf5f1]"
            >
              <Copy className="h-3.5 w-3.5 shrink-0 text-[#087e79]" aria-hidden="true" />
              <span className="truncate font-mono text-[12px]">{step.copyFormat.value}</span>
              <span className="shrink-0 font-semibold text-[#075f5b]">
                {copied ? 'Copiado' : 'Copiar'}
              </span>
            </button>
          </div>
        )}

        {/* Mobile horizontal swipe strip · Desktop grid */}
        {step.images.length > 0 && (
          <div className="mt-3.5 flex gap-2.5 overflow-x-auto pb-1 snap-x snap-mandatory no-scrollbar sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-4">
            {step.images.map((fileName, idx) => {
              const src = resolveImageUrl(fileName);
              const isBroken = brokenImages[src];
              return (
                <button
                  key={`${fileName}-${idx}`}
                  type="button"
                  onClick={() => onOpenImage(step.title, step.images, idx)}
                  aria-label={`Ampliar captura ${idx + 1} de ${step.title}`}
                  className="group relative w-[164px] shrink-0 snap-start overflow-hidden rounded-xl border border-[#dce6e2] bg-[#f7faf8] p-1.5 text-left transition-colors hover:border-[#69aaa2] active:scale-[0.98] sm:w-auto"
                >
                  <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-lg bg-white sm:h-28">
                    {isBroken ? (
                      <div className="flex flex-col items-center justify-center gap-1 p-2 text-center text-[#60747d]">
                        <ImageOff className="h-5 w-5" />
                        <span className="text-[11px]">Captura {idx + 1}</span>
                      </div>
                    ) : (
                      <img
                        loading="lazy"
                        src={src}
                        alt={`Captura ${idx + 1}: ${step.title}`}
                        referrerPolicy="no-referrer"
                        onError={() => setBrokenImages((prev) => ({...prev, [src]: true}))}
                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                      />
                    )}
                    <span className="absolute right-1.5 bottom-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-[#102c3a]/75 text-white opacity-90 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                      <Expand className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                  <span className="mt-1.5 block px-1 text-[11px] font-medium text-[#60747d] tabular-nums">
                    Ver captura {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
