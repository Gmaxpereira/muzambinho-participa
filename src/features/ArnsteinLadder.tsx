import { BarChart2, ClipboardList, Map } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { palette } from '@/lib/palette'

type Zone = 'none' | 'token' | 'power'
type Highlight = 'primary' | 'accent'

interface Rung {
  id: number
  label: string
  zone: Zone
  highlight?: Highlight
  badge?: string
  Icon?: LucideIcon
  isPrimary?: boolean
}

const rungs: Rung[] = [
  { id: 8, label: 'Controle cidadão',   zone: 'power' },
  { id: 7, label: 'Delegação de poder', zone: 'power' },
  { id: 6, label: 'Parceria',           zone: 'power', highlight: 'accent',   badge: 'Mapeamento colaborativo', Icon: Map,          isPrimary: true },
  { id: 5, label: 'Pacificação',        zone: 'token' },
  { id: 4, label: 'Consulta',           zone: 'token', highlight: 'primary',  badge: 'Enquetes e audiências',   Icon: ClipboardList },
  { id: 3, label: 'Informação',         zone: 'token', highlight: 'primary',  badge: 'Painel de transparência', Icon: BarChart2 },
  { id: 2, label: 'Terapia',            zone: 'none' },
  { id: 1, label: 'Manipulação',        zone: 'none' },
]

const zoneConfig: Record<Zone, { bg: string; bar: string; label: string; labelColor: string }> = {
  power: { bg: `${palette.primary}12`, bar: `${palette.primary}90`, label: 'Poder cidadão',    labelColor: palette.primarySoft },
  token: { bg: `${palette.d1}12`,      bar: `${palette.d1}80`,      label: 'Tokenismo',        labelColor: palette.d1          },
  none:  { bg: `${palette.muted}10`,   bar: `${palette.muted}40`,   label: 'Não participação', labelColor: palette.muted       },
}

const hlConfig: Record<Highlight, { bg: string; bar: string; color: string }> = {
  primary: { bg: `${palette.primary}18`, bar: palette.primary, color: palette.primary },
  accent:  { bg: `${palette.accent}18`,  bar: palette.accent,  color: palette.accent  },
}

const STEP = 8

export default function ArnsteinLadder() {
  return (
    <div>
      {rungs.map((rung, i) => {
        const prev = rungs[i - 1]
        const zoneChanged = !prev || prev.zone !== rung.zone
        const zone = zoneConfig[rung.zone]
        const hl = rung.highlight ? hlConfig[rung.highlight] : null
        const indent = (rung.id - 1) * STEP

        return (
          <div key={rung.id}>
            {/* Zone header — shown at the first rung of each zone group */}
            {zoneChanged && (
              <div
                style={{
                  paddingLeft: indent,
                  marginBottom: 4,
                  marginTop: i === 0 ? 0 : 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 18,
                    height: 1.5,
                    background: zone.labelColor,
                    opacity: 0.7,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: zone.labelColor,
                  }}
                >
                  {zone.label}
                </span>
              </div>
            )}

            {/* Rung row */}
            <div
              style={{
                marginLeft: indent,
                marginBottom: 3,
                padding: rung.isPrimary ? '13px 16px' : rung.highlight ? '10px 14px' : '8px 12px',
                background: hl ? hl.bg : zone.bg,
                borderLeft: `${rung.isPrimary ? 4 : 3}px solid ${hl ? hl.bar : zone.bar}`,
                borderRadius: '0 4px 4px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                flexWrap: 'wrap',
                rowGap: 6,
              }}
            >
              {/* Left: number badge + label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: hl ? hl.color : zone.labelColor,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    fontWeight: 700,
                    flexShrink: 0,
                    opacity: hl ? 1 : 0.45,
                  }}
                >
                  {rung.id}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: rung.isPrimary ? 17 : rung.highlight ? 15 : 13,
                    fontWeight: rung.isPrimary ? 700 : rung.highlight ? 600 : 400,
                    color: hl ? hl.color : palette.muted,
                    lineHeight: 1.2,
                  }}
                >
                  {rung.label}
                </span>
              </div>

              {/* Right: platform feature badge */}
              {rung.badge && rung.Icon && hl && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    background: `${hl.color}14`,
                    border: `1px solid ${hl.color}40`,
                    borderRadius: 99,
                    padding: rung.isPrimary ? '4px 12px' : '3px 10px',
                    flexShrink: 0,
                  }}
                >
                  <rung.Icon size={rung.isPrimary ? 12 : 10} style={{ color: hl.color, flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: rung.isPrimary ? 12 : 11,
                      fontWeight: rung.isPrimary ? 500 : 400,
                      color: hl.color,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {rung.badge}
                  </span>
                </div>
              )}
            </div>
          </div>
        )
      })}

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: palette.muted,
          textAlign: 'right',
          marginTop: 10,
          letterSpacing: '0.04em',
          opacity: 0.65,
        }}
      >
        Adaptado de ARNSTEIN, 1969.
      </p>
    </div>
  )
}
