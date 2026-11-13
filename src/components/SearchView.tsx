import React, {useMemo, useState} from 'react';
import {ChevronRight, Search, X} from 'lucide-react';
import {GUIDE_STAGES} from '../data/guideData';

interface SearchViewProps {
  onSelectStep: (stageIndex: number, stepId: string) => void;
}

const QUICK_TERMS = ['PDREC', 'COPDI', 'MDP', 'Carátula', 'Notificar', 'PDF'];

export const SearchView: React.FC<SearchViewProps> = ({onSelectStep}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return GUIDE_STAGES.flatMap((stage, stageIndex) =>
      stage.steps
        .map((step, stepIdx) => ({
          stageIndex,
          stageTitle: stage.title,
          stepNumber: stepIdx + 1,
          step,
        }))
        .filter(({stageTitle, step}) => {
          const haystack = `${stageTitle} ${step.title} ${step.description} ${
            step.copyFormat?.value ?? ''
          }`.toLowerCase();
          return haystack.includes(q);
        })
    );
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#dce6e2] bg-white p-4 sm:p-6">
        <h2 className="text-xl font-bold text-[#142d38] sm:text-2xl">Buscar en la guía</h2>
        <p className="mt-1 text-sm text-[#60747d]">
          Encuentre pasos por acción, código GEDO o término del procedimiento.
        </p>

        <div className="relative mt-4">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#60747d]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej.: PDREC, COPDI, carátula, audiencia…"
            aria-label="Buscar en la guía"
            className="min-h-[48px] w-full rounded-xl border border-[#dce6e2] bg-[#f4f7f5] pr-11 pl-10 text-[15px] text-[#142d38] placeholder:text-[#60747d] focus:border-[#087e79] focus:bg-white focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Limpiar búsqueda"
              className="absolute top-1/2 right-1 flex min-h-[40px] min-w-[40px] -translate-y-1/2 items-center justify-center rounded-lg text-[#60747d] hover:text-[#142d38]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_TERMS.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className={`min-h-[36px] rounded-lg border px-3 text-xs font-medium transition-colors ${
                query.toLowerCase() === term.toLowerCase()
                  ? 'border-[#087e79] bg-[#eaf5f1] text-[#075f5b]'
                  : 'border-[#dce6e2] bg-[#f7faf8] text-[#49616b] hover:border-[#087e79]/40'
              }`}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {query.trim() === '' ? (
        <div className="rounded-2xl border border-[#dce6e2] bg-white p-6 text-center text-sm text-[#60747d]">
          Escriba una palabra clave o toque un término sugerido para ver los pasos relacionados.
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-2xl border border-[#dce6e2] bg-white p-6 text-center text-sm text-[#60747d]">
          No se encontraron pasos que coincidan con “{query}”.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#dce6e2] bg-white">
          <div className="border-b border-[#e9efec] px-4 py-3 text-xs font-semibold text-[#60747d] tabular-nums">
            {results.length}{' '}
            {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
          </div>
          <div className="divide-y divide-[#e9efec]">
            {results.map((item) => (
              <button
                key={item.step.id}
                type="button"
                onClick={() => onSelectStep(item.stageIndex, item.step.id)}
                className="flex min-h-[68px] w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[#f4f7f5] active:bg-[#eaf5f1]"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-[#087e79] tabular-nums">
                    Etapa {item.stageIndex + 1} · Paso {item.stepNumber}
                  </div>
                  <div className="mt-0.5 text-[15px] font-bold text-[#142d38]">
                    {item.step.title}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs text-[#60747d]">
                    {item.step.description}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-[#60747d]" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
