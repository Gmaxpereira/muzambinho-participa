import type {
  Occurrence,
  CreateOccurrenceDto,
  Consultation,
  Indicator,
  IndicatorEvolutionPoint,
  CategoryReport,
} from '@/types'

const STORAGE_KEY = 'muzambinho_occurrences'

const initialOccurrences: Occurrence[] = [
  { id: 1, type: 'd1', title: 'Descarte irregular na estrada do Café', neighborhood: 'Zona Rural — Córrego do Café', date: 'há 2 dias', status: 'Em análise', x: 22, y: 35 },
  { id: 2, type: 'd1', title: 'Comunidade sem coleta há 3 semanas', neighborhood: 'Comunidade Boa Esperança', date: 'há 5 dias', status: 'Encaminhado', x: 78, y: 28 },
  { id: 3, type: 'd2', title: 'Esgoto a céu aberto na Rua das Acácias', neighborhood: 'Centro', date: 'há 1 dia', status: 'Em análise', x: 48, y: 55 },
  { id: 4, type: 'd2', title: 'Vazamento próximo à ETE', neighborhood: 'Bairro São José', date: 'há 4 dias', status: 'Resolvido', x: 56, y: 62 },
  { id: 5, type: 'd3', title: 'Alagamento recorrente na Av. Américo Luz', neighborhood: 'Centro', date: 'ontem', status: 'Em análise', x: 45, y: 50 },
  { id: 6, type: 'd3', title: 'Bueiro entupido — Rua João Pinheiro', neighborhood: 'Vila Olímpica', date: 'há 3 dias', status: 'Encaminhado', x: 38, y: 68 },
  { id: 7, type: 'd3', title: 'Erosão pluvial na estrada vicinal', neighborhood: 'Zona Rural — Pântano', date: 'há 1 semana', status: 'Em análise', x: 18, y: 72 },
  { id: 8, type: 'd1', title: 'Lixeira comunitária quebrada', neighborhood: 'Bairro do Rosário', date: 'há 6 dias', status: 'Resolvido', x: 52, y: 45 },
]

const initialConsultations: Consultation[] = [
  { id: 1, title: 'Onde priorizar a expansão da coleta seletiva?', deadline: 'encerra em 12 dias', votes: 284 },
  { id: 2, title: 'Você apoia a criação de comitê de bacia hidrográfica municipal?', deadline: 'encerra em 5 dias', votes: 412 },
  { id: 3, title: 'Qual deve ser o foco do PDD em 2026?', deadline: 'encerra em 19 dias', votes: 156 },
]

const initialIndicators: Indicator[] = [
  { id: 'coleta', label: 'Cobertura de coleta', value: '76%', delta: '+5pp em 6m', iso: 'ISO 37120 · 16.1', category: 'd1' },
  { id: 'esgoto', label: 'Cobertura de esgoto', value: '46,8%', delta: '+4,2pp em 6m', iso: 'ISO 37120 · 20.1', category: 'd2' },
  { id: 'drenagem', label: 'Pontos de alagamento mapeados', value: '52', delta: 'novo cadastro', iso: 'ISO 37123 · 13.3', category: 'd3' },
]

function delay(ms = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function randomDelay(): Promise<void> {
  return delay(200 + Math.random() * 300)
}

export async function getOccurrences(): Promise<Occurrence[]> {
  await randomDelay()
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as Occurrence[]
  } catch {
    // fallback to initial data
  }
  return initialOccurrences
}

export async function createOccurrence(dto: CreateOccurrenceDto): Promise<Occurrence> {
  await randomDelay()
  const current = await getOccurrences()
  const newOccurrence: Occurrence = {
    id: Date.now(),
    ...dto,
    date: 'agora',
    status: 'Em análise',
    x: 20 + Math.random() * 60,
    y: 25 + Math.random() * 50,
  }
  const updated = [newOccurrence, ...current]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return newOccurrence
}

export async function getConsultations(): Promise<Consultation[]> {
  await randomDelay()
  return initialConsultations
}

export async function getIndicators(): Promise<Indicator[]> {
  await randomDelay()
  return initialIndicators
}

export async function getIndicatorEvolution(): Promise<IndicatorEvolutionPoint[]> {
  await delay(200)
  return [
    { mes: 'Jan', coleta: 71, esgoto: 42.6, drenagem: 52.8 },
    { mes: 'Fev', coleta: 72, esgoto: 42.6, drenagem: 52.8 },
    { mes: 'Mar', coleta: 73, esgoto: 43.1, drenagem: 53.2 },
    { mes: 'Abr', coleta: 74, esgoto: 44.0, drenagem: 53.9 },
    { mes: 'Mai', coleta: 75, esgoto: 45.2, drenagem: 54.5 },
    { mes: 'Jun', coleta: 76, esgoto: 46.8, drenagem: 55.1 },
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
