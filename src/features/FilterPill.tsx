import { palette } from '@/lib/palette'

interface FilterPillProps {
  active: boolean
  onClick: () => void
  label: string
  color?: string
}

export default function FilterPill({ active, onClick, label, color }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1.5 rounded-full text-xs font-medium transition border whitespace-nowrap"
      style={{
        background: active ? palette.ink : 'transparent',
        color: active ? palette.surface : palette.inkSoft,
        borderColor: active ? palette.ink : palette.line,
      }}
    >
      {color && (
        <span
          style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            background: color,
            borderRadius: 999,
            marginRight: 6,
            verticalAlign: 'middle',
          }}
        />
      )}
      {label}
    </button>
  )
}
