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
  { id: 6, label: 'Parceria',           zone: 'power', highlight: 'accent',  badge: 'Mapeamento colaborativo', Icon: Map,          isPrimary: true },
  { id: 5, label: 'Pacificação',        zone: 'token' },
  { id: 4, label: 'Consulta',           zone: 'token', highlight: 'primary', badge: 'Enquetes e audiências',   Icon: ClipboardList },
  { id: 3, label: 'Informação',         zone: 'token', highlight: 'primary', badge: 'Painel de transparência', Icon: BarChart2 },
  { id: 2, label: 'Terapia',            zone: 'none' },
  { id: 1, label: 'Manipulação',        zone: 'none' },
]

const zoneConfig: Record<Zone, { bg: string; bar: string; label: string; labelColor: string }> = {
  power: { bg: `${palette.primary}38`, bar: palette.primary,     label: 'Poder cidadão',    labelColor: palette.primarySoft },
  token: { bg: `${palette.d1}38`,      bar: palette.d1,          label: 'Tokenismo',        labelColor: palette.d1          },
  none:  { bg: `${palette.muted}28`,   bar: palette.muted,       label: 'Não participação', labelColor: palette.muted       },
}

const hlConfig: Record<Highlight, { bg: string; bar: string; color: string }> = {
  primary: { bg: `${palette.primary}50`, bar: palette.primary, color: palette.primary },
  accent:  { bg: `${palette.accent}50`,  bar: palette.accent,  color: palette.accent  },
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
            {/* Zone header */}
            {zoneChanged && (
              <div
                style={{
                  paddingLeft: indent,
                  marginBottom: 5,
                  marginTop: i === 0 ? 0 : 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 20,
                    height: 2,
                    background: zone.labelColor,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: zone.labelColor,
                    fontWeight: 600,
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
                padding: rung.isPrimary ? '14px 18px' : rung.highlight ? '11px 16px' : '9px 14px',
                background: hl ? hl.bg : zone.bg,
                borderLeft: `${rung.isPrimary ? 5 : 3}px solid ${hl ? hl.bar : zone.bar}`,
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: hl ? hl.color : zone.bar,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {rung.id}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: rung.isPrimary ? 19 : rung.highlight ? 17 : 15,
                    fontWeight: rung.isPrimary ? 700 : rung.highlight ? 600 : 500,
                    color: hl ? hl.color : palette.inkSoft,
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
                    gap: 6,
                    background: `${hl.color}22`,
                    border: `1px solid ${hl.color}70`,
                    borderRadius: 99,
                    padding: rung.isPrimary ? '5px 14px' : '4px 11px',
                    flexShrink: 0,
                  }}
                >
                  <rung.Icon size={rung.isPrimary ? 13 : 12} style={{ color: hl.color, flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: rung.isPrimary ? 13 : 12,
                      fontWeight: rung.isPrimary ? 600 : 500,
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
          fontSize: 12,
          color: palette.muted,
          textAlign: 'right',
          marginTop: 12,
          letterSpacing: '0.04em',
        }}
      >
        Adaptado de ARNSTEIN, 1969.
      </p>
    </div>
  )
}
