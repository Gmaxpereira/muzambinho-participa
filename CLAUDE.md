# CLAUDE.md — Muzambinho Participa

## Resumo do Projeto

"Muzambinho Participa" é um MVP de demonstração para a Etapa 4 da disciplina de Cidades Inteligentes do IFSULDEMINAS — câmpus Muzambinho. É uma plataforma híbrida de participação popular que permite aos cidadãos registrar ocorrências urbanas (resíduos, esgoto, drenagem), acompanhar indicadores ISO 37120/22/23 em tempo real e participar de consultas públicas que alimentam diretamente o Plano Diretor de Drenagem. O arranjo é tripartite: Prefeitura + Universidade + Sociedade Civil, operando nos níveis de informação, consulta e colaboração da escada de Arnstein (1969).

---

## Os 3 Desafios Prioritários

### D1 — Resíduos Sólidos (cor: #B8893C âmbar)
- 2.111 habitantes sem coleta regular
- Ausência completa de coleta seletiva no município
- **Indicadores ISO:**
  - `ISO 37120:16.1` — % de domicílios com serviço de coleta (atual: 76%, meta: 95%)
  - `ISO 37120:16.2` — % de resíduos sólidos urbanos aterrados (referência)
  - `ISO 37122:16.1` — Resíduos tratados por compostagem ou digestão anaeróbica (ausente)

### D2 — Esgotamento Sanitário (cor: #2E5B7E azul aço)
- Apenas 42,6% de cobertura de rede coletora (→ 46,8% projetado)
- 100% do esgoto coletado lançado in natura — ausência de tratamento
- **Indicadores ISO:**
  - `ISO 37120:20.1` — % de domicílios com coleta de esgotos (atual: 46,8%)
  - `ISO 37120:20.2` — % de esgotos tratados antes do lançamento (atual: 0%)
  - `ISO 37122:20.1` — % de lodo de ETE tratado e reutilizado (ausente)

### D3 — Drenagem Urbana (cor: #C2532E terracota)
- 47,2% de déficit em rede pluvial
- Ausência de mapeamento de áreas de risco de inundação
- **Indicadores ISO:**
  - `ISO 37123:13.3` — Pontos de inundação/alagamento mapeados (atual: 52, crescente)
  - `ISO 37123:13.1` — % de área urbana com sistema de drenagem adequado
  - `ISO 37122:11.2` — Plano de resiliência a desastres (Plano Diretor de Drenagem pendente)

---

## Stack e Versões

| Tecnologia | Versão | Observação |
|---|---|---|
| Vite | 6.x | Plugin react (@vitejs/plugin-react) |
| React | 18.x | StrictMode ativado |
| TypeScript | 5.x | strict mode |
| Tailwind CSS | 4.x | Configurado via @theme no globals.css; plugin @tailwindcss/vite |
| shadcn/ui | latest | style: base-nova; components.json na raiz |
| react-router-dom | 7.x | BrowserRouter, Routes/Route |
| react-leaflet | 5.x | MapContainer + TileLayer |
| leaflet | 1.9.x | @types/leaflet instalado |
| recharts | 2.x | LineChart, PieChart, BarChart |
| lucide-react | latest | Tree-shaken por default |
| @fontsource/fraunces | latest | Importado em globals.css |
| @fontsource/dm-sans | latest | Importado em globals.css |
| clsx + tailwind-merge | latest | Usados via @/lib/utils.ts#cn() |

---

## Paleta de Cores (CSS Variables)

Definidas em `src/styles/globals.css` via `@theme {}`:

```css
--color-paper:        #F4EFE6   /* fundo geral da página */
--color-surface:      #FBF7EF   /* cards, header, painel lateral */
--color-ink:          #1F2419   /* texto principal */
--color-ink-soft:     #3D4435   /* texto secundário */
--color-primary:      #2D4A2B   /* verde floresta — cor principal */
--color-primary-soft: #4A6E45   /* verde mais claro — hover, destaques */
--color-accent:       #C2532E   /* terracota — CTAs, destaques */
--color-muted:        #8B8678   /* texto desabilitado, metadados */
--color-line:         #E3DBC9   /* bordas, divisores */
--color-d1:           #B8893C   /* D1 Resíduos — âmbar */
--color-d2:           #2E5B7E   /* D2 Esgoto — azul aço */
--color-d3:           #C2532E   /* D3 Drenagem — terracota (= accent) */
```

Em Tailwind CSS v4, estas variáveis ficam disponíveis como classes utilitárias:
- `bg-paper`, `bg-surface`, `bg-primary`, `bg-accent`, `bg-d1`, `bg-d2`, `bg-d3`
- `text-ink`, `text-ink-soft`, `text-muted`, `text-primary`, `text-accent`
- `border-line`

---

## Tipografia

```css
--font-display: "Fraunces", Georgia, serif  /* títulos, classe: font-display */
--font-sans:    "DM Sans", system-ui, sans-serif  /* corpo (padrão) */
--font-mono:    "JetBrains Mono", monospace  /* badges, labels, coordenadas */
```

Uso: `font-display` via classe CSS; `font-mono` via classe Tailwind `font-mono`.

---

## Coordenadas do Mapa

```
lat: -21.3697
lng: -46.5275
zoom inicial: 13
municipio: Muzambinho/MG
área: 410 km²
```

Para react-leaflet:
```tsx
<MapContainer center={[-21.3697, -46.5275]} zoom={13}>
```

---

## Convenções de Código

- **Componentes**: PascalCase — `OccurrenceCard.tsx`, `MapView.tsx`
- **Hooks**: prefixo `use` — `useOccurrences.ts`, `useMapFilter.ts`
- **Mocks**: funções async retornando `Promise<T>` com `setTimeout` de 200–500ms e `localStorage` para persistência entre reloads
- **Imports**: alias absoluto `@/` aponta para `src/` — sempre preferir `import X from '@/components/X'`
- **Utilitário de classe**: usar `cn()` de `@/lib/utils` (clsx + tailwind-merge)
- **Nenhum comentário explicando "o que"**: apenas comentários para invariantes não óbvias

---

## Estrutura de Pastas

```
src/
├── components/   # Reutilizáveis: Header, Footer, FilterPill, StatusBadge
│   └── ui/       # Componentes shadcn/ui gerados via CLI
├── pages/        # Uma por rota: HomePage, MapaPage, PainelPage, ConsultasPage, SobrePage
├── features/     # Domínio: OccurrenceCard, MapView, KPI, ConsultationRow, RegisterModal
├── mocks/        # index.ts — serviços async (drop-in para Supabase no futuro)
├── types/        # index.ts — interfaces TypeScript
├── lib/          # utils.ts (cn), formatters.ts
└── styles/       # globals.css — @theme + CSS variables + Tailwind imports
```

---

## Convenção de Branches

```
feat/nome-da-tarefa    # nova funcionalidade
fix/nome-do-bug        # correção de bug
style/ajuste-visual    # CSS/visual sem lógica
refactor/melhoria      # refatoração
docs/atualização       # documentação
```

## Convenção de Commits (Conventional Commits)

```
feat: adiciona mapa interativo com react-leaflet
fix: corrige filtro de ocorrências por categoria
style: ajusta paleta de cores no painel
docs: atualiza README com instruções de instalação
refactor: extrai lógica de mock para serviços separados
```

---

## Regra Visual Obrigatória

> **Antes de criar qualquer componente de UI novo, consulte `_reference/MuzambinhoParticipa.jsx`.**
> Ele é a fonte de verdade visual do projeto: paleta, tipografia, layout, animações e UX estão todos definidos nesse arquivo. Manter consistência visual com o protótipo é requisito da banca.

---

## Sobre os Dados Mock

Este é um **MVP de demonstração para banca acadêmica**. Dados mock são esperados e aceitos. Os serviços em `src/mocks/index.ts` usam `localStorage` para persistência entre reloads, simulando uma API real. A arquitetura foi desenhada para facilitar a troca por Supabase no futuro: basta refatorar as funções em `mocks/index.ts` para chamadas à API real, sem tocar nos componentes.
