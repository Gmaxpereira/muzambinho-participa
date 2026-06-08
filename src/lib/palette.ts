export const palette = {
  paper: '#F4EFE6',
  surface: '#FBF7EF',
  ink: '#1F2419',
  inkSoft: '#3D4435',
  primary: '#2D4A2B',
  primarySoft: '#4A6E45',
  accent: '#C2532E',
  muted: '#8B8678',
  line: '#E3DBC9',
  d1: '#B8893C',
  d2: '#2E5B7E',
  d3: '#C2532E',
} as const

export type PaletteKey = keyof typeof palette
