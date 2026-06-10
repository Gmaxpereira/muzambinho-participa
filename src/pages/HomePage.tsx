import { Link } from 'react-router-dom'
import { motion, type Variants } from 'motion/react'
import { Trash2, Droplets, CloudRain, ChevronRight, Camera, MapPin, TrendingUp } from 'lucide-react'
import Stat from '@/features/Stat'
import ChallengeCard from '@/features/ChallengeCard'
import KPICard from '@/features/KPICard'
import ChallengeProgressSection from '@/features/ChallengeProgressSection'
import { palette } from '@/lib/palette'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

// Pins mockados para o preview do mapa
const previewPins = [
  { id: 1, type: 'd1' as const, x: 22, y: 35 },
  { id: 2, type: 'd2' as const, x: 48, y: 55 },
  { id: 3, type: 'd3' as const, x: 45, y: 50 },
  { id: 4, type: 'd1' as const, x: 52, y: 45 },
]

const pinColors = { d1: palette.d1, d2: palette.d2, d3: palette.d3 }
const pinIcons  = { d1: Trash2, d2: Droplets, d3: CloudRain }

const kpis = [
  { label: 'Cobertura de coleta',            value: '76%',    delta: '+5pp em 6m',   iso: 'ISO 37120 · 16.1' },
  { label: 'Cobertura de esgoto',            value: '46,8%',  delta: '+4,2pp em 6m', iso: 'ISO 37120 · 20.1' },
  { label: 'Pontos de alagamento mapeados',  value: '52',     delta: 'novo cadastro', iso: 'ISO 37123 · 13.3' },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="grain max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-20">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          {/* Coluna esquerda */}
          <motion.div
            className="lg:col-span-8"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={fadeUp}
              className="font-mono text-xs tracking-[0.3em] uppercase mb-6"
              style={{ color: palette.accent }}
            >
              — Governo aberto · Etapa 4
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-display font-medium leading-[0.95] mb-8"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                color: palette.ink,
              }}
            >
              A cidade que você{' '}
              <em style={{ color: palette.accent, fontStyle: 'italic' }}>vive</em>,{' '}
              também é a{' '}
              <br />
              cidade que você{' '}
              <span style={{ color: palette.primary }}>desenha.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed max-w-2xl"
              style={{ color: palette.inkSoft }}
            >
              Plataforma híbrida de participação popular para fortalecer a gestão
              urbana de Muzambinho/MG. Registre ocorrências, acompanhe indicadores
              e ajude a construir o mapa de risco que o município ainda não tem.
            </motion.p>
          </motion.div>

          {/* Coluna direita — stats */}
          <motion.div
            className="lg:col-span-4 grid grid-cols-3 gap-4 lg:gap-2 lg:block lg:space-y-4"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}><Stat n="2.111" l="habitantes sem coleta regular" /></motion.div>
            <motion.div variants={fadeUp}><Stat n="42,6%" l="cobertura de esgoto" /></motion.div>
            <motion.div variants={fadeUp}><Stat n="47,2%" l="déficit de drenagem" /></motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── DESAFIOS ── */}
      <section style={{ borderTop: `1px solid ${palette.line}`, borderBottom: `1px solid ${palette.line}` }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <div
                className="font-mono text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: palette.muted }}
              >
                03 desafios prioritários
              </div>
              <h2
                className="font-display text-3xl lg:text-4xl font-medium"
                style={{ color: palette.ink }}
              >
                Diagnóstico ABNT NBR ISO 37120/22/23
              </h2>
            </div>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}>
              <ChallengeCard
                code="D1"
                title="Resíduos Sólidos"
                desc="2.111 habitantes sem coleta regular e ausência completa de coleta seletiva no município."
                icon={Trash2}
                color={palette.d1}
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <ChallengeCard
                code="D2"
                title="Esgotamento Sanitário"
                desc="Apenas 42,6% de cobertura e 100% do esgoto coletado lançado in natura."
                icon={Droplets}
                color={palette.d2}
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <ChallengeCard
                code="D3"
                title="Drenagem Urbana"
                desc="47,2% de déficit em rede pluvial e ausência de mapeamento de áreas de risco."
                icon={CloudRain}
                color={palette.d3}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="mb-12">
          <div
            className="font-mono text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: palette.muted }}
          >
            Participação cidadã
          </div>
          <h2
            className="font-display text-3xl lg:text-4xl font-medium mb-3"
            style={{ color: palette.ink }}
          >
            Participar é simples
          </h2>
          <p className="text-lg" style={{ color: palette.muted }}>
            Três passos para transformar sua experiência em política pública.
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-0 relative"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Linha tracejada — visível apenas em md+ */}
          <div
            className="hidden md:block absolute top-[38px] left-[calc(16.66%+20px)] right-[calc(16.66%+20px)]"
            style={{
              height: 1,
              borderTop: `2px dashed ${palette.line}`,
              zIndex: 0,
            }}
          />

          {[
            {
              step: '01',
              title: 'Registre',
              desc: 'Encontrou um problema? Registre a ocorrência com foto e localização, direto do celular.',
              Icon: Camera,
              bg: palette.accent,
            },
            {
              step: '02',
              title: 'Acompanhe',
              desc: 'Sua contribuição aparece no mapa colaborativo e alimenta os indicadores ISO do município.',
              Icon: MapPin,
              bg: palette.primary,
            },
            {
              step: '03',
              title: 'Transforme',
              desc: 'Os dados geram evidências para o Plano Diretor de Drenagem e a expansão da coleta de resíduos.',
              Icon: TrendingUp,
              bg: palette.d2,
            },
          ].map(({ step, title, desc, Icon, bg }) => (
            <motion.div
              key={step}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center px-8 py-2"
              style={{ zIndex: 1 }}
            >
              {/* Ícone */}
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  background: bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  flexShrink: 0,
                  boxShadow: `0 4px 16px ${bg}44`,
                }}
              >
                <Icon size={30} color="#fff" />
              </div>

              {/* Número do passo */}
              <div
                className="font-mono text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: palette.muted }}
              >
                Passo {step}
              </div>

              {/* Título */}
              <h3
                className="font-display text-2xl font-medium mb-3"
                style={{ color: palette.ink }}
              >
                {title}
              </h3>

              {/* Descrição */}
              <p className="text-base leading-relaxed" style={{ color: palette.inkSoft }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── PROGRESSO DOS DESAFIOS ── */}
      <ChallengeProgressSection />

      {/* ── PREVIEW MAPA ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div>
            <div
              className="font-mono text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: palette.muted }}
            >
              Mapa colaborativo
            </div>
            <h2
              className="font-display text-3xl lg:text-4xl font-medium"
              style={{ color: palette.ink }}
            >
              Ocorrências reportadas pela população
            </h2>
          </div>
          <Link
            to="/mapa"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: palette.accent, color: palette.surface }}
          >
            Ver mapa completo
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Canvas SVG do mapa */}
        <div
          className="map-bg relative overflow-hidden"
          style={{
            aspectRatio: '16 / 11',
            borderRadius: 4,
            border: `1px solid ${palette.line}`,
          }}
        >
          {/* SVG topográfico de fundo */}
          <svg
            viewBox="0 0 800 550"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="grid-home" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={palette.line} strokeWidth="0.5" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="800" height="550" fill="url(#grid-home)" />
            {/* Curvas topográficas */}
            <g fill="none" stroke={palette.primarySoft} strokeWidth="1" opacity="0.18">
              <path d="M 0 200 Q 200 150 400 220 T 800 180" />
              <path d="M 0 280 Q 200 230 400 300 T 800 260" />
              <path d="M 0 360 Q 200 310 400 380 T 800 340" />
              <path d="M 0 130 Q 200 80 400 150 T 800 110" />
            </g>
            {/* Rio */}
            <path
              d="M 100 0 Q 200 200 250 300 T 400 550"
              fill="none"
              stroke={palette.d2}
              strokeWidth="2"
              opacity="0.35"
            />
            {/* Área urbana */}
            <ellipse cx="400" cy="320" rx="120" ry="90" fill={palette.primary} opacity="0.06" />
            <text x="400" y="325" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={palette.muted} letterSpacing="3">
              SEDE URBANA
            </text>
            <text x="150" y="480" fontFamily="monospace" fontSize="9" fill={palette.muted} letterSpacing="2">
              ZONA RURAL
            </text>
            <text x="620" y="100" fontFamily="monospace" fontSize="9" fill={palette.muted} letterSpacing="2">
              COMUNIDADES
            </text>
          </svg>

          {/* Pins mockados */}
          {previewPins.map((pin) => {
            const color = pinColors[pin.type]
            const Icon = pinIcons[pin.type]
            return (
              <Link
                key={pin.id}
                to="/mapa"
                className="absolute -translate-x-1/2 -translate-y-1/2 pin-pulse"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                aria-label="Ver ocorrência no mapa"
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: color,
                    borderRadius: '50% 50% 50% 0',
                    transform: 'rotate(-45deg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 3px 8px rgba(0,0,0,0.18)`,
                    border: `2px solid ${palette.surface}`,
                  }}
                >
                  <Icon size={12} color={palette.surface} style={{ transform: 'rotate(45deg)' }} />
                </div>
              </Link>
            )
          })}

          {/* Badge inferior esquerdo */}
          <div
            className="absolute bottom-4 left-4 font-mono text-[10px] tracking-wider uppercase px-3 py-2 rounded"
            style={{
              background: `${palette.surface}EE`,
              color: palette.inkSoft,
              border: `1px solid ${palette.line}`,
            }}
          >
            Muzambinho/MG · 410 km² · {previewPins.length} ocorrências em destaque
          </div>

          {/* CTA inferior direito */}
          <Link
            to="/mapa"
            className="absolute bottom-4 right-4 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium shadow-lg transition-opacity hover:opacity-90"
            style={{ background: palette.ink, color: palette.surface }}
          >
            <Camera size={16} />
            Registrar nesta área
          </Link>
        </div>
      </section>

      {/* ── PREVIEW PAINEL ── */}
      <section style={{ background: palette.ink, color: palette.surface }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="mb-12">
            <div
              className="font-mono text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: palette.accent }}
            >
              Painel de transparência
            </div>
            <h2
              className="font-display text-3xl lg:text-5xl font-medium leading-[1]"
              style={{ color: palette.surface }}
            >
              Indicadores ISO 37120/22/23,
              <br />
              <em style={{ color: palette.accent, fontStyle: 'italic' }}>em tempo real.</em>
            </h2>
          </div>

          <motion.div
            className="grid lg:grid-cols-3 gap-6 mb-10"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {kpis.map((kpi) => (
              <motion.div key={kpi.iso} variants={fadeUp}>
                <KPICard {...kpi} />
              </motion.div>
            ))}
          </motion.div>

          <Link
            to="/painel"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: palette.accent, color: palette.surface }}
          >
            Ver painel completo
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
