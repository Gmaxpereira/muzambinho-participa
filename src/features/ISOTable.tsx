import { palette } from '@/lib/palette'

interface ISORow {
  code: 'd1' | 'd2' | 'd3'
  challenge: string
  feature: string
  indicators: string
}

const rows: ISORow[] = [
  {
    code: 'd1',
    challenge: 'D1 – Resíduos sólidos',
    feature: 'Mapa colaborativo de pontos de descarte irregular e de comunidades sem coleta; cadastro de interesse em coleta seletiva.',
    indicators: '16.1 e 16.3 (NBR ISO 37120); 16.1 (NBR ISO 37122)',
  },
  {
    code: 'd2',
    challenge: 'D2 – Esgoto e água',
    feature: 'Painel de acompanhamento das obras do SES (retomadas em 2025) com canal de reporte de ligações irregulares e falta d\'água.',
    indicators: '20.1 e 20.3 (NBR ISO 37120)',
  },
  {
    code: 'd3',
    challenge: 'D3 – Drenagem urbana',
    feature: 'Registro georreferenciado de pontos de alagamento pelos cidadãos, formando a base de um mapeamento de risco hoje inexistente.',
    indicators: '13.3, 15.1 e 21.2 (NBR ISO 37123)',
  },
]

const categoryColors: Record<string, string> = {
  d1: palette.d1,
  d2: palette.d2,
  d3: palette.d3,
}

const cellBase: React.CSSProperties = {
  padding: '14px 16px',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  verticalAlign: 'top',
  fontSize: 13,
  lineHeight: '1.5',
  color: palette.surface,
}

export default function ISOTable() {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 4,
          }}
        >
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
              {['Desafio', 'Funcionalidade na plataforma', 'Indicador ISO alimentado'].map(h => (
                <th
                  key={h}
                  style={{
                    padding: '10px 16px',
                    textAlign: 'left',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: palette.muted,
                    fontWeight: 500,
                    background: 'rgba(255,255,255,0.04)',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.code}
                style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.02)' : 'transparent' }}
              >
                <td style={{ ...cellBase, width: '22%' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      background: `${categoryColors[row.code]}22`,
                      color: categoryColors[row.code],
                      padding: '3px 8px',
                      borderRadius: 3,
                      fontSize: 11,
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {row.challenge}
                  </span>
                </td>
                <td style={{ ...cellBase, width: '52%', color: `${palette.surface}CC` }}>
                  {row.feature}
                </td>
                <td style={{ ...cellBase, width: '26%', fontFamily: 'var(--font-mono)', fontSize: 11, color: palette.muted }}>
                  {row.indicators}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {rows.map(row => (
          <div
            key={row.code}
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 4,
              padding: '16px',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                background: `${categoryColors[row.code]}22`,
                color: categoryColors[row.code],
                padding: '3px 8px',
                borderRadius: 3,
                fontSize: 11,
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              {row.challenge}
            </span>
            <p style={{ fontSize: 13, color: `${palette.surface}CC`, lineHeight: '1.5', marginBottom: 10 }}>
              {row.feature}
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: palette.muted, letterSpacing: '0.05em' }}>
              {row.indicators}
            </p>
          </div>
        ))}
      </div>

      <p
        className="mt-3 text-right"
        style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: `${palette.muted}99` }}
      >
        Quadro 1 — Articulação entre desafios, funcionalidades e indicadores. Fonte: os autores (2026).
      </p>
    </>
  )
}
