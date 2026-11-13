import {useEffect, useMemo, useState} from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Info,
  Layers,
  Menu,
  Search,
  X,
} from 'lucide-react';
import {InfoView} from './components/InfoView';
import {LightboxModal, LightboxState} from './components/LightboxModal';
import {OfflineIndicator} from './components/OfflineIndicator';
import {PWAInstallButton} from './components/PWAInstallButton';
import {SearchView} from './components/SearchView';
import {StagesOverview} from './components/StagesOverview';
import {StepItem} from './components/StepItem';
import {GUIDE_STAGES, TOTAL_STEPS} from './data/guideData';

type AppTab = 'guide' | 'stages' | 'search' | 'info';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('guide');
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [sidebarQuery, setSidebarQuery] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [highlightedStepId, setHighlightedStepId] = useState<string | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const goToStage = (index: number) => {
    if (index < 0 || index >= GUIDE_STAGES.length) return;
    setCurrentStage(index);
    setActiveTab('guide');
    setMenuOpen(false);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleSelectStepFromSearch = (stageIndex: number, stepId: string) => {
    setCurrentStage(stageIndex);
    setActiveTab('guide');
    setHighlightedStepId(stepId);
    setTimeout(() => {
      const el = document.getElementById(`step-${stepId}`);
      el?.scrollIntoView({behavior: 'smooth', block: 'center'});
    }, 80);
    setTimeout(() => setHighlightedStepId(null), 2600);
  };

  const stage = GUIDE_STAGES[currentStage];

  const filteredSidebarStages = useMemo(() => {
    const q = sidebarQuery.trim().toLowerCase();
    if (!q) return GUIDE_STAGES;
    return GUIDE_STAGES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.steps.some(
          (st) =>
            st.title.toLowerCase().includes(q) || st.description.toLowerCase().includes(q)
        )
    );
  }, [sidebarQuery]);

  const visibleStepsInCurrentStage = useMemo(() => {
    const q = sidebarQuery.trim().toLowerCase();
    if (!q) return stage.steps;
    if (stage.title.toLowerCase().includes(q)) return stage.steps;
    const matches = stage.steps.filter(
      (st) => st.title.toLowerCase().includes(q) || st.description.toLowerCase().includes(q)
    );
    return matches.length > 0 ? matches : stage.steps;
  }, [sidebarQuery, stage]);

  return (
    <div className="min-h-screen bg-[#f4f7f5] pb-24 text-[#142d38] lg:pb-12">
      {/* Desktop Top Bar (3-zone contract) */}
      <header className="hidden border-b border-[#193f52] bg-[#102c3a] text-white lg:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-3.5">
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className="text-left text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            Expedientes Electrónicos
          </button>

          <nav className="flex items-center gap-6 text-sm font-medium text-[#c2d5d5]">
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'guide'
                  ? 'border-b-2 border-[#9fd6c9] text-white'
                  : 'hover:text-white'
              }`}
            >
              Guía
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('stages')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'stages'
                  ? 'border-b-2 border-[#9fd6c9] text-white'
                  : 'hover:text-white'
              }`}
            >
              Etapas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('search')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'search'
                  ? 'border-b-2 border-[#9fd6c9] text-white'
                  : 'hover:text-white'
              }`}
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('info')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'info'
                  ? 'border-b-2 border-[#9fd6c9] text-white'
                  : 'hover:text-white'
              }`}
            >
              Información
            </button>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <PWAInstallButton variant="header" />
            <span className="text-xs font-medium text-[#9fd6c9] tabular-nums whitespace-nowrap shrink-0">
              {GUIDE_STAGES.length} etapas · {TOTAL_STEPS} pasos
            </span>
          </div>
        </div>
      </header>

      {/* Sticky Mobile Header with Hamburger Menu & Numbered Stage Buttons */}
      <header className="sticky top-0 z-30 border-b border-[#193f52] bg-[#102c3a]/95 text-white backdrop-blur-md pt-safe lg:hidden">
        <div className="flex h-12 items-center justify-between gap-2 px-3">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className="flex min-h-[44px] min-w-[44px] -ml-1.5 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 active:bg-white/15"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <h1 className="min-w-0 flex-1 truncate text-[15px] font-bold leading-tight text-white">
            Expedientes Electrónicos
          </h1>

          <div className="shrink-0 pr-1 text-xs font-semibold text-[#9fd6c9] tabular-nums">
            Etapa {currentStage + 1}/{GUIDE_STAGES.length}
          </div>
        </div>
      </header>

      {/* Mobile Hamburger Menu Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex bg-[#071a20]/60 backdrop-blur-xs lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          onClick={() => setMenuOpen(false)}
        >
          <aside
            className="flex h-full w-[min(86vw,320px)] flex-col bg-white text-[#142d38] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 bg-[#102c3a] px-4 py-3.5 pt-safe text-white">
              <div className="min-w-0">
                <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#9fd6c9]">
                  Navegación
                </div>
                <div className="truncate text-base font-bold">Etapas de la guía</div>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
                className="flex min-h-[44px] min-w-[44px] -mr-1.5 items-center justify-center rounded-xl text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3">
              <div className="space-y-1">
                {GUIDE_STAGES.map((s, idx) => {
                  const isActive = activeTab === 'guide' && idx === currentStage;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => goToStage(idx)}
                      className={`flex min-h-[48px] w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                        isActive
                          ? 'bg-[#eaf5f1] font-semibold text-[#075f5b]'
                          : 'text-[#142d38] hover:bg-[#f4f7f5]'
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold tabular-nums ${
                          isActive
                            ? 'bg-[#087e79] text-white'
                            : 'bg-[#eef2f0] text-[#142d38]'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="min-w-0 flex-1 leading-snug">{s.title}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-[#e9efec] pt-3 space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('stages');
                    setMenuOpen(false);
                  }}
                  className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-[#49616b] hover:bg-[#f4f7f5]"
                >
                  <Layers className="h-4 w-4 text-[#087e79]" aria-hidden="true" />
                  <span>Resumen de etapas</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('search');
                    setMenuOpen(false);
                  }}
                  className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-[#49616b] hover:bg-[#f4f7f5]"
                >
                  <Search className="h-4 w-4 text-[#087e79]" aria-hidden="true" />
                  <span>Buscar en la guía</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('info');
                    setMenuOpen(false);
                  }}
                  className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-[#49616b] hover:bg-[#f4f7f5]"
                >
                  <Info className="h-4 w-4 text-[#087e79]" aria-hidden="true" />
                  <span>Información y códigos</span>
                </button>
              </div>
            </div>

            <div className="border-t border-[#e9efec] p-3 pb-safe">
              <PWAInstallButton variant="card" />
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="mx-auto max-w-6xl px-3.5 pt-4 sm:px-6 lg:grid lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-7 lg:pt-7">
        {/* Desktop Sidebar */}
        <aside className="hidden self-start lg:sticky lg:top-6 lg:block">
          <div className="rounded-2xl border border-[#dce6e2] bg-white p-5">
            <h2 className="text-sm font-bold text-[#142d38]">Etapas del trámite</h2>

            <div className="relative mt-3">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#60747d]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={sidebarQuery}
                onChange={(e) => {
                  const val = e.target.value;
                  setSidebarQuery(val);
                  if (val.trim()) {
                    const firstMatch = GUIDE_STAGES.findIndex(
                      (s) =>
                        s.title.toLowerCase().includes(val.trim().toLowerCase()) ||
                        s.steps.some(
                          (st) =>
                            st.title.toLowerCase().includes(val.trim().toLowerCase()) ||
                            st.description.toLowerCase().includes(val.trim().toLowerCase())
                        )
                    );
                    if (firstMatch >= 0) {
                      setCurrentStage(firstMatch);
                      setActiveTab('guide');
                    }
                  }
                }}
                placeholder="Filtrar etapas o pasos…"
                aria-label="Filtrar etapas o pasos"
                className="w-full rounded-xl border border-[#dce6e2] bg-[#f7faf8] py-2.5 pr-3 pl-9 text-sm text-[#142d38] placeholder:text-[#60747d] focus:border-[#087e79] focus:bg-white focus:outline-none"
              />
            </div>

            <nav className="mt-3.5 flex flex-col gap-1" aria-label="Etapas del trámite">
              {filteredSidebarStages.map((s) => {
                const isActive = activeTab === 'guide' && currentStage === s.id;

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goToStage(s.id)}
                    className={`flex w-full min-w-0 items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left text-sm transition-colors ${
                      isActive
                        ? 'bg-[#eaf5f1] font-semibold text-[#075f5b]'
                        : 'text-[#49616b] hover:bg-[#f4f7f5]'
                    }`}
                  >
                    <span
                      className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold tabular-nums ${
                        isActive ? 'bg-[#087e79] text-white' : 'bg-[#eef2f0] text-[#142d38]'
                      }`}
                    >
                      {s.id + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{s.title}</span>
                  </button>
                );
              })}
              {filteredSidebarStages.length === 0 && (
                <p className="py-4 text-center text-xs text-[#60747d]">
                  Sin coincidencias para “{sidebarQuery}”.
                </p>
              )}
            </nav>
          </div>
        </aside>

        {/* Main Column */}
        <main className="min-w-0">
          {activeTab === 'guide' && (
            <div className="space-y-3.5">
              {/* Active Stage Section Card */}
              <article className="rounded-2xl border border-[#dce6e2] bg-white p-4 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#087e79]">
                  <span className="tabular-nums">
                    Etapa {currentStage + 1} de {GUIDE_STAGES.length}
                  </span>
                  <span className="text-[#60747d] tabular-nums">
                    {stage.steps.length} pasos
                  </span>
                </div>

                <h2 className="mt-1.5 text-2xl font-bold leading-tight text-[#142d38] text-balance sm:text-[28px]">
                  {stage.title}
                </h2>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#60747d]">
                  {stage.intro}
                </p>

                <div className="mt-5">
                  {visibleStepsInCurrentStage.map((step) => {
                    const realStepNumber =
                      stage.steps.findIndex((s) => s.id === step.id) + 1;
                    return (
                      <StepItem
                        key={step.id}
                        step={step}
                        stepNumber={realStepNumber}
                        isHighlighted={highlightedStepId === step.id}
                        onOpenImage={(stepTitle, images, index) =>
                          setLightbox({stepTitle, images, index})
                        }
                      />
                    );
                  })}
                </div>

                {/* Stage Prev / Next Thumb Controls */}
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#e9efec] pt-5">
                  <button
                    type="button"
                    disabled={currentStage === 0}
                    onClick={() => goToStage(currentStage - 1)}
                    className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl border border-[#dce6e2] bg-white px-4 text-sm font-semibold text-[#142d38] transition-colors disabled:opacity-40 hover:bg-[#f4f7f5] active:scale-[0.99]"
                  >
                    <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Etapa anterior</span>
                  </button>

                  {currentStage < GUIDE_STAGES.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => goToStage(currentStage + 1)}
                      className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl bg-[#087e79] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#066864] active:scale-[0.99]"
                    >
                      <span>Siguiente etapa</span>
                      <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveTab('stages')}
                      className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-xl bg-[#102c3a] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#173d50] active:scale-[0.99]"
                    >
                      <span>Ver todas</span>
                    </button>
                  )}
                </div>
              </article>
            </div>
          )}

          {activeTab === 'stages' && (
            <StagesOverview currentStage={currentStage} onSelectStage={goToStage} />
          )}

          {activeTab === 'search' && (
            <SearchView onSelectStep={handleSelectStepFromSearch} />
          )}

          {activeTab === 'info' && <InfoView />}

          <footer className="mt-8 hidden text-center text-xs text-[#788a8d] lg:block">
            Guía elaborada a partir del tutorial proporcionado · Las capturas se amplían al
            seleccionarlas
          </footer>
        </main>
      </div>

      {/* Floating Glassmorphic Mobile Bottom Navigation Bar */}
      <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <nav
          aria-label="Navegación principal móvil"
          className="pointer-events-auto mx-auto grid h-[62px] max-w-[420px] grid-cols-4 items-center gap-1 rounded-full border border-white/15 bg-[#102c3a]/90 p-1.5 shadow-[0_14px_34px_rgba(7,26,32,0.38)] backdrop-blur-xl"
        >
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            aria-current={activeTab === 'guide' ? 'page' : undefined}
            className={`flex h-full min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-full transition-all duration-150 ${
              activeTab === 'guide'
                ? 'bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]'
                : 'text-[#c2d5d5]/80 hover:text-white'
            }`}
          >
            <BookOpen
              className={`h-[20px] w-[20px] ${
                activeTab === 'guide' ? 'fill-white/20 stroke-[2.2]' : 'stroke-[1.9]'
              }`}
              aria-hidden="true"
            />
            <span className="text-[11px] font-semibold tracking-tight leading-none">Guía</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stages')}
            aria-current={activeTab === 'stages' ? 'page' : undefined}
            className={`flex h-full min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-full transition-all duration-150 ${
              activeTab === 'stages'
                ? 'bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]'
                : 'text-[#c2d5d5]/80 hover:text-white'
            }`}
          >
            <Layers
              className={`h-[20px] w-[20px] ${
                activeTab === 'stages' ? 'fill-white/20 stroke-[2.2]' : 'stroke-[1.9]'
              }`}
              aria-hidden="true"
            />
            <span className="text-[11px] font-semibold tracking-tight leading-none">Etapas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('search')}
            aria-current={activeTab === 'search' ? 'page' : undefined}
            className={`flex h-full min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-full transition-all duration-150 ${
              activeTab === 'search'
                ? 'bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]'
                : 'text-[#c2d5d5]/80 hover:text-white'
            }`}
          >
            <Search
              className={`h-[20px] w-[20px] ${
                activeTab === 'search' ? 'stroke-[2.5]' : 'stroke-[1.9]'
              }`}
              aria-hidden="true"
            />
            <span className="text-[11px] font-semibold tracking-tight leading-none">Buscar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('info')}
            aria-current={activeTab === 'info' ? 'page' : undefined}
            className={`flex h-full min-h-[44px] flex-col items-center justify-center gap-0.5 rounded-full transition-all duration-150 ${
              activeTab === 'info'
                ? 'bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]'
                : 'text-[#c2d5d5]/80 hover:text-white'
            }`}
          >
            <span
              className={`flex h-[22px] w-[22px] items-center justify-center rounded-full border ${
                activeTab === 'info'
                  ? 'border-[#9fd6c9] bg-[#087e79] text-white'
                  : 'border-white/30 bg-white/10 text-[#c2d5d5]'
              }`}
            >
              <Info className="h-[13px] w-[13px] stroke-[2.2]" aria-hidden="true" />
            </span>
            <span className="text-[11px] font-semibold tracking-tight leading-none">Info</span>
          </button>
        </nav>
      </div>

      {/* Offline Banner & Touch Lightbox */}
      <OfflineIndicator />
      <LightboxModal
        state={lightbox}
        onClose={() => setLightbox(null)}
        onChangeIndex={(newIndex) =>
          setLightbox((prev) => (prev ? {...prev, index: newIndex} : null))
        }
      />
    </div>
  );
}
