import { ChevronRight, Clock, AlertCircle, CheckCircle2, Heart } from 'lucide-react'
import { Trash2, Droplets, CloudRain } from 'lucide-react'
import type { Occurrence } from '@/types'
import { palette } from '@/lib/palette'

const categoryMeta = {
  d1: { color: palette.d1, icon: Trash2 },
  d2: { color: palette.d2, icon: Droplets },
  d3: { color: palette.d3, icon: CloudRain },
}

const statusMeta = {
  'Em análise':  { bg: '#FEF3C7', text: '#B45309', icon: Clock },
  'Encaminhado': { bg: '#DBEAFE', text: '#1D4ED8', icon: AlertCircle },
  'Resolvido':   { bg: '#DCFCE7', text: '#15803D', icon: CheckCircle2 },
}

interface OccurrenceRowProps {
  occ: Occurrence
  onClick: () => void
}

export default function OccurrenceRow({ occ, onClick }: OccurrenceRowProps) {
  const meta = categoryMeta[occ.type]
  const status = statusMeta[occ.status]
  const CatIcon = meta.icon
  const StatusIcon = status.icon

  return (
    <button onClick={onClick} className="w-full text-left flex items-start gap-3 group transition">
      {/* Mini-ícone espelhando o pin do mapa */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: meta.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        <CatIcon size={13} style={{ color: '#fff' }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate" style={{ color: palette.ink }}>
          {occ.title}
        </div>
        <div className="text-xs mt-1 flex items-center gap-2 flex-wrap">
          <span className="truncate" style={{ color: palette.muted }}>{occ.neighborhood}</span>
          {/* Badge de status */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
              background: status.bg,
              color: status.text,
              borderRadius: 999,
              padding: '2px 7px',
              fontSize: 10,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <StatusIcon size={9} />
            {occ.status}
          </span>

          {/* Badge de apoios */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
              color: palette.muted,
              fontSize: 10,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            <Heart size={9} />
            {occ.supporters ?? 0}
          </span>
        </div>
      </div>

      <ChevronRight
        size={14}
        className="opacity-0 group-hover:opacity-100 transition"
        style={{ color: palette.muted, marginTop: 6, flexShrink: 0 }}
      />
    </button>
  )
}
