import { createContext, useContext, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
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
    if (callbackRef.current) {
      callbackRef.current(occ)
      callbackRef.current = undefined
      toast.success('Ocorrência registrada com sucesso!')
    } else {
      const onMapa = pathname === '/mapa'
      toast.success('Ocorrência registrada com sucesso!', {
        action: onMapa ? undefined : {
          label: 'Ver no mapa →',
          onClick: () => navigate('/mapa'),
        },
      })
    }
    setOpen(false)
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
