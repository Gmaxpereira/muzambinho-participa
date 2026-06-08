import { Vote, Clock, Users } from 'lucide-react'
import type { Consultation } from '@/types'
import { palette } from '@/lib/palette'

interface ConsultationRowProps {
  consultation: Consultation
  voted: boolean
  onClick: () => void
}

export default function ConsultationRow({ consultation, voted, onClick }: ConsultationRowProps) {
  return (
    <div
      className="p-6 flex items-center gap-6 transition hover:shadow-sm"
      style={{
        background: palette.surface,
        border: `1px solid ${palette.line}`,
        borderRadius: 4,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          background: `${palette.accent}1A`,
          color: palette.accent,
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Vote size={18} />
      </div>

      <div className="flex-1 min-w-0">
        <div
          className="font-display text-lg font-medium leading-tight mb-1"
          style={{ color: palette.ink }}
        >
          {consultation.title}
        </div>
        <div className="text-xs flex items-center gap-3" style={{ color: palette.muted }}>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {consultation.deadline}
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} />
            {consultation.votes} participações
          </span>
        </div>
      </div>

      <button
        onClick={voted ? undefined : onClick}
        disabled={voted}
        className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition"
        style={{
          background: voted ? 'transparent' : palette.ink,
          color: voted ? palette.muted : palette.surface,
          border: voted ? `1px solid ${palette.line}` : 'none',
          cursor: voted ? 'default' : 'pointer',
          opacity: voted ? 0.7 : 1,
        }}
      >
        {voted ? 'Votado ✓' : 'Participar'}
      </button>
    </div>
  )
}
