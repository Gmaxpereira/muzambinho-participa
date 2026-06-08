interface StatProps {
  n: string
  l: string
}

export default function Stat({ n, l }: StatProps) {
  return (
    <div style={{ borderLeft: '2px solid var(--color-accent)', paddingLeft: 14 }}>
      <div
        className="font-display font-medium text-2xl lg:text-3xl leading-tight"
        style={{ color: 'var(--color-ink)' }}
      >
        {n}
      </div>
      <div className="text-xs leading-snug mt-1" style={{ color: 'var(--color-muted)' }}>
        {l}
      </div>
    </div>
  )
}
