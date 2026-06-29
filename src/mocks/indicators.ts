import type { Indicator, IndicatorEvolutionPoint, CategoryReport } from '@/types'

const STORAGE_KEY = 'muzambinho_occurrences'

// Counts from the 8 initial mock occurrences (d1:3, d2:2, d3:3)
const INITIAL_COUNTS = { d1: 3, d2: 2, d3: 3 }

function delay(ms = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function randomDelay(): Promise<void> {
  return delay(200 + Math.random() * 300)
}

export function countByCategory(): { d1: number; d2: number; d3: number } {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return INITIAL_COUNTS
    const occs = JSON.parse(stored) as Array<{ type: string }>
    return {
      d1: occs.filter(o => o.type === 'd1').length,
      d2: occs.filter(o => o.type === 'd2').length,
      d3: occs.filter(o => o.type === 'd3').length,
    }
  } catch {
    return INITIAL_COUNTS
  }
}

export async function getKPIs(): Promise<Indicator[]> {
  await randomDelay()
  const counts = countByCategory()
  // D3 KPI reflects the diagnostic base (52) plus new flood points beyond initial mocks
  const d3Value = 52 + Math.max(0, counts.d3 - INITIAL_COUNTS.d3)
  return [
    { id: 'coleta',   label: 'Cobertura de coleta',           value: '76%',          delta: '+5pp em 6m',   iso: 'ISO 37120 · 16.1', category: 'd1' },
    { id: 'esgoto',   label: 'Cobertura de esgoto',           value: '46,8%',        delta: '+4,2pp em 6m', iso: 'ISO 37120 · 20.1', category: 'd2' },
    { id: 'drenagem', label: 'Pontos de alagamento mapeados', value: String(d3Value), delta: 'novo cadastro', iso: 'ISO 37123 · 13.3', category: 'd3' },
  ]
}

export async function getIndicatorEvolution(): Promise<IndicatorEvolutionPoint[]> {
  await delay(200)
  return [
    { mes: 'Jan', coleta: 71,   esgoto: 42.6, drenagem: 52.8 },
    { mes: 'Fev', coleta: 72,   esgoto: 42.6, drenagem: 52.8 },
    { mes: 'Mar', coleta: 73,   esgoto: 43.1, drenagem: 53.2 },
    { mes: 'Abr', coleta: 74,   esgoto: 44.0, drenagem: 53.9 },
    { mes: 'Mai', coleta: 75,   esgoto: 45.2, drenagem: 54.5 },
    { mes: 'Jun', coleta: 76,   esgoto: 46.8, drenagem: 55.1 },
  ]
}

export async function getReportsByCategory(): Promise<CategoryReport[]> {
  await delay(200)
  const counts = countByCategory()
  return [
    { name: 'Resíduos', value: counts.d1, color: '#B8893C' },
    { name: 'Esgoto',   value: counts.d2, color: '#2E5B7E' },
    { name: 'Drenagem', value: counts.d3, color: '#C2532E' },
  ]
}
