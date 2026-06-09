import { palette } from '@/lib/palette'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  style?: React.CSSProperties
}

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Carregando..."
      className={cn('animate-pulse rounded', className)}
      style={{ background: palette.line, ...style }}
    />
  )
}
