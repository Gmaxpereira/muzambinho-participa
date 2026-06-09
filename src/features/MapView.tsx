import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Camera } from 'lucide-react'
import type { Occurrence } from '@/types'
import { palette } from '@/lib/palette'

// SVG icon paths for each category (inline, no lucide dependency in divIcon HTML strings)
const SVG_ICONS: Record<string, string> = {
  d1: `<polyline points="3,6 5,6 21,6" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>
       <path d="M19 6l-1 14H6L5 6" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
       <path d="M10 11v6M14 11v6" stroke="white" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  d2: `<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  d3: `<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
       <line x1="8" y1="19" x2="8" y2="21" stroke="white" stroke-width="2" stroke-linecap="round"/>
       <line x1="12" y1="17" x2="12" y2="22" stroke="white" stroke-width="2" stroke-linecap="round"/>
       <line x1="16" y1="19" x2="16" y2="21" stroke="white" stroke-width="2" stroke-linecap="round"/>`,
}

const CATEGORY_COLORS: Record<string, string> = {
  d1: palette.d1,
  d2: palette.d2,
  d3: palette.d3,
}

function createPinIcon(occ: Occurrence, selected: boolean): L.DivIcon {
  const size = selected ? 36 : 28
  const outer = Math.ceil(size * Math.SQRT2) + 4
  const half = outer / 2
  const color = CATEGORY_COLORS[occ.type]
  const shadow = selected ? `0 8px 20px ${color}66` : '0 3px 8px rgba(0,0,0,0.18)'
  const iconSize = selected ? 16 : 12
  const svgPaths = SVG_ICONS[occ.type]

  const html = `
    <div class="mp-pin-inner" style="
      width:${size}px; height:${size}px;
      background:${color};
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      display:flex; align-items:center; justify-content:center;
      box-shadow:${shadow};
      border:2px solid ${palette.surface};
      transition:all 0.2s;
    ">
      <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24"
           style="transform:rotate(45deg); flex-shrink:0;">
        ${svgPaths}
      </svg>
    </div>`

  return L.divIcon({
    html,
    className: selected ? '' : 'mp-pin-pulse',
    iconSize: [outer, outer],
    iconAnchor: [half, outer],
  })
}

// Re-center map when filtered occurrences change to keep all pins visible
function MapController({ occurrences }: { occurrences: Occurrence[] }) {
  const map = useMap()
  useEffect(() => {
    const valid = occurrences.filter(o => o.lat != null && o.lng != null)
    if (valid.length === 0) return
    if (valid.length === 1) {
      map.setView([valid[0].lat!, valid[0].lng!], 14, { animate: true })
      return
    }
    const bounds = L.latLngBounds(valid.map(o => [o.lat!, o.lng!]))
    map.fitBounds(bounds, { padding: [60, 60], animate: true })
  }, [map, occurrences])
  return null
}

interface MapViewProps {
  occurrences: Occurrence[]
  selectedPinId: number | null
  onPinClick: (occ: Occurrence) => void
  onRegisterClick: () => void
}

export default function MapView({ occurrences, selectedPinId, onPinClick, onRegisterClick }: MapViewProps) {
  const withCoords = occurrences.filter(o => o.lat != null && o.lng != null)

  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: 'clamp(300px, 50vw, 520px)',
        borderRadius: 4,
        border: `1px solid ${palette.line}`,
        isolation: 'isolate',
        zIndex: 0,
      }}
    >
      <MapContainer
        center={[-21.372, -46.528]}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController occurrences={withCoords} />
        {withCoords.map(occ => (
          <Marker
            key={occ.id}
            position={[occ.lat!, occ.lng!]}
            icon={createPinIcon(occ, occ.id === selectedPinId)}
            eventHandlers={{ click: () => onPinClick(occ) }}
          />
        ))}
      </MapContainer>

      {/* Badge */}
      <div
        className="absolute bottom-4 left-4 font-mono text-[10px] tracking-wider uppercase px-3 py-2 z-[1001]"
        style={{
          background: `${palette.surface}EE`,
          color: palette.inkSoft,
          borderRadius: 4,
          border: `1px solid ${palette.line}`,
          pointerEvents: 'none',
        }}
      >
        Muzambinho/MG · {occurrences.length} ocorrência{occurrences.length !== 1 ? 's' : ''}
      </div>

      {/* CTA flutuante */}
      <button
        onClick={onRegisterClick}
        className="absolute bottom-4 right-4 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium shadow-lg transition hover:opacity-90 z-[1001]"
        style={{ background: palette.ink, color: palette.surface }}
      >
        <Camera size={16} />
        Registrar nesta área
      </button>
    </div>
  )
}
