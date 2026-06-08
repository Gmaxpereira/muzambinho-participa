import { ChevronRight, Clock, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Trash2, Droplets, CloudRain } from 'lucide-react'
import type { Occurrence } from '@/types'
import { palette } from '@/lib/palette'

const categoryMeta = {
  d1: { color: palette.d1, icon: Trash2 },
  d2: { color: palette.d2, icon: Droplets },
  d3: { color: palette.d3, icon: CloudRain },
}

const statusMeta = {
  'Em análise': { color: palette.muted, icon: Clock },
  'Encaminhado': { color: palette.d2, icon: AlertCircle },
  'Resolvido': { color: palette.primary, icon: CheckCircle2 },
}

interface OccurrenceRowProps {
  occ: Occurrence
  onClick: () => void
}

export default function OccurrenceRow({ occ, onClick }: OccurrenceRowProps) {
  const meta = categoryMeta[occ.type]
  const status = statusMeta[occ.status]
  const StatusIcon = status.icon

  return (
    <button onClick={onClick} className="w-full text-left flex items-start gap-3 group transition">
      <div
        style={{
          width: 6,
          height: 6,
          background: meta.color,
          borderRadius: 999,
          marginTop: 7,
          flexShrink: 0,
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate" style={{ color: palette.ink }}>
          {occ.title}
        </div>
        <div className="text-xs mt-0.5 flex items-center gap-2" style={{ color: palette.muted }}>
          <span className="truncate">{occ.neighborhood}</span>
          <span>·</span>
          <span className="flex items-center gap-1" style={{ color: status.color }}>
            <StatusIcon size={10} />
            {occ.status}
          </span>
        </div>
      </div>
      <ChevronRight
        size={14}
        className="opacity-0 group-hover:opacity-100 transition"
        style={{ color: palette.muted, marginTop: 4 }}
      />
    </button>
  )
}
