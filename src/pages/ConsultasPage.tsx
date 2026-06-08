import { useState, useEffect } from 'react'
import type { Consultation } from '@/types'
import { getConsultations, getVotes } from '@/mocks/consultations'
import ConsultationRow from '@/features/ConsultationRow'
import VoteDialog from '@/features/VoteDialog'
import { palette } from '@/lib/palette'

export default function ConsultasPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [activeId, setActiveId] = useState<number | null>(null)
  const [votedIds, setVotedIds] = useState<Set<number>>(new Set())

  useEffect(() => {
    getConsultations().then(setConsultations)
    const stored = getVotes()
    setVotedIds(new Set(Object.keys(stored).map(Number)))
  }, [])

  function handleVoted(consultationId: number, optionId: string) {
    setVotedIds(prev => new Set([...prev, consultationId]))
    setConsultations(prev =>
      prev.map(c => {
        if (c.id !== consultationId) return c
        return {
          ...c,
          votes: c.votes + 1,
          options: c.options?.map(o =>
            o.id === optionId ? { ...o, votes: o.votes + 1 } : o,
          ),
        }
      }),
    )
  }

  const activeConsultation = consultations.find(c => c.id === activeId) ?? null

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
      <div className="grid lg:grid-cols-12 gap-10">

        {/* Coluna editorial — 4 cols */}
        <div className="lg:col-span-4">
          <div
            className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: palette.muted }}
          >
            Consultas abertas
          </div>
          <h1
            className="font-display text-3xl lg:text-4xl font-medium mb-6"
            style={{ color: palette.ink }}
          >
            Sua voz, no degrau da{' '}
            <em style={{ color: palette.accent, fontStyle: 'italic' }}>colaboração.</em>
          </h1>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: palette.inkSoft }}
          >
            Inspirada na escada de Arnstein (1969), a ferramenta opera nos níveis
            de informação, consulta e colaboração — em que o cidadão coproduz
            dados que alimentam diretamente o Plano Diretor de Drenagem.
          </p>

          {/* Contador de consultas */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono"
            style={{
              background: `${palette.accent}12`,
              color: palette.accent,
              border: `1px solid ${palette.accent}30`,
            }}
          >
            {consultations.length} consultas abertas · {votedIds.size} respondidas
          </div>
        </div>

        {/* Lista de consultas — 8 cols */}
        <div className="lg:col-span-8 space-y-3">
          {consultations.length === 0
            ? [1, 2, 3].map(i => (
                <div
                  key={i}
                  className="animate-pulse p-6 rounded"
                  style={{
                    background: palette.surface,
                    border: `1px solid ${palette.line}`,
                    height: 84,
                  }}
                />
              ))
            : consultations.map(c => (
                <ConsultationRow
                  key={c.id}
                  consultation={c}
                  voted={votedIds.has(c.id)}
                  onClick={() => setActiveId(c.id)}
                />
              ))
          }
        </div>
      </div>

      <VoteDialog
        consultation={activeConsultation}
        open={activeId !== null}
        onClose={() => setActiveId(null)}
        onVoted={handleVoted}
      />
    </section>
  )
}
