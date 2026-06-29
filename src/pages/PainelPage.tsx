import { useState, useEffect } from 'react'
import { motion, type Variants } from 'motion/react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'
import { TrendingUp, Download } from 'lucide-react'
import type { Indicator, IndicatorEvolutionPoint, CategoryReport } from '@/types'
import { getKPIs, getIndicatorEvolution, getReportsByCategory } from '@/mocks/indicators'
import KPICard from '@/features/KPICard'
import ISOTable from '@/features/ISOTable'
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

const tooltipStyle = {
  background: palette.ink,
  border: `1px solid ${palette.muted}`,
  borderRadius: 4,
  fontSize: 12,
  color: palette.surface,
}

function exportCSV(kpis: Indicator[]) {
  const rows = [
    ['Indicador', 'Valor atual', 'Delta', 'Referência ISO'],
    ...kpis.map(k => [k.label, k.value, k.delta, k.iso]),
  ]
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'indicadores-muzambinho.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export default function PainelPage() {
  const [kpis, setKpis] = useState<Indicator[]>([])
  const [evolution, setEvolution] = useState<IndicatorEvolutionPoint[]>([])
  const [reports, setReports] = useState<CategoryReport[]>([])

  useEffect(() => {
    Promise.all([getKPIs(), getIndicatorEvolution(), getReportsByCategory()])
      .then(([k, e, r]) => { setKpis(k); setEvolution(e); setReports(r) })
  }, [])

  useEffect(() => {
    function refresh() {
      Promise.all([getKPIs(), getReportsByCategory()])
        .then(([k, r]) => { setKpis(k); setReports(r) })
    }
    window.addEventListener('muzambinho:occurrence-created', refresh)
    return () => window.removeEventListener('muzambinho:occurrence-created', refresh)
  }, [])

  const loading = kpis.length === 0

  return (
    <div style={{ background: palette.ink, color: palette.surface, minHeight: '100%' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">

        {/* ── Hero ── */}
        <motion.div
          className="mb-12"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: palette.accent }}
          >
            Painel de transparência
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-3xl lg:text-5xl font-medium leading-[1]"
            style={{ color: palette.surface }}
          >
            Indicadores ISO 37120/22/23,
            <br />
            <em style={{ color: palette.accent, fontStyle: 'italic' }}>em tempo real.</em>
          </motion.h1>
        </motion.div>

        {/* ── KPIs ── */}
        <div
          className="grid sm:grid-cols-3 gap-6 mb-10"
          role="status"
          aria-live="polite"
          aria-label={loading ? 'Carregando indicadores' : 'Indicadores carregados'}
        >
          {loading
            ? [1, 2, 3].map(i => (
                <Skeleton
                  key={i}
                  style={{
                    height: 120,
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 4,
                  }}
                />
              ))
            : kpis.map(k => (
                <KPICard key={k.id} label={k.label} value={k.value} delta={k.delta} iso={k.iso} />
              ))
          }
        </div>

        {/* ── Gráficos ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-16">

          {/* LineChart */}
          <div
            className="lg:col-span-3 p-6 min-w-0"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 4,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="font-display text-lg" style={{ color: palette.surface }}>
                Evolução dos indicadores
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase opacity-60">
                2026 · % cobertura
              </div>
            </div>

            {evolution.length > 0 && (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={evolution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="mes" stroke={palette.muted} fontSize={11} tickLine={false} />
                  <YAxis stroke={palette.muted} fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="coleta"   stroke={palette.d1} strokeWidth={2} name="Coleta"   dot={{ r: 3, fill: palette.d1 }} />
                  <Line type="monotone" dataKey="esgoto"   stroke={palette.d2} strokeWidth={2} name="Esgoto"   dot={{ r: 3, fill: palette.d2 }} />
                  <Line type="monotone" dataKey="drenagem" stroke={palette.d3} strokeWidth={2} name="Drenagem" dot={{ r: 3, fill: palette.d3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}

            <div className="flex gap-5 mt-4 justify-center text-xs" style={{ color: palette.muted }}>
              {[
                { label: 'Coleta',   color: palette.d1 },
                { label: 'Esgoto',   color: palette.d2 },
                { label: 'Drenagem', color: palette.d3 },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div style={{ width: 20, height: 2, background: l.color, borderRadius: 1 }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>

          {/* PieChart */}
          <div
            className="lg:col-span-2 p-6 min-w-0"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 4,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="font-display text-lg" style={{ color: palette.surface }}>
                Reportes por categoria
              </div>
              <div className="font-mono text-[10px] tracking-widest uppercase opacity-60">
                total · {reports.reduce((a, r) => a + r.value, 0)}
              </div>
            </div>

            {reports.length > 0 && (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={reports}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {reports.map((r, i) => (
                      <Cell key={i} fill={r.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            )}

            <div className="flex justify-center gap-4 mt-2 text-xs">
              {reports.map(r => (
                <div key={r.name} className="flex items-center gap-1.5">
                  <div style={{ width: 10, height: 10, background: r.color, borderRadius: 2 }} />
                  <span style={{ color: palette.muted }}>{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabela ISO ── */}
        <div className="mb-12">
          <div
            className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: palette.accent }}
          >
            Articulação com indicadores ISO
          </div>
          <h2
            className="font-display text-2xl lg:text-3xl font-medium mb-6"
            style={{ color: palette.surface }}
          >
            Quadro 1 — Desafios, funcionalidades e indicadores
          </h2>
          <ISOTable />
        </div>

        {/* ── Exportar CSV ── */}
        <div
          className="flex justify-center pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <button
            onClick={() => exportCSV(kpis)}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded text-sm font-medium transition disabled:opacity-40 hover:bg-white/10 hover:border-white/40 hover:text-white"
            style={{
              border: '1px solid rgba(255,255,255,0.2)',
              color: `${palette.surface}99`,
              background: 'transparent',
            }}
          >
            <Download size={14} />
            Exportar dados (CSV)
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8" style={{ color: `${palette.muted}88` }}>
          <TrendingUp size={14} />
          <span className="font-mono text-xs tracking-wider uppercase">
            ABNT NBR ISO 37120 · ISO 37122 · ISO 37123
          </span>
        </div>
      </div>
    </div>
  )
}
