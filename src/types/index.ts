export type Category = 'd1' | 'd2' | 'd3'
export type CategoryFilter = Category | 'all'
export type OccurrenceStatus = 'Em análise' | 'Encaminhado' | 'Resolvido'
export type TimelineEventType = 'registered' | 'supported' | 'forwarded' | 'visited' | 'resolved'

export interface TimelineEvent {
  type: TimelineEventType
  label: string
  date: string
}

export interface Occurrence {
  id: number
  type: Category
  title: string
  neighborhood: string
  date: string
  status: OccurrenceStatus
  supporters: number
  timeline?: TimelineEvent[]
  lat?: number
  lng?: number
  /** posição relativa no mapa mock (%) */
  x?: number
  y?: number
}

export interface CreateOccurrenceDto {
  type: Category
  title: string
  neighborhood: string
  lat?: number
  lng?: number
}

export interface ConsultationOption {
  id: string
  label: string
  votes: number
}

export interface Consultation {
  id: number
  title: string
  deadline: string
  votes: number
  options?: ConsultationOption[]
}

export interface Indicator {
  id: string
  label: string
  value: string
  delta: string
  iso: string
  category: Category
}

export interface IndicatorEvolutionPoint {
  mes: string
  coleta: number
  esgoto: number
  drenagem: number
}

export interface CategoryReport {
  name: string
  value: number
  color: string
}

export interface ChallengeProgressData {
  category: Category
  current: number
  total: number
  unit: 'pontos' | '%'
  motivational: string
  miniGoal: string
}
