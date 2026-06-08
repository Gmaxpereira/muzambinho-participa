import type { Consultation } from '@/types'

const STORAGE_KEY = 'muzambinho_votes'

const initialConsultations: Consultation[] = [
  {
    id: 1,
    title: 'Onde priorizar a expansão da coleta seletiva?',
    deadline: 'encerra em 12 dias',
    votes: 284,
    options: [
      { id: 'a', label: 'Centro histórico',   votes: 91 },
      { id: 'b', label: 'Zona rural',          votes: 78 },
      { id: 'c', label: 'Bairros periféricos', votes: 97 },
      { id: 'd', label: 'Indiferente',         votes: 18 },
    ],
  },
  {
    id: 2,
    title: 'Você apoia a criação de comitê de bacia hidrográfica municipal?',
    deadline: 'encerra em 5 dias',
    votes: 412,
    options: [
      { id: 'a', label: 'Sim, apoio',                    votes: 318 },
      { id: 'b', label: 'Não apoio',                     votes: 42  },
      { id: 'c', label: 'Preciso de mais informações',   votes: 52  },
    ],
  },
  {
    id: 3,
    title: 'Qual deve ser o foco do PDD em 2026?',
    deadline: 'encerra em 19 dias',
    votes: 156,
    options: [
      { id: 'a', label: 'Mapeamento de risco',  votes: 68 },
      { id: 'b', label: 'Obras de drenagem',    votes: 51 },
      { id: 'c', label: 'Educação ambiental',   votes: 21 },
      { id: 'd', label: 'Todos igualmente',     votes: 16 },
    ],
  },
  {
    id: 4,
    title: 'Deve ser criada coleta seletiva porta a porta?',
    deadline: 'encerra em 8 dias',
    votes: 193,
    options: [
      { id: 'a', label: 'Sim, imediatamente',            votes: 89 },
      { id: 'b', label: 'Sim, apenas no centro',         votes: 57 },
      { id: 'c', label: 'Não é prioridade agora',        votes: 31 },
      { id: 'd', label: 'Prefiro ponto de coleta fixo',  votes: 16 },
    ],
  },
  {
    id: 5,
    title: 'Qual área de alagamento merece atenção prioritária?',
    deadline: 'encerra em 3 dias',
    votes: 334,
    options: [
      { id: 'a', label: 'Av. Américo Luz',           votes: 142 },
      { id: 'b', label: 'Zona Rural — Pântano',       votes: 88  },
      { id: 'c', label: 'Bairro do Rosário',          votes: 67  },
      { id: 'd', label: 'Comunidade Boa Esperança',   votes: 37  },
    ],
  },
  {
    id: 6,
    title: 'Você participaria de uma oficina de cartografia social?',
    deadline: 'encerra em 25 dias',
    votes: 127,
    options: [
      { id: 'a', label: 'Sim, com certeza',                  votes: 74 },
      { id: 'b', label: 'Talvez, se for no fim de semana',   votes: 35 },
      { id: 'c', label: 'Não tenho disponibilidade',         votes: 18 },
    ],
  },
]

function delay(ms = 300): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getConsultations(): Promise<Consultation[]> {
  await delay(200 + Math.random() * 300)
  return initialConsultations.map(c => ({ ...c, options: c.options?.map(o => ({ ...o })) }))
}

export function getVotes(): Record<number, string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as Record<number, string>
  } catch {
    // ignore
  }
  return {}
}

export function saveVote(consultationId: number, optionId: string): void {
  const current = getVotes()
  current[consultationId] = optionId
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
}
