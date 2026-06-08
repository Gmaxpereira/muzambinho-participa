import type { Indicator, IndicatorEvolutionPoint, CategoryReport } from '@/types'

function delay(ms = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function randomDelay(): Promise<void> {
  return delay(200 + Math.random() * 300)
}

export async function getKPIs(): Promise<Indicator[]> {
  await randomDelay()
  return [
    { id: 'coleta',   label: 'Cobertura de coleta',             value: '76%',   delta: '+5pp em 6m',   iso: 'ISO 37120 · 16.1', category: 'd1' },
    { id: 'esgoto',   label: 'Cobertura de esgoto',             value: '46,8%', delta: '+4,2pp em 6m', iso: 'ISO 37120 · 20.1', category: 'd2' },
    { id: 'drenagem', label: 'Pontos de alagamento mapeados',   value: '52',    delta: 'novo cadastro', iso: 'ISO 37123 · 13.3', category: 'd3' },
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
  return [
    { name: 'Resíduos', value: 38, color: '#B8893C' },
    { name: 'Esgoto',   value: 27, color: '#2E5B7E' },
    { name: 'Drenagem', value: 52, color: '#C2532E' },
  ]
}
