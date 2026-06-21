import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { X, MapPin, Heart, ClipboardList, ArrowRight } from 'lucide-react'
import { getOccurrences, getMyOccurrenceIds, getSupportedIds } from '@/mocks'
import { getVotes } from '@/mocks/consultations'
import { palette } from '@/lib/palette'
import type { Occurrence } from '@/types'

const categoryLabel = { d1: 'Resíduos', d2: 'Esgoto', d3: 'Drenagem' }
const categoryColor  = { d1: palette.d1, d2: palette.d2, d3: palette.d3 }

function motivational(total: number): { text: string; bg: string; color: string } {
  if (total === 0) return {
    text: 'Comece sua participação! Registre uma ocorrência ou vote em uma consulta.',
    bg: `${palette.line}`,
    color: palette.muted,
  }
  if (total <= 3) return {
    text: 'Bom começo! Sua voz já está ajudando a transformar Muzambinho.',
    bg: `${palette.d1}18`,
    color: palette.d1,
  }
  return {
    text: 'Cidadão engajado! Obrigado por construir uma cidade melhor.',
    bg: `${palette.primary}15`,
    color: palette.primary,
  }
}

interface Props {
  open: boolean
  onClose: () => void
}

export default function MyParticipationPanel({ open, onClose }: Props) {
  const [myOccurrences, setMyOccurrences] = useState<Occurrence[]>([])
  const [myOccCount, setMyOccCount]       = useState(0)
  const [supportCount, setSupportCount]   = useState(0)
  const [voteCount, setVoteCount]         = useState(0)
  const [loading, setLoading]             = useState(false)

  useEffect(() => {
    if (!open) return
    const ids       = getMyOccurrenceIds()
    const supports  = getSupportedIds().length
    const votes     = Object.keys(getVotes()).length

    setMyOccCount(ids.length)
    setSupportCount(supports)
    setVoteCount(votes)

    setLoading(true)
    getOccurrences().then(all => {
      setMyOccurrences(all.filter(o => ids.includes(o.id)).slice(0, 5))
      setLoading(false)
    })
  }, [open])

  const total = myOccCount + supportCount + voteCount
  const { text, bg, color } = motivational(total)

  const stats = [
    { label: 'Ocorrências\nregistradas', value: myOccCount,   icon: MapPin,       color: palette.accent },
    { label: 'Apoios\ndados',            value: supportCount,  icon: Heart,        color: palette.d1     },
    { label: 'Consultas\nrespondidas',   value: voteCount,     icon: ClipboardList, color: palette.d2    },
  ]

  return (
    <Dialog.Root open={open} onOpenChange={v => { if (!v) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-[1500] fade-in"
          style={{ background: 'rgba(31,36,25,0.55)' }}
        />
        <Dialog.Content
          className="fixed z-[1500] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md p-6 sm:p-8 fade-in overflow-y-auto max-h-[90vh]"
          style={{
            background: palette.surface,
            borderRadius: 4,
            border: `1px solid ${palette.line}`,
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div
                className="font-mono text-xs tracking-widest uppercase mb-2"
                style={{ color: palette.muted }}
              >
                Participação local · anônima
              </div>
              <Dialog.Title
                className="font-display text-2xl font-medium"
                style={{ color: palette.ink }}
              >
                Minha participação
              </Dialog.Title>
            </div>
            <Dialog.Close className="ml-4 flex-shrink-0" aria-label="Fechar">
              <X size={18} style={{ color: palette.muted }} />
            </Dialog.Close>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {stats.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center py-5 px-2"
                style={{
                  background: palette.accent,
                  border: `2px solid #fff`,
                  borderRadius: 4,
                }}
              >
                <Icon size={26} style={{ color: '#fff', marginBottom: 10, flexShrink: 0 }} />
                <div
                  className="font-display font-medium"
                  style={{ fontSize: 38, lineHeight: 1, color: '#fff' }}
                >
                  {value}
                </div>
                <div
                  className="font-mono mt-2 whitespace-pre-line text-center font-bold"
                  style={{ fontSize: 11, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.4 }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Motivacional */}
          <div
            className="px-4 py-3 rounded mb-6 text-sm leading-snug"
            style={{
              background: bg,
              color,
              border: `1px solid ${color}30`,
            }}
          >
            {text}
          </div>

          {/* Minhas ocorrências */}
          {myOccCount > 0 && (
            <div>
              <div
                className="font-mono text-sm tracking-wider uppercase mb-3 font-bold"
                style={{ color: palette.accent }}
              >
                Minhas últimas ocorrências
              </div>

              {loading ? (
                <div className="space-y-2">
                  {[1, 2].map(i => (
                    <div
                      key={i}
                      style={{ height: 54, background: palette.line, borderRadius: 4, opacity: 0.4 }}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {myOccurrences.map(occ => (
                    <Link
                      key={occ.id}
                      to="/mapa"
                      onClick={onClose}
                      className="flex items-center justify-between p-3 rounded no-underline group transition hover:opacity-80"
                      style={{
                        background: palette.paper,
                        borderLeft: `4px solid ${categoryColor[occ.type]}`,
                        border: `1px solid ${palette.line}`,
                        borderLeftWidth: 4,
                        borderLeftColor: categoryColor[occ.type],
                      }}
                    >
                      <div className="min-w-0 flex-1">
                        <div
                          className="text-base font-semibold truncate"
                          style={{ color: palette.ink }}
                        >
                          {occ.title}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="font-mono font-bold"
                            style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: categoryColor[occ.type] }}
                          >
                            {categoryLabel[occ.type]}
                          </span>
                          <span style={{ fontSize: 13, color: palette.muted }}>
                            {occ.neighborhood} · {occ.date}
                          </span>
                        </div>
                      </div>
                      <ArrowRight
                        size={15}
                        style={{ color: palette.muted, flexShrink: 0, marginLeft: 8 }}
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Rodapé anônimo */}
          <p
            className="font-mono mt-6 text-center"
            style={{ fontSize: 10, color: palette.muted, letterSpacing: '0.05em', opacity: 0.7 }}
          >
            Dados armazenados apenas neste navegador · sem cadastro
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
