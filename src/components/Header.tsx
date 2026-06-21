import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MapPin, Send, Menu, X, User } from 'lucide-react'
import { useRegisterOccurrence } from '@/contexts/RegisterOccurrenceContext'
import MyParticipationPanel from '@/features/MyParticipationPanel'

const navLinks = [
  { label: 'Mapa', to: '/mapa' },
  { label: 'Painel', to: '/painel' },
  { label: 'Consultas', to: '/consultas' },
  { label: 'Sobre', to: '/sobre' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const { pathname } = useLocation()
  const { openRegister } = useRegisterOccurrence()

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
          className="hidden md:flex items-center gap-8 text-base"
          style={{ color: 'var(--color-ink-soft)' }}
        >
          {navLinks.map(({ label, to }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className="hover:opacity-70 transition-opacity no-underline font-medium"
                style={{ color: active ? 'var(--color-accent)' : 'inherit' }}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Minha participação */}
          <button
            onClick={() => setPanelOpen(true)}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
            style={{
              background: 'transparent',
              border: '1px solid var(--color-line)',
              color: 'var(--color-ink-soft)',
              cursor: 'pointer',
            }}
            title="Minha participação"
          >
            <User size={14} />
            <span>Minha participação</span>
          </button>
          {/* Ícone apenas em mobile */}
          <button
            onClick={() => setPanelOpen(true)}
            className="md:hidden flex items-center justify-center p-2 rounded-full transition-opacity hover:opacity-80"
            style={{
              border: '1px solid var(--color-line)',
              color: 'var(--color-ink-soft)',
              cursor: 'pointer',
            }}
            aria-label="Minha participação"
          >
            <User size={16} />
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-accent)', color: 'var(--color-surface)', cursor: 'pointer' }}
            onClick={() => openRegister()}
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
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Nav mobile dropdown */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          aria-label="Navegação mobile"
          style={{
            borderColor: 'var(--color-line)',
            background: 'var(--color-surface)',
          }}
        >
          {navLinks.map(({ label, to }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className="text-base font-medium no-underline hover:opacity-70 transition-opacity"
                style={{ color: active ? 'var(--color-accent)' : 'var(--color-ink-soft)' }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            )
          })}
          <button
            className="text-base font-medium text-left hover:opacity-70 transition-opacity"
            style={{ color: 'var(--color-ink-soft)' }}
            onClick={() => { setMenuOpen(false); setPanelOpen(true) }}
          >
            Minha participação
          </button>
        </nav>
      )}

      <MyParticipationPanel open={panelOpen} onClose={() => setPanelOpen(false)} />
    </header>
  )
}
