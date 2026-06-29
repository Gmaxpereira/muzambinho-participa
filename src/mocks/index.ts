import type {
  Occurrence,
  CreateOccurrenceDto,
  Consultation,
  Indicator,
  IndicatorEvolutionPoint,
  CategoryReport,
  ChallengeProgressData,
} from '@/types'

const STORAGE_KEY = 'muzambinho_occurrences'
const SUPPORTED_KEY = 'muzambinho_supported_ids'
const MY_OCCURRENCES_KEY = 'muzambinho_my_occurrence_ids'

const initialOccurrences: Occurrence[] = [
  {
    id: 1, type: 'd1', title: 'Descarte irregular na estrada do Café',
    neighborhood: 'Zona Rural — Córrego do Café', date: 'há 2 dias', status: 'Em análise', supporters: 18,
    lat: -21.380, lng: -46.550, x: 22, y: 35,
    timeline: [
      { type: 'supported',   label: '18 moradores apoiaram',              date: 'há 1 dia'  },
      { type: 'registered',  label: 'Registrado pelo cidadão',            date: 'há 2 dias' },
    ],
  },
  {
    id: 2, type: 'd1', title: 'Comunidade sem coleta há 3 semanas',
    neighborhood: 'Comunidade Boa Esperança', date: 'há 5 dias', status: 'Encaminhado', supporters: 7,
    lat: -21.360, lng: -46.508, x: 78, y: 28,
    timeline: [
      { type: 'forwarded',   label: 'Encaminhado à Secretaria de Obras',  date: 'há 3 dias' },
      { type: 'supported',   label: '7 moradores apoiaram',               date: 'há 4 dias' },
      { type: 'registered',  label: 'Registrado pelo cidadão',            date: 'há 5 dias' },
    ],
  },
  {
    id: 3, type: 'd2', title: 'Esgoto a céu aberto na Rua das Acácias',
    neighborhood: 'Centro', date: 'há 1 dia', status: 'Em análise', supporters: 23,
    lat: -21.370, lng: -46.527, x: 48, y: 55,
    timeline: [
      { type: 'supported',   label: '23 moradores apoiaram',              date: 'há 8h'     },
      { type: 'registered',  label: 'Registrado pelo cidadão',            date: 'há 1 dia'  },
    ],
  },
  {
    id: 4, type: 'd2', title: 'Vazamento próximo à ETE',
    neighborhood: 'Bairro São José', date: 'há 4 dias', status: 'Resolvido', supporters: 4,
    lat: -21.375, lng: -46.522, x: 56, y: 62,
    timeline: [
      { type: 'resolved',    label: 'Resolvido — reparo na rede concluído', date: 'há 1 dia'  },
      { type: 'visited',     label: 'Equipe técnica visitou o local',      date: 'há 2 dias' },
      { type: 'forwarded',   label: 'Encaminhado à Secretaria de Obras',  date: 'há 3 dias' },
      { type: 'registered',  label: 'Registrado pelo cidadão',            date: 'há 4 dias' },
    ],
  },
  {
    id: 5, type: 'd3', title: 'Alagamento recorrente na Av. Américo Luz',
    neighborhood: 'Centro', date: 'ontem', status: 'Em análise', supporters: 15,
    lat: -21.372, lng: -46.528, x: 45, y: 50,
    timeline: [
      { type: 'supported',   label: '15 moradores apoiaram',              date: 'há 6h'     },
      { type: 'registered',  label: 'Registrado pelo cidadão',            date: 'ontem'     },
    ],
  },
  {
    id: 6, type: 'd3', title: 'Bueiro entupido — Rua João Pinheiro',
    neighborhood: 'Vila Olímpica', date: 'há 3 dias', status: 'Encaminhado', supporters: 11,
    lat: -21.368, lng: -46.535, x: 38, y: 68,
    timeline: [
      { type: 'forwarded',   label: 'Encaminhado à Secretaria de Infraestrutura', date: 'há 1 dia'  },
      { type: 'supported',   label: '11 moradores apoiaram',              date: 'há 2 dias' },
      { type: 'registered',  label: 'Registrado pelo cidadão',            date: 'há 3 dias' },
    ],
  },
  {
    id: 7, type: 'd3', title: 'Erosão pluvial na estrada vicinal',
    neighborhood: 'Zona Rural — Pântano', date: 'há 1 semana', status: 'Em análise', supporters: 3,
    lat: -21.400, lng: -46.560, x: 18, y: 72,
    timeline: [
      { type: 'supported',   label: '3 moradores apoiaram',               date: 'há 5 dias' },
      { type: 'registered',  label: 'Registrado pelo cidadão',            date: 'há 1 semana' },
    ],
  },
  {
    id: 8, type: 'd1', title: 'Lixeira comunitária quebrada',
    neighborhood: 'Bairro do Rosário', date: 'há 6 dias', status: 'Resolvido', supporters: 9,
    lat: -21.365, lng: -46.520, x: 52, y: 45,
    timeline: [
      { type: 'resolved',    label: 'Resolvido — lixeira substituída',    date: 'há 3 dias' },
      { type: 'visited',     label: 'Equipe técnica visitou o local',     date: 'há 4 dias' },
      { type: 'supported',   label: '9 moradores apoiaram',               date: 'há 5 dias' },
      { type: 'registered',  label: 'Registrado pelo cidadão',            date: 'há 6 dias' },
    ],
  },
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
    if (stored) {
      const parsed = JSON.parse(stored) as Occurrence[]
      // Backfill supporters for data stored before this field was added
      return parsed.map(o => ({ ...o, supporters: o.supporters ?? 1 }))
    }
  } catch {
    // fallback to initial data
  }
  return initialOccurrences
}

export function getSupportedIds(): number[] {
  try {
    const stored = localStorage.getItem(SUPPORTED_KEY)
    return stored ? (JSON.parse(stored) as number[]) : []
  } catch {
    return []
  }
}

export function getMyOccurrenceIds(): number[] {
  try {
    const stored = localStorage.getItem(MY_OCCURRENCES_KEY)
    return stored ? (JSON.parse(stored) as number[]) : []
  } catch {
    return []
  }
}

export async function supportOccurrence(id: number): Promise<number> {
  const occurrences = await getOccurrences()
  const occ = occurrences.find(o => o.id === id)
  if (!occ) throw new Error('Occurrence not found')
  const newCount = (occ.supporters ?? 0) + 1
  const updated = occurrences.map(o => o.id === id ? { ...o, supporters: newCount } : o)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  const supported = getSupportedIds()
  if (!supported.includes(id)) {
    localStorage.setItem(SUPPORTED_KEY, JSON.stringify([...supported, id]))
  }
  return newCount
}

const MUZAMBINHO_BBOX = { latMin: -21.42, latMax: -21.32, lngMin: -46.58, lngMax: -46.47 }

function randomCoordInMuzambinho() {
  return {
    lat: MUZAMBINHO_BBOX.latMin + Math.random() * (MUZAMBINHO_BBOX.latMax - MUZAMBINHO_BBOX.latMin),
    lng: MUZAMBINHO_BBOX.lngMin + Math.random() * (MUZAMBINHO_BBOX.lngMax - MUZAMBINHO_BBOX.lngMin),
  }
}

export async function createOccurrence(dto: CreateOccurrenceDto): Promise<Occurrence> {
  await randomDelay()
  const current = await getOccurrences()
  const coords = dto.lat != null && dto.lng != null
    ? { lat: dto.lat, lng: dto.lng }
    : randomCoordInMuzambinho()
  const newOccurrence: Occurrence = {
    id: Date.now(),
    type: dto.type,
    title: dto.title,
    neighborhood: dto.neighborhood,
    date: 'agora',
    status: 'Em análise',
    supporters: 1,
    timeline: [
      { type: 'registered', label: 'Registrado pelo cidadão', date: 'agora' },
    ],
    lat: coords.lat,
    lng: coords.lng,
    x: 20 + Math.random() * 60,
    y: 25 + Math.random() * 50,
  }
  const updated = [newOccurrence, ...current]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  localStorage.setItem(MY_OCCURRENCES_KEY, JSON.stringify([newOccurrence.id, ...getMyOccurrenceIds()]))
  window.dispatchEvent(new CustomEvent('muzambinho:occurrence-created', { detail: newOccurrence }))
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

// D1/D3 counts are base (from non-report data) + registered occurrences,
// making the bars grow as citizens submit new reports.
const D1_BASE = 35  // 35 + 3 initial mocks = 38
const D3_BASE = 49  // 49 + 3 initial mocks = 52

export async function getChallengeProgress(): Promise<ChallengeProgressData[]> {
  const occurrences = await getOccurrences()
  const d1Count = D1_BASE + occurrences.filter(o => o.type === 'd1').length
  const d3Count = D3_BASE + occurrences.filter(o => o.type === 'd3').length
  return [
    {
      category: 'd1',
      current: d1Count,
      total: 100,
      unit: 'pontos',
      motivational: 'Ajude a mapear os pontos sem coleta nas comunidades rurais.',
      miniGoal: 'Próxima meta: 50 pontos → relatório para a Prefeitura',
    },
    {
      category: 'd2',
      current: 46.8,
      total: 80,
      unit: '%',
      motivational: 'Acompanhe o avanço das obras do Sistema de Esgotamento Sanitário.',
      miniGoal: 'Obra atual: interceptor da Av. Principal — 62% concluído',
    },
    {
      category: 'd3',
      current: d3Count,
      total: 120,
      unit: 'pontos',
      motivational: 'Seus registros estão construindo o primeiro mapa de risco do município.',
      miniGoal: 'Próxima meta: 80 pontos → base para o Plano Diretor de Drenagem',
    },
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
