import { createContext, useContext, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import confetti from 'canvas-confetti'
import { CheckCircle2 } from 'lucide-react'
import type { Occurrence } from '@/types'
import RegisterOccurrenceDialog from '@/features/RegisterOccurrenceDialog'

interface RegisterOccurrenceContextType {
  openRegister: (onCreated?: (occ: Occurrence) => void) => void
}

const RegisterOccurrenceContext = createContext<RegisterOccurrenceContextType>({
  openRegister: () => {},
})

export function useRegisterOccurrence() {
  return useContext(RegisterOccurrenceContext)
}

export function RegisterOccurrenceProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const callbackRef = useRef<((occ: Occurrence) => void) | undefined>(undefined)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function openRegister(onCreated?: (occ: Occurrence) => void) {
    callbackRef.current = onCreated
    setOpen(true)
  }

  function handleCreated(occ: Occurrence) {
    setOpen(false)

    confetti({
      particleCount: 80,
      spread: 60,
      colors: ['#B8893C', '#2E5B7E', '#C2532E'],
      origin: { y: 0.7 },
    })

    const onMapa = pathname === '/mapa'
    toast.success('Ocorrência registrada! Obrigado por participar.', {
      icon: <CheckCircle2 size={16} style={{ color: '#15803D' }} />,
      action: onMapa ? undefined : {
        label: 'Ver no mapa →',
        onClick: () => navigate('/mapa'),
      },
    })

    if (callbackRef.current) {
      callbackRef.current(occ)
      callbackRef.current = undefined
    }
  }

  return (
    <RegisterOccurrenceContext.Provider value={{ openRegister }}>
      {children}
      <RegisterOccurrenceDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreated={handleCreated}
      />
    </RegisterOccurrenceContext.Provider>
  )
}
