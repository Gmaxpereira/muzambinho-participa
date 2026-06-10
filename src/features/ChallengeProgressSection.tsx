import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Trash2, Droplets, CloudRain } from 'lucide-react'
import type { ChallengeProgressData } from '@/types'
import { getChallengeProgress } from '@/mocks'
import { palette } from '@/lib/palette'

const categoryMeta = {
  d1: { title: 'Resíduos Sólidos',  icon: Trash2,    color: palette.d1 },
  d2: { title: 'Esgoto e Água',     icon: Droplets,  color: palette.d2 },
  d3: { title: 'Drenagem Urbana',   icon: CloudRain, color: palette.d3 },
}

function formatCurrent(current: number, unit: 'pontos' | '%'): string {
  if (unit === '%') return current.toLocaleString('pt-BR') + '%'
  return `${current} pontos`
}

function ProgressCard({ data, delay }: { data: ChallengeProgressData; delay: number }) {
  const meta = categoryMeta[data.category]
  const Icon = meta.icon
  const pct = Math.min(100, (data.current / data.total) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
      style={{
        background: palette.surface,
        border: `1px solid ${palette.line}`,
        borderRadius: 4,
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: meta.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={16} color="#fff" />
        </div>
        <div>
          <div
            className="font-mono"
            style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: palette.muted }}
          >
            Desafio {data.category.toUpperCase()}
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: palette.ink, lineHeight: 1.2 }}>
            {meta.title}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 7,
            fontSize: 12,
            color: palette.muted,
          }}
        >
          <span style={{ fontWeight: 600, color: meta.color }}>
            {formatCurrent(data.current, data.unit)}
          </span>
          <span>
            {data.unit === '%'
              ? `meta: ${data.total}%`
              : `~${data.total} estimados`}
          </span>
        </div>

        <div
          style={{
            height: 9,
            background: `${meta.color}22`,
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{ height: '100%', background: meta.color, borderRadius: 'inherit' }}
            initial={{ width: 0 }}
            whileInView={{ width: `${pct.toFixed(1)}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: 'easeOut', delay: delay + 0.2 }}
          />
        </div>

        <div
          style={{
            textAlign: 'right',
            fontSize: 11,
            fontWeight: 700,
            color: meta.color,
            marginTop: 4,
          }}
        >
          {pct.toFixed(0)}%{data.unit === '%' ? ' da meta' : ' mapeado'}
        </div>
      </div>

      {/* Motivational */}
      <p style={{ fontSize: 13, color: palette.inkSoft, lineHeight: 1.55, margin: 0 }}>
        {data.motivational}
      </p>

      {/* Mini meta */}
      <div
        style={{
          fontSize: 12,
          color: palette.muted,
          padding: '9px 12px',
          background: `${meta.color}12`,
          borderRadius: 4,
          borderLeft: `3px solid ${meta.color}`,
          lineHeight: 1.4,
        }}
      >
        {data.miniGoal}
      </div>
    </motion.div>
  )
}

export default function ChallengeProgressSection() {
  const [data, setData] = useState<ChallengeProgressData[]>([])

  useEffect(() => {
    getChallengeProgress().then(setData)
  }, [])

  if (data.length === 0) return null

  return (
    <section style={{ borderTop: `1px solid ${palette.line}` }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="mb-10">
          <div
            className="font-mono text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: palette.muted }}
          >
            Impacto coletivo
          </div>
          <h2
            className="font-display text-3xl lg:text-4xl font-medium mb-3"
            style={{ color: palette.ink }}
          >
            Progresso dos desafios
          </h2>
          <p className="text-lg" style={{ color: palette.muted }}>
            Cada ocorrência registrada aproxima o município das metas do Plano Diretor.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {data.map((d, i) => (
            <ProgressCard key={d.category} data={d} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
