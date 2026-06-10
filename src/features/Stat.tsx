import { useCountUp, parseCountUpValue } from '@/hooks/useCountUp'

interface StatProps {
  n: string
  l: string
}

export default function Stat({ n, l }: StatProps) {
  const { num, decimals, suffix } = parseCountUpValue(n)
  const { ref, display } = useCountUp(num, 1500, decimals)

  return (
    <div style={{ borderLeft: '2px solid var(--color-accent)', paddingLeft: 14 }}>
      <div
        ref={ref}
        className="font-display font-medium text-2xl lg:text-3xl leading-tight"
        style={{ color: 'var(--color-ink)' }}
      >
        {display}{suffix}
      </div>
      <div className="text-xs leading-snug mt-1" style={{ color: 'var(--color-muted)' }}>
        {l}
      </div>
    </div>
  )
}
