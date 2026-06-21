import { useState } from 'react'
import { X, Clock, AlertCircle, CheckCircle2, Heart, Send, ArrowRight, MapPin } from 'lucide-react'
import { Trash2, Droplets, CloudRain } from 'lucide-react'
import { toast } from 'sonner'
import type { Occurrence, TimelineEventType } from '@/types'
import { supportOccurrence, getSupportedIds } from '@/mocks'
import { palette } from '@/lib/palette'

const timelineMeta: Record<TimelineEventType, { icon: React.ElementType; color: string }> = {
  registered: { icon: Send,          color: palette.muted },
  supported:  { icon: Heart,         color: '#B8893C'     },
  forwarded:  { icon: ArrowRight,    color: '#2E5B7E'     },
  visited:    { icon: MapPin,        color: palette.primary },
  resolved:   { icon: CheckCircle2,  color: '#15803D'     },
}

const categoryMeta = {
  d1: { label: 'Resíduos Sólidos (D1)', color: palette.d1, icon: Trash2 },
  d2: { label: 'Esgoto e Água (D2)',    color: palette.d2, icon: Droplets },
  d3: { label: 'Drenagem Urbana (D3)', color: palette.d3, icon: CloudRain },
}

const statusMeta = {
  'Em análise':  { bg: '#FEF3C7', text: '#B45309', icon: Clock },
  'Encaminhado': { bg: '#DBEAFE', text: '#1D4ED8', icon: AlertCircle },
  'Resolvido':   { bg: '#DCFCE7', text: '#15803D', icon: CheckCircle2 },
}

interface OccurrenceDetailProps {
  occ: Occurrence
  onClose: () => void
  onSupport?: (id: number, newCount: number) => void
}

export default function OccurrenceDetail({ occ, onClose, onSupport }: OccurrenceDetailProps) {
  const meta = categoryMeta[occ.type]
  const status = statusMeta[occ.status]
  const CatIcon = meta.icon
  const StatusIcon = status.icon

  const [supported, setSupported] = useState(() => getSupportedIds().includes(occ.id))
  const [count, setCount] = useState(occ.supporters ?? 0)
  const [loading, setLoading] = useState(false)

  async function handleSupport() {
    if (supported || loading) return
    setLoading(true)
    try {
      const newCount = await supportOccurrence(occ.id)
      setCount(newCount)
      setSupported(true)
      onSupport?.(occ.id, newCount)
      toast.success('Apoio registrado! Quanto mais apoios, maior a prioridade.')
    } catch {
      toast.error('Erro ao registrar apoio. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fade-in">
      <div className="flex items-start justify-between mb-4">
        <div
          style={{
            background: meta.color,
            color: '#fff',
            padding: '4px 10px',
            borderRadius: 4,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <CatIcon size={12} />
          {meta.label}
        </div>
        <button onClick={onClose} aria-label="Fechar detalhe">
          <X size={16} style={{ color: palette.muted }} />
        </button>
      </div>

      <h3
        className="font-display text-xl font-medium leading-tight mb-2"
        style={{ color: palette.ink }}
      >
        {occ.title}
      </h3>

      <div className="text-sm mb-4" style={{ color: palette.inkSoft }}>
        {occ.neighborhood}
      </div>

      <div
        className="flex items-center justify-between py-3"
        style={{
          borderTop: `1px solid ${palette.line}`,
          borderBottom: `1px solid ${palette.line}`,
        }}
      >
        <div className="text-xs" style={{ color: palette.muted }}>
          Reportado {occ.date}
        </div>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: status.bg,
            color: status.text,
            borderRadius: 999,
            padding: '3px 9px',
            fontSize: 11,
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          <StatusIcon size={11} />
          {occ.status}
        </span>
      </div>

      <button
        onClick={handleSupport}
        disabled={supported || loading}
        className="w-full mt-4 py-2.5 rounded text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 transition"
        style={{
          background: supported ? palette.primary : palette.ink,
          color: palette.surface,
          cursor: supported ? 'default' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}
      >
        <Heart
          size={13}
          fill={supported ? 'currentColor' : 'none'}
          style={{ flexShrink: 0 }}
        />
        {supported
          ? `Você apoiou · ${count} apoio${count !== 1 ? 's' : ''}`
          : loading
            ? 'Registrando...'
            : `Apoiar ocorrência · ${count} apoio${count !== 1 ? 's' : ''}`
        }
      </button>

      {/* Timeline */}
      {occ.timeline && occ.timeline.length > 0 && (
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${palette.line}` }}>
          <div
            className="font-mono text-sm tracking-wider uppercase mb-4 font-bold"
            style={{ color: palette.accent }}
          >
            Histórico
          </div>

          <div style={{ position: 'relative', paddingLeft: 28 }}>
            {/* Linha vertical */}
            <div
              style={{
                position: 'absolute',
                left: 9,
                top: 9,
                bottom: 9,
                width: 1,
                background: palette.line,
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {occ.timeline.map((event, i) => {
                const { icon: Icon, color } = timelineMeta[event.type]
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    {/* Bolinha */}
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 1,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <Icon size={11} color="#fff" strokeWidth={2.5} />
                    </div>

                    {/* Texto */}
                    <div>
                      <div
                        className="text-sm font-semibold leading-snug"
                        style={{ color: palette.ink }}
                      >
                        {event.label}
                      </div>
                      <div
                        className="font-mono text-xs"
                        style={{ color: palette.muted, marginTop: 2 }}
                      >
                        {event.date}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
