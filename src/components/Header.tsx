import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Send, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Mapa', to: '/mapa' },
  { label: 'Painel', to: '/painel' },
  { label: 'Consultas', to: '/consultas' },
  { label: 'Sobre', to: '/sobre' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="grain sticky top-0 z-40"
      style={{
        borderBottom: '1px solid var(--color-line)',
        background: 'var(--color-surface)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div
            style={{
              width: 36,
              height: 36,
              background: 'var(--color-primary)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <MapPin size={18} color="var(--color-surface)" />
          </div>
          <div>
            <div
              className="font-display font-bold text-lg leading-none"
              style={{ color: 'var(--color-primary)' }}
            >
              Muzambinho
            </div>
            <div
              className="font-mono text-[10px] tracking-widest uppercase"
              style={{ color: 'var(--color-muted)' }}
            >
              Participa · MG
            </div>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm"
          style={{ color: 'var(--color-ink-soft)' }}
        >
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="hover:opacity-70 transition-opacity no-underline"
              style={{ color: 'inherit' }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-accent)', color: 'var(--color-surface)' }}
            onClick={() => {/* RegisterModal será conectado aqui */}}
          >
            <Send size={14} />
            <span className="hidden sm:inline">Registrar</span>
          </button>

          {/* Hamburger mobile */}
          <button
            className="md:hidden p-2 rounded transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-ink-soft)' }}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Nav mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{
            borderColor: 'var(--color-line)',
            background: 'var(--color-surface)',
          }}
        >
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-sm font-medium no-underline hover:opacity-70 transition-opacity"
              style={{ color: 'var(--color-ink-soft)' }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
