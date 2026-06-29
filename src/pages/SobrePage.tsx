import { Building2, GraduationCap, Users } from 'lucide-react'
import { motion, type Variants } from 'motion/react'
import { palette } from '@/lib/palette'
import ArnsteinLadder from '@/features/ArnsteinLadder'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const challenges = [
  {
    code: 'D1',
    title: 'Resíduos Sólidos',
    color: palette.d1,
    stats: ['2.111 habitantes sem coleta regular', 'Ausência de coleta seletiva no município'],
    iso: 'ISO 37120 · 16.1',
  },
  {
    code: 'D2',
    title: 'Esgotamento Sanitário',
    color: palette.d2,
    stats: ['42,6% de cobertura de rede coletora', '100% do esgoto lançado in natura'],
    iso: 'ISO 37120 · 20.1',
  },
  {
    code: 'D3',
    title: 'Drenagem Urbana',
    color: palette.d3,
    stats: ['47,2% de déficit em rede pluvial', 'Ausência de mapeamento de áreas de risco'],
    iso: 'ISO 37123 · 13.3',
  },
]

const institutionalActors = [
  {
    icon: Building2,
    title: 'Prefeitura',
    subtitle: 'Muzambinho / MG',
    desc: 'Disponibiliza dados administrativos, valida ocorrências registradas e incorpora os resultados ao planejamento municipal.',
  },
  {
    icon: GraduationCap,
    title: 'Universidade',
    subtitle: 'PUC Minas - Campus Poços de Caldas',
    desc: 'Responsável pela pesquisa, desenvolvimento e manutenção da plataforma dentro da disciplina de Cidades Inteligentes.',
  },
  {
    icon: Users,
    title: 'Sociedade Civil',
    subtitle: 'Cidadãos de Muzambinho',
    desc: 'Registra ocorrências urbanas, vota em consultas públicas e participa das oficinas presenciais de cartografia social.',
  },
]

const normativeBase = [
  { norm: 'ABNT NBR ISO 37120:2021', desc: 'Indicadores de serviços urbanos e qualidade de vida' },
  { norm: 'ABNT NBR ISO 37122:2020', desc: 'Indicadores para cidades inteligentes' },
  { norm: 'ABNT NBR ISO 37123:2021', desc: 'Indicadores para cidades resilientes' },
  { norm: 'Estatuto da Cidade', desc: 'Lei 10.257/2001 — participação popular no planejamento urbano' },
]

const team = [
  'Gabriel Maximino Rascão Pereira',
  'Luiz Roberto Moretti Cavelagna',
  'Matheus Henrique Ferreira Neves',
  'Vinicius Martins Freire',
]

const divider = (
  <div style={{ height: 1, background: palette.line, margin: '60px 0' }} />
)

const sectionLabelClass = 'font-mono text-base tracking-[0.25em] uppercase mb-3 font-bold'

export default function SobrePage() {
  return (
    <article className="max-w-3xl mx-auto px-6 lg:px-0 py-20">

      {/* ── Hero ── */}
      <motion.div className="mb-14" variants={stagger} initial="hidden" animate="visible">
        <motion.div
          variants={fadeUp}
          className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: palette.accent }}
        >
          Sobre o projeto
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl lg:text-5xl font-medium leading-[1.05] mb-6"
          style={{ color: palette.ink }}
        >
          Por que{' '}
          <em style={{ color: palette.primary, fontStyle: 'italic' }}>Muzambinho</em>{' '}
          Participa?
        </motion.h1>
        <motion.p variants={fadeUp} className="text-lg leading-relaxed" style={{ color: palette.inkSoft }}>
          MVP de participação popular desenvolvido para a Etapa 4 da disciplina de
          Cidades Inteligentes da PUC Minas - Campus Poços de Caldas. A plataforma
          híbrida permite aos cidadãos registrar ocorrências urbanas, acompanhar
          indicadores ISO 37120/22/23 em tempo real e participar de consultas
          públicas que alimentam diretamente o Plano Diretor de Drenagem.
        </motion.p>
      </motion.div>

      {divider}

      {/* ── Os 3 Desafios ── */}
      <section className="mb-14">
        <div className={sectionLabelClass} style={{ color: palette.accent }}>
          Diagnóstico — Etapa 2
        </div>
        <h2
          className="font-display text-2xl lg:text-3xl font-medium mb-8"
          style={{ color: palette.ink }}
        >
          Os 3 desafios prioritários
        </h2>

        <motion.div
          className="grid sm:grid-cols-3 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {challenges.map(c => (
            <motion.div
              key={c.code}
              variants={fadeUp}
              className="p-6"
              style={{
                border: `1px solid ${c.color}40`,
                borderLeft: `3px solid ${c.color}`,
                borderRadius: 4,
                background: `${c.color}06`,
              }}
            >
              <div
                className="font-mono text-xs font-bold tracking-wider uppercase mb-1"
                style={{ color: c.color }}
              >
                {c.code}
              </div>
              <div className="font-medium text-base mb-3" style={{ color: palette.ink }}>
                {c.title}
              </div>
              <ul className="space-y-1">
                {c.stats.map(s => (
                  <li key={s} className="text-sm leading-snug" style={{ color: palette.inkSoft }}>
                    · {s}
                  </li>
                ))}
              </ul>
              <div
                className="font-mono text-xs mt-3 tracking-wider"
                style={{ color: c.color, opacity: 0.8 }}
              >
                {c.iso}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {divider}

      {/* ── Como funciona ── */}
      <section className="mb-14">
        <div className={sectionLabelClass} style={{ color: palette.accent }}>
          Metodologia
        </div>
        <h2
          className="font-display text-2xl lg:text-3xl font-medium mb-8"
          style={{ color: palette.ink }}
        >
          Como funciona
        </h2>

        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <div
              className="font-mono text-[12px] tracking-widest uppercase font-semibold mb-4 inline-flex items-center"
              style={{
                background: palette.accent,
                color: '#fff',
                padding: '5px 14px',
                borderRadius: 999,
              }}
            >
              Componente digital
            </div>
            <h3
              className="font-display text-xl font-medium mb-3"
              style={{ color: palette.ink }}
            >
              Plataforma web
            </h3>
            <ul className="space-y-2 text-base" style={{ color: palette.inkSoft }}>
              <li>— Mapa colaborativo de ocorrências urbanas georreferenciadas</li>
              <li>— Painel de indicadores ISO em tempo real</li>
              <li>— Consultas públicas com votação e persistência</li>
              <li>— Exportação de dados para uso no planejamento municipal</li>
            </ul>
          </div>
          <div>
            <div
              className="font-mono text-[12px] tracking-widest uppercase font-semibold mb-4 inline-flex items-center"
              style={{
                background: palette.primary,
                color: '#fff',
                padding: '5px 14px',
                borderRadius: 999,
              }}
            >
              Componente presencial
            </div>
            <h3
              className="font-display text-xl font-medium mb-3"
              style={{ color: palette.ink }}
            >
              Oficinas de cartografia social
            </h3>
            <ul className="space-y-2 text-base" style={{ color: palette.inkSoft }}>
              <li>— Encontros com comunidades em território</li>
              <li>— Coleta qualitativa de dados de percepção de risco</li>
              <li>— Mapeamento participativo que complementa os registros digitais</li>
              <li>— Formação da base para o Plano Diretor de Drenagem</li>
            </ul>
          </div>
        </div>
      </section>

      {divider}

      {/* ── Escada de Arnstein ── */}
      <section className="mb-14">
        <div className={sectionLabelClass} style={{ color: palette.accent }}>
          Fundamentação teórica
        </div>
        <h2
          className="font-display text-2xl lg:text-3xl font-medium mb-2"
          style={{ color: palette.ink }}
        >
          A Escada de Arnstein (1969)
        </h2>
        <p className="text-base mb-8" style={{ color: palette.muted }}>
          8 degraus de participação, do controle institucional ao poder cidadão efetivo.
          A plataforma opera nos níveis de <strong style={{ color: palette.primary }}>Informação</strong>,{' '}
          <strong style={{ color: palette.primary }}>Consulta</strong> e{' '}
          <strong style={{ color: palette.accent }}>Parceria</strong>.
        </p>

        <ArnsteinLadder />

        <p className="text-base leading-relaxed mt-8" style={{ color: palette.inkSoft }}>
          Referência: ARNSTEIN, Sherry R. A Ladder of Citizen Participation.{' '}
          <em>Journal of the American Planning Association</em>, v. 35, n. 4, p. 216–224, 1969.
        </p>
      </section>

      {divider}

      {/* ── Arranjo Institucional ── */}
      <section className="mb-14">
        <div className={sectionLabelClass} style={{ color: palette.accent }}>
          Governança
        </div>
        <h2
          className="font-display text-2xl lg:text-3xl font-medium mb-8"
          style={{ color: palette.ink }}
        >
          Arranjo institucional tripartite
        </h2>

        <div className="grid sm:grid-cols-3 gap-4">
          {institutionalActors.map(actor => {
            const Icon = actor.icon
            return (
              <div
                key={actor.title}
                className="p-6"
                style={{
                  background: palette.surface,
                  border: `1px solid ${palette.line}`,
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: `${palette.primary}1A`,
                    color: palette.primary,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div className="font-display text-lg font-medium mb-0.5" style={{ color: palette.ink }}>
                  {actor.title}
                </div>
                <div className="font-mono text-[13px] tracking-wider uppercase mb-3" style={{ color: palette.muted }}>
                  {actor.subtitle}
                </div>
                <p className="text-base leading-relaxed" style={{ color: palette.inkSoft }}>
                  {actor.desc}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {divider}

      {/* ── Base Normativa ── */}
      <section className="mb-14">
        <div className={sectionLabelClass} style={{ color: palette.accent }}>
          Referências normativas
        </div>
        <h2
          className="font-display text-2xl lg:text-3xl font-medium mb-8"
          style={{ color: palette.ink }}
        >
          Base normativa
        </h2>

        <ul className="space-y-5">
          {normativeBase.map(item => (
            <li key={item.norm} className="flex items-start gap-4">
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: palette.accent,
                  borderRadius: '50%',
                  marginTop: 9,
                  flexShrink: 0,
                }}
              />
              <div>
                <span className="font-mono text-sm font-semibold" style={{ color: palette.ink }}>
                  {item.norm}
                </span>
                <span className="text-base ml-2" style={{ color: palette.muted }}>
                  — {item.desc}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {divider}

      {/* ── Equipe ── */}
      <section>
        <div className={sectionLabelClass} style={{ color: palette.accent }}>
          Autores
        </div>
        <h2
          className="font-display text-2xl lg:text-3xl font-medium mb-8"
          style={{ color: palette.ink }}
        >
          Equipe
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {team.map(name => {
            const initial = name.charAt(0)
            return (
              <div
                key={name}
                className="flex items-center gap-4 p-5"
                style={{
                  background: palette.surface,
                  border: `1px solid ${palette.line}`,
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: palette.primary,
                    color: palette.surface,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: 18,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {initial}
                </div>
                <div>
                  <div className="font-medium text-base" style={{ color: palette.ink }}>
                    {name}
                  </div>
                  <div className="font-mono text-[13px] tracking-wider uppercase mt-0.5" style={{ color: palette.muted }}>
                    Cidades Inteligentes · 2026
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className="mt-12 pt-6 flex flex-wrap items-center justify-between gap-2 font-mono text-xs tracking-widest uppercase"
          style={{ borderTop: `1px solid ${palette.line}`, color: palette.muted }}
        >
          <span>MVP · Etapa 4 · 2026</span>
          <span>PUC Minas — Poços de Caldas / MG</span>
        </div>
      </section>
    </article>
  )
}
