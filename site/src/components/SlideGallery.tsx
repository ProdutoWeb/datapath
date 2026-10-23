import { useState } from 'react'
import { Filter, Sparkles, X, Microscope, Eye, Layers } from 'lucide-react'
import slideThumbReal from '../assets/images/slide_tb8325_thumb.webp'
import slideMacroReal from '../assets/images/slide_tb8325_macro.webp'

interface SlideItem {
  id: string
  code: string
  originalSampleId?: string
  organ: string
  staining: string
  colors: string[]
  bgColor: string
  imageUrl?: string
  macroUrl?: string
  isReal?: boolean
  resolution?: string
  magnification?: string
  mpp?: string
  description?: string
}

/* Acervo de lâminas — A primeira é a lâmina real escaneada no projeto */
const SLIDES: SlideItem[] = [
  {
    id: '1',
    code: 'DP-2026-0001',
    originalSampleId: 'TB 83-25 (BRIVIX 319)',
    organ: 'Tecido Biopsiado',
    staining: 'HE',
    colors: ['#f0c8dd', '#b3559b', '#5b1f57', '#e8b4d0', '#8a3d6e'],
    bgColor: '#fdf2f8',
    imageUrl: slideThumbReal,
    macroUrl: slideMacroReal,
    isReal: true,
    resolution: '90.112 × 139.264 px (12,5 Gigapixels)',
    magnification: '73.0x',
    mpp: '0.1369 µm/pixel',
    description: 'Corte histológico completo digitalizado com escaneamento WSI de ultra-alta resolução. Amostra histopatológica corada em Hematoxilina e Eosina (HE) demonstrando arquitetura tecidual detalhada e preservação celular.',
  },
  { id: '2', code: 'DP-2026-0002', organ: 'Mama', staining: 'HE', colors: ['#f0c8dd', '#d4829f', '#5b1f57', '#c96b8a', '#7a2d52'], bgColor: '#fdf2f8' },
  { id: '3', code: 'DP-2026-0003', organ: 'Fígado', staining: 'Ki-67', colors: ['#f6dcc0', '#c07a3a', '#5c3313', '#e0a060', '#8b5020'], bgColor: '#fffbeb' },
  { id: '4', code: 'DP-2026-0004', organ: 'Pulmão', staining: 'HER2', colors: ['#c9e4f6', '#3d8fbd', '#173d5c', '#6bb0d4', '#2a6a94'], bgColor: '#eff6ff' },
  { id: '5', code: 'DP-2026-0005', organ: 'Tireoide', staining: 'HE', colors: ['#f0c8dd', '#a0456d', '#5b1f57', '#d490b0', '#6e2845'], bgColor: '#fdf2f8' },
  { id: '6', code: 'DP-2026-0006', organ: 'Rim', staining: 'PAS', colors: ['#fde8e8', '#e06060', '#8b2020', '#f09090', '#a03030'], bgColor: '#fef2f2' },
  { id: '7', code: 'DP-2026-0007', organ: 'Cólon', staining: 'HE', colors: ['#f0c8dd', '#c46a8b', '#5b1f57', '#e0a0b8', '#8a3055'], bgColor: '#fdf2f8' },
  { id: '8', code: 'DP-2026-0008', organ: 'Estômago', staining: 'Giemsa', colors: ['#d8d0f0', '#6050a0', '#302060', '#a090c0', '#483878'], bgColor: '#f5f3ff' },
  { id: '9', code: 'DP-2026-0009', organ: 'Próstata', staining: 'Ki-67', colors: ['#f6dcc0', '#d09050', '#5c3313', '#b87840', '#7a4518'], bgColor: '#fffbeb' },
  { id: '10', code: 'DP-2026-0010', organ: 'Linfonodo', staining: 'HER2', colors: ['#c9e4f6', '#5098c0', '#173d5c', '#80b8d8', '#3870a0'], bgColor: '#eff6ff' },
  { id: '11', code: 'DP-2026-0011', organ: 'Pâncreas', staining: 'HE', colors: ['#f0c8dd', '#b8608a', '#5b1f57', '#d098b0', '#9a4068'], bgColor: '#fdf2f8' },
  { id: '12', code: 'DP-2026-0012', organ: 'Bexiga', staining: 'PAS', colors: ['#fde8e8', '#d05050', '#8b2020', '#e87878', '#b03838'], bgColor: '#fef2f2' },
]

const STAININGS = ['Todos', 'HE', 'Ki-67', 'HER2', 'PAS', 'Giemsa']

/* Miniatura SVG procedural para lâminas simuladas */
function SlideThumbnail({ colors, bgColor }: { colors: string[]; bgColor: string }) {
  const spots = colors.flatMap((color, ci) =>
    Array.from({ length: 6 }, (_, i) => ({
      cx: 15 + ((ci * 37 + i * 23) % 70),
      cy: 15 + ((ci * 29 + i * 41) % 70),
      r: 3 + ((ci + i * 7) % 8),
      color,
      opacity: 0.4 + ((ci + i) % 4) * 0.15,
    }))
  )

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ backgroundColor: bgColor }}>
      {spots.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={s.color} opacity={s.opacity} />
      ))}
    </svg>
  )
}

export default function SlideGallery() {
  const [filter, setFilter] = useState('Todos')
  const [selectedSlide, setSelectedSlide] = useState<SlideItem | null>(null)
  const [viewMode, setViewMode] = useState<'micro' | 'macro'>('micro')

  const filtered = filter === 'Todos'
    ? SLIDES
    : SLIDES.filter(s => s.staining === filter)

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <Filter className="w-4 h-4 text-[var(--color-text-muted)]" />
        {STAININGS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer
              ${filter === s
                ? 'bg-[var(--color-accent)] text-white shadow-xs'
                : 'bg-slate-100 text-[var(--color-text-muted)] hover:bg-slate-200'
              }
            `}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((slide) => (
          <div
            key={slide.id}
            onClick={() => {
              setSelectedSlide(slide)
              setViewMode('micro')
            }}
            className={`glass-card glass-card-hover overflow-hidden group cursor-pointer relative transition-all duration-300 ${
              slide.isReal ? 'ring-2 ring-sky-500/50 shadow-md hover:shadow-lg' : ''
            }`}
          >
            {slide.isReal && (
              <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 bg-sky-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                <Sparkles className="w-3 h-3" /> WSI Real
              </span>
            )}

            <div className="aspect-square overflow-hidden bg-slate-100 flex items-center justify-center relative">
              {slide.imageUrl ? (
                <img 
                  src={slide.imageUrl} 
                  alt={`Lâmina ${slide.code}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <SlideThumbnail colors={slide.colors} bgColor={slide.bgColor} />
              )}
              
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 bg-white/95 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Eye className="w-3.5 h-3.5 text-sky-600" /> Ver Detalhes
                </span>
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-center justify-between gap-1">
                <p className="text-xs font-mono font-bold text-[var(--color-text)] truncate">
                  {slide.code}
                </p>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                  {slide.staining}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1 truncate">
                {slide.organ}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[var(--color-text-muted)]">
          <p>Nenhuma lâmina encontrada com o filtro selecionado.</p>
        </div>
      )}

      {/* Modal Interativo de Detalhes da Lâmina */}
      {selectedSlide && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedSlide(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-xs">
                  <Microscope className="w-5 h-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 font-mono">
                      {selectedSlide.code}
                    </h3>
                    {selectedSlide.isReal ? (
                      <span className="bg-sky-100 text-sky-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-sky-200">
                        Lâmina WSI Real
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2 py-0.5 rounded-full">
                        Amostra Procedural
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    {selectedSlide.organ} • Coloração {selectedSlide.staining}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSlide(null)}
                className="h-9 w-9 rounded-xl hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Image Preview Container */}
              <div className="rounded-2xl border border-slate-200 bg-slate-950 overflow-hidden relative flex flex-col items-center justify-center min-h-[340px] max-h-[460px]">
                {selectedSlide.imageUrl ? (
                  <>
                    <img
                      src={viewMode === 'macro' && selectedSlide.macroUrl ? selectedSlide.macroUrl : selectedSlide.imageUrl}
                      alt={selectedSlide.code}
                      className="max-h-[420px] w-auto max-w-full object-contain mx-auto"
                    />

                    {selectedSlide.macroUrl && (
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md rounded-xl p-1 flex gap-1 border border-white/10 shadow-lg">
                        <button
                          type="button"
                          onClick={() => setViewMode('micro')}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                            viewMode === 'micro'
                              ? 'bg-sky-600 text-white shadow-xs'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          Visão Micro
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMode('macro')}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                            viewMode === 'macro'
                              ? 'bg-sky-600 text-white shadow-xs'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          Lâmina Inteira (Macro)
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-80 flex items-center justify-center bg-slate-900">
                    <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-inner">
                      <SlideThumbnail colors={selectedSlide.colors} bgColor={selectedSlide.bgColor} />
                    </div>
                  </div>
                )}
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Coloração
                  </span>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {selectedSlide.staining}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Órgão / Tecido
                  </span>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {selectedSlide.organ}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Governança
                  </span>
                  <p className="text-sm font-bold text-emerald-700 mt-0.5 flex items-center gap-1.5">
                    LGPD Anonimizado
                  </p>
                </div>
              </div>

              {selectedSlide.isReal && (
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-sky-600" /> Metadados do Scanner WSI (Aperio / 3DHISTECH)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs text-sky-950">
                    <div>
                      <span className="text-sky-700 block text-[11px]">Resolução Nativa:</span>
                      <strong className="font-mono">{selectedSlide.resolution}</strong>
                    </div>
                    <div>
                      <span className="text-sky-700 block text-[11px]">Magnificação Óptica:</span>
                      <strong className="font-mono">{selectedSlide.magnification}</strong>
                    </div>
                    <div>
                      <span className="text-sky-700 block text-[11px]">Microns por Pixel (MPP):</span>
                      <strong className="font-mono">{selectedSlide.mpp}</strong>
                    </div>
                  </div>
                  {selectedSlide.description && (
                    <p className="text-xs text-sky-800/90 pt-1 leading-relaxed border-t border-sky-200/60 mt-2">
                      {selectedSlide.description}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 text-center sm:text-left">
                Lâmina digitalizada em resolução gigapixel com total conformidade ética e regulatória.
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedSlide(null)}
                  className="w-full sm:w-auto px-5 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-xl transition-all cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
