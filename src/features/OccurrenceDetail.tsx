import { X, Clock, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Trash2, Droplets, CloudRain } from 'lucide-react'
import type { Occurrence } from '@/types'
import { palette } from '@/lib/palette'

const categoryMeta = {
  d1: { label: 'Resíduos Sólidos (D1)', color: palette.d1, icon: Trash2 },
  d2: { label: 'Esgoto e Água (D2)', color: palette.d2, icon: Droplets },
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
}

export default function OccurrenceDetail({ occ, onClose }: OccurrenceDetailProps) {
  const meta = categoryMeta[occ.type]
  const status = statusMeta[occ.status]
  const CatIcon = meta.icon
  const StatusIcon = status.icon

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
        {/* Badge de status */}
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
        className="w-full mt-4 py-2.5 rounded text-xs font-medium tracking-wider uppercase"
        style={{ background: palette.ink, color: palette.surface }}
      >
        Apoiar ocorrência
      </button>
    </div>
  )
}
