import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, Camera, Send, Trash2, Droplets, CloudRain } from 'lucide-react'
import { toast } from 'sonner'
import type { Category, Occurrence } from '@/types'
import { createOccurrence } from '@/mocks'
import { palette } from '@/lib/palette'

const categoryMeta: Record<Category, { label: string; color: string; icon: React.ComponentType<{ size?: number }> }> = {
  d1: { label: 'Resíduos', color: palette.d1, icon: Trash2 },
  d2: { label: 'Esgoto / Água', color: palette.d2, icon: Droplets },
  d3: { label: 'Drenagem', color: palette.d3, icon: CloudRain },
}

interface RegisterOccurrenceDialogProps {
  open: boolean
  onClose: () => void
  onCreated: (occ: Occurrence) => void
}

export default function RegisterOccurrenceDialog({ open, onClose, onCreated }: RegisterOccurrenceDialogProps) {
  const [type, setType] = useState<Category>('d1')
  const [title, setTitle] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [loading, setLoading] = useState(false)

  function reset() {
    setType('d1')
    setTitle('')
    setNeighborhood('')
    setLoading(false)
  }

  function handleOpenChange(val: boolean) {
    if (!val) { reset(); onClose() }
  }

  async function handleSubmit() {
    if (!title.trim() || !neighborhood.trim()) return
    setLoading(true)
    try {
      const occ = await createOccurrence({ type, title, neighborhood })
      onCreated(occ)
      reset()
      onClose()
    } catch {
      toast.error('Erro ao registrar ocorrência. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-[1500] fade-in"
          style={{ background: 'rgba(31,36,25,0.55)' }}
        />
        <Dialog.Content
          className="fixed z-[1500] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-lg p-6 sm:p-8 fade-in overflow-y-auto max-h-[90vh]"
          style={{
            background: palette.surface,
            borderRadius: 4,
            border: `1px solid ${palette.line}`,
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div
                className="font-mono text-xs tracking-wider uppercase mb-2 font-bold"
                style={{ color: palette.accent }}
              >
                Nova ocorrência
              </div>
              <Dialog.Title
                className="font-display text-2xl font-medium"
                style={{ color: palette.ink }}
              >
                Descreva o que você viu
              </Dialog.Title>
            </div>
            <Dialog.Close aria-label="Fechar formulário" style={{ cursor: 'pointer' }}>
              <X size={18} style={{ color: palette.muted }} />
            </Dialog.Close>
          </div>

          {/* Categoria */}
          <div className="mb-5">
            <label
              className="font-mono text-sm tracking-wider uppercase block mb-2 font-bold"
              style={{ color: palette.accent }}
            >
              Categoria
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.entries(categoryMeta) as [Category, typeof categoryMeta[Category]][]).map(([k, m]) => {
                const Icon = m.icon
                const active = type === k
                return (
                  <button
                    key={k}
                    onClick={() => setType(k)}
                    className="py-3 px-2 rounded text-xs font-medium transition flex flex-col items-center gap-1.5"
                    style={{
                      background: active ? m.color : 'transparent',
                      color: active ? palette.surface : palette.inkSoft,
                      border: `1px solid ${active ? m.color : palette.line}`,
                      cursor: 'pointer',
                    }}
                  >
                    <Icon size={16} />
                    {m.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Descrição */}
          <div className="mb-4">
            <label
              className="font-mono text-sm tracking-wider uppercase block mb-2 font-bold"
              style={{ color: palette.accent }}
            >
              Descrição breve
            </label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex.: Alagamento na Rua das Acácias"
              className="w-full px-4 py-3 text-sm rounded outline-none"
              style={{
                background: palette.paper,
                border: `1px solid ${palette.line}`,
                color: palette.ink,
              }}
            />
          </div>

          {/* Bairro */}
          <div className="mb-5">
            <label
              className="font-mono text-sm tracking-wider uppercase block mb-2 font-bold"
              style={{ color: palette.accent }}
            >
              Bairro ou comunidade
            </label>
            <input
              value={neighborhood}
              onChange={e => setNeighborhood(e.target.value)}
              placeholder="Ex.: Centro / Comunidade Boa Esperança"
              className="w-full px-4 py-3 text-sm rounded outline-none"
              style={{
                background: palette.paper,
                border: `1px solid ${palette.line}`,
                color: palette.ink,
              }}
            />
          </div>

          {/* Foto mock */}
          <div className="mb-6">
            <div
              className="flex items-center justify-center gap-2 py-6 text-sm rounded cursor-pointer transition hover:opacity-80"
              style={{
                background: palette.paper,
                border: `1px dashed ${palette.line}`,
                color: palette.muted,
              }}
            >
              <Camera size={16} />
              Anexar foto e localização (mock)
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading || !title.trim() || !neighborhood.trim()}
            className="w-full py-3 rounded text-sm font-medium tracking-wider uppercase transition hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50"
            style={{ background: palette.accent, color: palette.surface, cursor: 'pointer' }}
          >
            <Send size={14} />
            {loading ? 'Localizando...' : 'Enviar ocorrência'}
          </button>

          <div
            className="text-[10px] mt-3 text-center"
            style={{ color: palette.muted }}
          >
            Sua contribuição alimenta os indicadores ISO 37120/22/23 do município.
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
