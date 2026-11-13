import React from 'react';
import {ChevronRight} from 'lucide-react';
import {GUIDE_STAGES} from '../data/guideData';

interface StagesOverviewProps {
  currentStage: number;
  onSelectStage: (index: number) => void;
}

export const StagesOverview: React.FC<StagesOverviewProps> = ({
  currentStage,
  onSelectStage,
}) => {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-[#dce6e2] bg-white p-4 sm:p-6">
        <h2 className="text-xl font-bold text-[#142d38] sm:text-2xl">Etapas del trámite</h2>
        <p className="mt-1 text-sm text-[#60747d]">
          Seleccione cualquiera de las 7 etapas para revisar sus pasos y capturas.
        </p>
      </div>

      <div className="divide-y divide-[#e9efec] overflow-hidden rounded-2xl border border-[#dce6e2] bg-white">
        {GUIDE_STAGES.map((stage, idx) => {
          const totalInStage = stage.steps.length;
          const isActive = idx === currentStage;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onSelectStage(idx)}
              className={`flex min-h-[72px] w-full items-center gap-3.5 px-4 py-4 text-left transition-colors hover:bg-[#f4f7f5] active:bg-[#eaf5f1] sm:px-6 ${
                isActive ? 'bg-[#eaf5f1]/55' : ''
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold tabular-nums ${
                  isActive ? 'bg-[#087e79] text-white' : 'bg-[#eef2f0] text-[#142d38]'
                }`}
              >
                {idx + 1}
              </span>

              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-[#087e79] tabular-nums">
                  Etapa {idx + 1} · {totalInStage} pasos
                </div>
                <div className="mt-0.5 text-[15px] font-bold text-[#142d38] sm:text-base">
                  {stage.title}
                </div>
                <p className="mt-0.5 line-clamp-1 text-xs text-[#60747d]">{stage.intro}</p>
              </div>

              <ChevronRight className="h-5 w-5 shrink-0 text-[#60747d]" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
