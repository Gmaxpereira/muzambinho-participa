# Muzambinho Participa

Ferramenta híbrida de participação popular para fortalecer a gestão urbana de Muzambinho/MG. A plataforma permite que cidadãos registrem ocorrências de saneamento e drenagem, acompanhem indicadores ISO e participem de consultas públicas que alimentam o Plano Diretor de Drenagem.

## Screenshots

> _Substitua os placeholders abaixo pelos prints reais após rodar `npm run dev`._

| Home | Mapa Colaborativo |
|------|-------------------|
| ![Home](docs/screenshots/home.png) | ![Mapa](docs/screenshots/mapa.png) |

| Painel ISO | Consultas Públicas |
|------------|-------------------|
| ![Painel](docs/screenshots/painel.png) | ![Consultas](docs/screenshots/consultas.png) |

## Contexto Acadêmico

Projeto desenvolvido como **Etapa 4** da disciplina de **Cidades Inteligentes** da **PUC Minas — Campus Poços de Caldas**, com base no diagnóstico levantado na Etapa 3 (ABNT NBR ISO 37120/37122/37123). O MVP demonstra um arranjo tripartite — Prefeitura + Universidade + Sociedade Civil — nos níveis de informação, consulta e colaboração da escada de Arnstein (1969).

## Os 3 Desafios Prioritários

| Código | Desafio | Indicador Principal |
|--------|---------|---------------------|
| **D1** | **Resíduos Sólidos** — 2.111 habitantes sem coleta regular e ausência de coleta seletiva | ISO 37120:16.1 — Cobertura de coleta (76%) |
| **D2** | **Esgotamento Sanitário** — apenas 42,6% de cobertura e 100% do esgoto lançado in natura | ISO 37120:20.1 — Cobertura de esgoto (46,8%) |
| **D3** | **Drenagem Urbana** — 47,2% de déficit em rede pluvial e ausência de mapa de risco | ISO 37123:13.3 — Pontos de alagamento mapeados (52) |

## Stack

| Tecnologia | Versão | Papel |
|---|---|---|
| Vite | 6.x | Bundler + dev server |
| React | 19.x | UI framework |
| TypeScript | 5.x | Tipagem estática (strict) |
| Tailwind CSS | 4.x | Utilitários CSS + `@theme` customizado |
| react-router-dom | 7.x | Roteamento SPA |
| react-leaflet + leaflet | 5.x / 1.9.x | Mapa colaborativo |
| recharts | 3.x | Gráficos (LineChart, PieChart) |
| motion | 11.x | Animações de entrada (`whileInView`, stagger) |
| sonner | latest | Toast notifications |
| lucide-react | latest | Ícones |
| Fraunces + DM Sans | latest | Fontes (display + corpo) |

## Decisões Arquiteturais

### Mocks como Services (drop-in para Supabase)

Toda a camada de dados está encapsulada em `src/mocks/`. As funções retornam `Promise<T>` com latência simulada (200–500ms) e persistência via `localStorage`, imitando exatamente o contrato de uma API real.

```
src/mocks/
├── index.ts          → getOccurrences(), createOccurrence()
├── consultations.ts  → getConsultations(), saveVote(), getVotes()
└── indicators.ts     → getKPIs(), getIndicatorEvolution(), getReportsByCategory()
```

Para migrar para Supabase em produção, basta substituir cada função por uma chamada `supabase.from(...)` — **nenhum componente precisa mudar**.

### Inline Styles + Palette

A paleta de cores é mantida em `src/lib/palette.ts` como constantes JavaScript, exportada como objeto `palette`. Isso permite usar os tokens diretamente em `style={{}}` preservando type-safety e evitando conflitos com classes CSS dinâmicas.

### Animações Progressivas

Todas as animações usam `whileInView` + `viewport={{ once: true }}` (motion.dev), garantindo que cada seção anima apenas na primeira vez que entra na tela — sem replay ao scrollar de volta.

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

## Build de produção

```bash
npm run build   # gera dist/
npm run preview # serve o build localmente
```

## Estrutura de Pastas

```
src/
├── components/        # Reutilizáveis: Header, Footer, Layout
│   └── ui/            # Componentes base (Skeleton)
├── pages/             # Uma por rota: Home, Mapa, Painel, Consultas, Sobre, 404
├── features/          # Domínio: MapView, KPICard, OccurrenceRow, VoteDialog…
├── mocks/             # Serviços async com localStorage (substituível por Supabase)
├── types/             # index.ts — interfaces TypeScript
├── lib/               # utils.ts (cn), palette.ts (tokens de cor)
└── styles/            # globals.css — @theme + fontes + keyframes
```

## Fluxo de contribuição

```bash
git checkout -b feat/nome-da-tarefa
# realize as mudanças
git add . && git commit -m "feat: descrição curta"
git push -u origin feat/nome-da-tarefa
# abra o PR no GitHub para revisão
```

## Convenção de Commits

| Prefixo | Uso |
|---------|-----|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `style:` | Alterações visuais / CSS sem mudança de lógica |
| `docs:` | Documentação |
| `refactor:` | Refatoração sem bug fix ou feature |

## Equipe

- Gabriel Maximino Rascão Pereira
- Luiz Roberto Moretti Cavelagna
- Matheus Henrique Ferreira Neves
- Vinicius Martins Freire

**Instituição:** PUC Minas — Campus Poços de Caldas  
**Disciplina:** Cidades Inteligentes — Etapa 4 (2026)

## Licença

MIT © 2026 — Gabriel Maximino Rascão Pereira, Luiz Roberto Moretti Cavelagna, Matheus Henrique Ferreira Neves, Vinicius Martins Freire
