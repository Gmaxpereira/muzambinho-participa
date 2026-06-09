import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import { palette } from '@/lib/palette'

export default function NotFoundPage() {
  return (
    <section
      className="flex flex-col items-center justify-center text-center px-6 py-32 min-h-[60vh]"
      style={{ background: palette.paper }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-md"
      >
        <div
          className="mx-auto mb-6 flex items-center justify-center"
          style={{
            width: 64,
            height: 64,
            background: `${palette.primary}12`,
            borderRadius: 16,
          }}
        >
          <MapPin size={28} style={{ color: palette.primary }} />
        </div>

        <div
          className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: palette.muted }}
        >
          Erro 404
        </div>

        <h1
          className="font-display text-4xl lg:text-5xl font-medium mb-4"
          style={{ color: palette.ink }}
        >
          Página não encontrada.
        </h1>

        <p
          className="text-base leading-relaxed mb-10"
          style={{ color: palette.inkSoft }}
        >
          Este endereço não existe na plataforma. Talvez você tenha digitado algo errado
          ou o conteúdo foi movido.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: palette.accent, color: palette.surface }}
        >
          Voltar ao início
        </Link>
      </motion.div>
    </section>
  )
}
