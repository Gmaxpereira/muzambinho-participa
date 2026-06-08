export default function SobrePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="font-display text-4xl font-medium" style={{ color: 'var(--color-ink)' }}>
        Sobre o Projeto
      </h1>
      <p className="mt-4" style={{ color: 'var(--color-ink-soft)' }}>
        Ferramenta híbrida de participação popular desenvolvida como parte da Etapa 4 da
        disciplina de Cidades Inteligentes.
      </p>
      <div className="mt-8 space-y-1 text-sm" style={{ color: 'var(--color-muted)' }}>
        <p>Gabriel Maximino Rascão Pereira</p>
        <p>Luiz Roberto Moretti Cavelagna</p>
        <p>Matheus Henrique Ferreira Neves</p>
        <p>Vinicius Martins Freire</p>
      </div>
    </main>
  )
}
