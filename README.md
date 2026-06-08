# Muzambinho Participa

Ferramenta híbrida de participação popular para fortalecer a gestão urbana de Muzambinho/MG. A plataforma permite que cidadãos registrem ocorrências de saneamento e drenagem, acompanhem indicadores ISO e participem de consultas públicas que alimentam o Plano Diretor de Drenagem.

## Contexto Acadêmico

Projeto desenvolvido como **Etapa 4** da disciplina de **Cidades Inteligentes**, com base no diagnóstico levantado na Etapa 3 (ABNT NBR ISO 37120/37122/37123). O MVP demonstra um arranjo tripartite — Prefeitura + Universidade + Sociedade Civil — nos níveis de informação, consulta e colaboração da escada de Arnstein (1969).

## Os 3 Desafios Prioritários

| Código | Desafio | Indicador Principal |
|--------|---------|---------------------|
| **D1** | **Resíduos Sólidos** — 2.111 habitantes sem coleta regular e ausência de coleta seletiva | ISO 37120:16.1 — Cobertura de coleta (76%) |
| **D2** | **Esgotamento Sanitário** — apenas 42,6% de cobertura e 100% do esgoto lançado in natura | ISO 37120:20.1 — Cobertura de esgoto (46,8%) |
| **D3** | **Drenagem Urbana** — 47,2% de déficit em rede pluvial e ausência de mapa de risco | ISO 37123:13.3 — Pontos de alagamento mapeados (52) |

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS v4** (paleta customizada via `@theme`)
- **shadcn/ui** (componentes base)
- **react-router-dom** (roteamento SPA)
- **react-leaflet** + **leaflet** (mapa colaborativo)
- **recharts** (gráficos do painel)
- **lucide-react** (ícones)
- **Fontes**: Fraunces (display) + DM Sans (corpo)

## Pré-requisitos

- Node.js 18+
- npm 9+

## Execução local

```bash
git clone https://github.com/Gmaxpereira/muzambinho-participa.git
cd muzambinho-participa
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Fluxo de contribuição

Cada integrante deve trabalhar em uma branch separada e abrir Pull Request:

```bash
git checkout -b feat/nome-da-tarefa
# realize as mudanças
git add . && git commit -m "feat: descrição curta"
git push -u origin feat/nome-da-tarefa
# abra o PR no GitHub para revisão
```

## Convenção de Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

| Prefixo | Uso |
|---------|-----|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `style:` | Alterações visuais / CSS sem mudança de lógica |
| `docs:` | Documentação |
| `refactor:` | Refatoração sem bug fix ou feature |

## Estrutura de Pastas

```
src/
├── components/   # Componentes reutilizáveis (Header, Footer, etc.)
├── pages/        # Uma página por rota (Home, Mapa, Painel, Consultas, Sobre)
├── features/     # Componentes específicos de domínio (MapView, KPI, etc.)
├── mocks/        # Serviços async com localStorage (substituível por Supabase)
├── types/        # Interfaces TypeScript (Occurrence, Consultation, Indicator…)
├── lib/          # Utilitários (cn, formatters)
└── styles/       # globals.css com CSS variables e Tailwind @theme
```

## Equipe

- Gabriel Maximino Rascão Pereira
- Luiz Roberto Moretti Cavelagna
- Matheus Henrique Ferreira Neves
- Vinicius Martins Freire

## Licença

MIT © 2026 — Gabriel Maximino Rascão Pereira, Luiz Roberto Moretti Cavelagna, Matheus Henrique Ferreira Neves, Vinicius Martins Freire
