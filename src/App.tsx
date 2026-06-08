import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import MapaPage from '@/pages/MapaPage'
import PainelPage from '@/pages/PainelPage'
import ConsultasPage from '@/pages/ConsultasPage'
import SobrePage from '@/pages/SobrePage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/mapa" element={<MapaPage />} />
        <Route path="/painel" element={<PainelPage />} />
        <Route path="/consultas" element={<ConsultasPage />} />
        <Route path="/sobre" element={<SobrePage />} />
      </Route>
    </Routes>
  )
}
