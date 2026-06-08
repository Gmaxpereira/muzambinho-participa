import { TrendingUp } from 'lucide-react'

interface KPICardProps {
  label: string
  value: string
  delta: string
  iso: string
}

export default function KPICard({ label, value, delta, iso }: KPICardProps) {
  return (
    <div
      className="p-6 rounded"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="font-mono text-[10px] tracking-widest uppercase mb-3 opacity-70"
        style={{ color: 'var(--color-surface)' }}
      >
        {label}
      </div>
      <div
        className="font-display text-5xl font-medium mb-2"
        style={{ color: 'var(--color-surface)' }}
      >
        {value}
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5" style={{ color: 'var(--color-d1)' }}>
          <TrendingUp size={12} />
          {delta}
        </div>
        <div
          className="font-mono opacity-50"
          style={{ color: 'var(--color-surface)' }}
        >
          {iso}
        </div>
      </div>
    </div>
  )
}
