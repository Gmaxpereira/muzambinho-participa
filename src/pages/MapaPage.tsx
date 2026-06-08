import { useState, useMemo, useEffect } from 'react'
import type { Occurrence, CategoryFilter } from '@/types'
import { getOccurrences } from '@/mocks'
import { palette } from '@/lib/palette'
import FilterPill from '@/features/FilterPill'
import MapView from '@/features/MapView'
import OccurrenceRow from '@/features/OccurrenceRow'
import OccurrenceDetail from '@/features/OccurrenceDetail'
import RegisterOccurrenceDialog from '@/features/RegisterOccurrenceDialog'

const FILTERS: { key: CategoryFilter; label: string; color?: string }[] = [
  { key: 'all', label: 'Tudo' },
  { key: 'd1', label: 'Resíduos', color: palette.d1 },
  { key: 'd2', label: 'Esgoto / Água', color: palette.d2 },
  { key: 'd3', label: 'Drenagem', color: palette.d3 },
]

export default function MapaPage() {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([])
  const [filter, setFilter] = useState<CategoryFilter>('all')
  const [selectedPin, setSelectedPin] = useState<Occurrence | null>(null)
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    getOccurrences().then(setOccurrences)
  }, [])

  const filtered = useMemo(
    () => filter === 'all' ? occurrences : occurrences.filter(o => o.type === filter),
    [filter, occurrences],
  )

  function handleFilterChange(f: CategoryFilter) {
    setFilter(f)
    setSelectedPin(null)
  }

  function handlePinClick(occ: Occurrence) {
    setSelectedPin(prev => prev?.id === occ.id ? null : occ)
  }

  function handleCreated(occ: Occurrence) {
    setOccurrences(prev => [occ, ...prev])
    setShowRegister(false)
  }

  const filterLabels: Record<CategoryFilter, string> = {
    all: `Tudo · ${occurrences.length}`,
    d1: `Resíduos · ${occurrences.filter(o => o.type === 'd1').length}`,
    d2: `Esgoto / Água · ${occurrences.filter(o => o.type === 'd2').length}`,
    d3: `Drenagem · ${occurrences.filter(o => o.type === 'd3').length}`,
  }

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
        <div>
          <div
            className="font-mono text-xs tracking-[0.3em] uppercase mb-2"
            style={{ color: palette.muted }}
          >
            Mapa colaborativo
          </div>
          <h1
            className="font-display text-3xl lg:text-4xl font-medium"
            style={{ color: palette.ink }}
          >
            Ocorrências reportadas pela população
          </h1>
        </div>

        {/* Filter pills — horizontal scroll on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-1 flex-nowrap max-w-full">
          {FILTERS.map(f => (
            <FilterPill
              key={f.key}
              active={filter === f.key}
              onClick={() => handleFilterChange(f.key)}
              label={filterLabels[f.key]}
              color={f.color}
            />
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Map — 8 cols */}
        <div className="lg:col-span-8">
          <MapView
            occurrences={filtered}
            selectedPinId={selectedPin?.id ?? null}
            onPinClick={handlePinClick}
            onRegisterClick={() => setShowRegister(true)}
          />
        </div>

        {/* Sidebar — 4 cols */}
        <div className="lg:col-span-4">
          <div
            className="p-5"
            style={{
              background: palette.surface,
              border: `1px solid ${palette.line}`,
              borderRadius: 4,
            }}
          >
            {selectedPin ? (
              <OccurrenceDetail
                occ={selectedPin}
                onClose={() => setSelectedPin(null)}
              />
            ) : (
              <>
                <div
                  className="font-mono text-[10px] tracking-widest uppercase mb-3"
                  style={{ color: palette.muted }}
                >
                  Últimas {Math.min(filtered.length, 5)} ocorrências
                </div>
                {filtered.length === 0 ? (
                  <p className="text-sm" style={{ color: palette.muted }}>
                    Nenhuma ocorrência nesta categoria.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {filtered.slice(0, 5).map(o => (
                      <OccurrenceRow key={o.id} occ={o} onClick={() => handlePinClick(o)} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <RegisterOccurrenceDialog
        open={showRegister}
        onClose={() => setShowRegister(false)}
        onCreated={handleCreated}
      />
    </section>
  )
}
