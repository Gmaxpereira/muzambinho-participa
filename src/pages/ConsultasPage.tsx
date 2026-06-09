import { useState, useEffect } from 'react'
import { motion, type Variants } from 'motion/react'
import type { Consultation } from '@/types'
import { getConsultations, getVotes } from '@/mocks/consultations'
import ConsultationRow from '@/features/ConsultationRow'
import VoteDialog from '@/features/VoteDialog'
import { Skeleton } from '@/components/ui/Skeleton'
import { palette } from '@/lib/palette'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

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
        <motion.div
          className="lg:col-span-4"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: palette.muted }}
          >
            Consultas abertas
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-3xl lg:text-4xl font-medium mb-6"
            style={{ color: palette.ink }}
          >
            Sua voz, no degrau da{' '}
            <em style={{ color: palette.accent, fontStyle: 'italic' }}>colaboração.</em>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed mb-8"
            style={{ color: palette.inkSoft }}
          >
            Inspirada na escada de Arnstein (1969), a ferramenta opera nos níveis
            de informação, consulta e colaboração — em que o cidadão coproduz
            dados que alimentam diretamente o Plano Diretor de Drenagem.
          </motion.p>

          {/* Contador de consultas */}
          <motion.div variants={fadeUp}>
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
          </motion.div>
        </motion.div>

        {/* Lista de consultas — 8 cols */}
        <div
          className="lg:col-span-8 space-y-3"
          role="status"
          aria-live="polite"
          aria-label={consultations.length === 0 ? 'Carregando consultas' : 'Consultas carregadas'}
        >
          {consultations.length === 0
            ? [1, 2, 3, 4].map(i => (
                <Skeleton
                  key={i}
                  style={{
                    height: 84,
                    width: '100%',
                    borderRadius: 4,
                  }}
                />
              ))
            : consultations.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: i * 0.06 }}
                >
                  <ConsultationRow
                    consultation={c}
                    voted={votedIds.has(c.id)}
                    onClick={() => setActiveId(c.id)}
                  />
                </motion.div>
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
