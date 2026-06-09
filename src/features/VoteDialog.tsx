import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import type { Consultation } from '@/types'
import { getVotes, saveVote } from '@/mocks/consultations'
import { palette } from '@/lib/palette'

interface VoteDialogProps {
  consultation: Consultation | null
  open: boolean
  onClose: () => void
  onVoted: (consultationId: number, optionId: string) => void
}

export default function VoteDialog({ consultation, open, onClose, onVoted }: VoteDialogProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!consultation) return
    const votes = getVotes()
    const saved = votes[consultation.id]
    if (saved) {
      setSelected(saved)
      setSubmitted(true)
    } else {
      setSelected(null)
      setSubmitted(false)
    }
  }, [consultation])

  function handleSubmit() {
    if (!consultation || !selected) return
    saveVote(consultation.id, selected)
    onVoted(consultation.id, selected)
    setSubmitted(true)
    toast.success('Voto computado com sucesso!')
  }

  function handleOpenChange(val: boolean) {
    if (!val) onClose()
  }

  const options = consultation?.options ?? []
  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0) + (submitted && !getVotes()[consultation?.id ?? -1] ? 0 : 0)

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 fade-in"
          style={{ background: 'rgba(31,36,25,0.55)' }}
        />
        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-lg p-6 sm:p-8 fade-in overflow-y-auto max-h-[90vh]"
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
                className="font-mono text-[10px] tracking-widest uppercase mb-2"
                style={{ color: palette.accent }}
              >
                Consulta pública
              </div>
              <Dialog.Title
                className="font-display text-xl font-medium leading-snug"
                style={{ color: palette.ink }}
              >
                {consultation?.title}
              </Dialog.Title>
            </div>
            <Dialog.Close className="ml-4 flex-shrink-0" aria-label="Fechar consulta">
              <X size={18} style={{ color: palette.muted }} />
            </Dialog.Close>
          </div>

          {submitted ? (
            /* ── Pós-voto ── */
            <div className="fade-in">
              <div
                className="flex items-center gap-2 mb-6 px-4 py-3 rounded"
                style={{ background: `${palette.primary}1A`, color: palette.primary }}
              >
                <CheckCircle2 size={16} />
                <span className="text-sm font-medium">Voto registrado com sucesso</span>
              </div>

              <div className="space-y-3">
                {options.map(opt => {
                  const isChosen = opt.id === selected
                  const total = options.reduce((s, o) => s + o.votes, 0)
                  const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0

                  return (
                    <div key={opt.id}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span
                          style={{
                            color: isChosen ? palette.primary : palette.inkSoft,
                            fontWeight: isChosen ? 600 : 400,
                          }}
                        >
                          {opt.label}
                          {isChosen && ' ✓'}
                        </span>
                        <span className="font-mono text-xs" style={{ color: palette.muted }}>
                          {pct}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: 6,
                          background: palette.line,
                          borderRadius: 3,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${pct}%`,
                            background: isChosen ? palette.primary : palette.muted,
                            borderRadius: 3,
                            transition: 'width 0.6s ease',
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 text-xs text-center" style={{ color: palette.muted }}>
                {totalVotes > 0 ? `${totalVotes} participações` : `${consultation?.votes ?? 0} participações`}
              </div>

              <button
                onClick={onClose}
                className="w-full mt-6 py-3 rounded text-sm font-medium tracking-wider uppercase"
                style={{ background: palette.ink, color: palette.surface }}
              >
                Fechar
              </button>
            </div>
          ) : (
            /* ── Votação ── */
            <div>
              <div className="space-y-2 mb-6">
                {options.map(opt => {
                  const isSelected = selected === opt.id
                  return (
                    <label
                      key={opt.id}
                      className="flex items-center gap-3 p-4 rounded cursor-pointer transition"
                      style={{
                        border: `1px solid ${isSelected ? palette.primary : palette.line}`,
                        background: isSelected ? `${palette.primary}08` : 'transparent',
                      }}
                    >
                      <input
                        type="radio"
                        name={`vote-${consultation?.id}`}
                        value={opt.id}
                        checked={isSelected}
                        onChange={() => setSelected(opt.id)}
                        className="sr-only"
                      />
                      {/* Custom radio indicator */}
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          border: `2px solid ${isSelected ? palette.primary : palette.line}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'border-color 0.15s',
                        }}
                      >
                        {isSelected && (
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: palette.primary,
                            }}
                          />
                        )}
                      </div>
                      <span className="text-sm" style={{ color: palette.ink }}>
                        {opt.label}
                      </span>
                    </label>
                  )
                })}
              </div>

              <button
                onClick={handleSubmit}
                disabled={!selected}
                className="w-full py-3 rounded text-sm font-medium tracking-wider uppercase transition hover:opacity-90 disabled:opacity-40"
                style={{ background: palette.accent, color: palette.surface }}
              >
                Registrar voto
              </button>

              <p className="text-[10px] mt-3 text-center" style={{ color: palette.muted }}>
                Sua participação alimenta as decisões do Plano Diretor de Drenagem.
              </p>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
