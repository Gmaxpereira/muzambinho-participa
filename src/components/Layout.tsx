import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { RegisterOccurrenceProvider } from '@/contexts/RegisterOccurrenceContext'

export default function Layout() {
  return (
    <RegisterOccurrenceProvider>
      <div
        className="min-h-screen flex flex-col"
        style={{ background: 'var(--color-paper)', color: 'var(--color-ink)' }}
      >
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </RegisterOccurrenceProvider>
  )
}
