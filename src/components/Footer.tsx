export default function Footer() {
  return (
    <footer
      id="sobre"
      style={{
        borderTop: '1px solid var(--color-line)',
        background: 'var(--color-surface)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid md:grid-cols-12 gap-10">
          {/* Coluna 1 — Sobre */}
          <div className="md:col-span-5">
            <div
              className="font-display text-2xl font-medium mb-3"
              style={{ color: 'var(--color-primary)' }}
            >
              Muzambinho Participa
            </div>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: 'var(--color-ink-soft)' }}
            >
              Ferramenta híbrida de participação popular desenvolvida como parte
              da Etapa 4 da disciplina de Cidades Inteligentes.
            </p>
            <div
              className="font-mono text-[10px] tracking-widest uppercase"
              style={{ color: 'var(--color-muted)' }}
            >
              Arranjo tripartite · Prefeitura + Universidade + Sociedade civil
            </div>
          </div>

          {/* Coluna 2 — Base normativa */}
          <div className="md:col-span-3">
            <div
              className="font-mono text-[10px] tracking-widest uppercase mb-3"
              style={{ color: 'var(--color-muted)' }}
            >
              Base normativa
            </div>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-ink-soft)' }}>
              <li>ABNT NBR ISO 37120:2021</li>
              <li>ABNT NBR ISO 37122:2020</li>
              <li>ABNT NBR ISO 37123:2021</li>
              <li>Estatuto da Cidade · Lei 10.257/2001</li>
            </ul>
          </div>

          {/* Coluna 3 — Equipe */}
          <div className="md:col-span-4">
            <div
              className="font-mono text-[10px] tracking-widest uppercase mb-3"
              style={{ color: 'var(--color-muted)' }}
            >
              Equipe
            </div>
            <ul className="space-y-1 text-sm" style={{ color: 'var(--color-ink-soft)' }}>
              <li>Gabriel Maximino Rascão Pereira</li>
              <li>Luiz Roberto Moretti Cavelagna</li>
              <li>Matheus Henrique Ferreira Neves</li>
              <li>Vinicius Martins Freire</li>
            </ul>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div
          className="mt-12 pt-6 flex flex-wrap items-center justify-between gap-2 text-xs font-mono tracking-widest uppercase"
          style={{
            borderTop: '1px solid var(--color-line)',
            color: 'var(--color-muted)',
          }}
        >
          <span>MVP · Etapa 4 · 2026</span>
          <span>Muzambinho / Minas Gerais / Brasil</span>
        </div>
      </div>
    </footer>
  )
}
