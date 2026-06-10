import type { LucideIcon } from 'lucide-react'

interface ChallengeCardProps {
  code: string
  title: string
  desc: string
  icon: LucideIcon
  color: string
}

export default function ChallengeCard({ code, title, desc, icon: Icon, color }: ChallengeCardProps) {
  return (
    <div
      className="p-8 transition-colors"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-line)', borderRadius: 4 }}
    >
      <div className="flex items-start justify-between mb-6">
        <div
          style={{
            width: 44,
            height: 44,
            background: color,
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={20} color="#fff" />
        </div>
        <div
          className="font-mono text-xs tracking-widest"
          style={{ color }}
        >
          {code}
        </div>
      </div>
      <div
        className="font-display text-2xl font-medium mb-3"
        style={{ color: 'var(--color-ink)' }}
      >
        {title}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-soft)' }}>
        {desc}
      </p>
    </div>
  )
}
