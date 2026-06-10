import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Camera, Sun, Moon } from 'lucide-react'
import type { Occurrence } from '@/types'
import { palette } from '@/lib/palette'

const TILES = {
  light: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
  },
}

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

function createPinIcon(occ: Occurrence, selected: boolean, isDark: boolean): L.DivIcon {
  const size = selected ? 36 : 28
  const outer = Math.ceil(size * Math.SQRT2) + 4
  const half = outer / 2
  const color = CATEGORY_COLORS[occ.type]
  const iconSize = selected ? 16 : 12
  const svgPaths = SVG_ICONS[occ.type]

  // Stronger glow on dark tile, subtle on light
  const shadow = selected
    ? isDark
      ? `0 6px 22px ${color}99, 0 0 18px ${color}80`
      : `0 8px 20px ${color}66, 0 0 10px ${color}55`
    : isDark
      ? `0 2px 8px rgba(0,0,0,0.55), 0 0 10px ${color}66`
      : `0 2px 8px rgba(0,0,0,0.22), 0 0 6px ${color}55`

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
  const [tileStyle, setTileStyle] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('map-tile') as 'light' | 'dark') ?? 'dark'
  })

  const isDark = tileStyle === 'dark'
  const tile = TILES[tileStyle]
  const withCoords = occurrences.filter(o => o.lat != null && o.lng != null)

  function toggleTile() {
    const next = isDark ? 'light' : 'dark'
    setTileStyle(next)
    localStorage.setItem('map-tile', next)
  }

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
        <TileLayer key={tileStyle} url={tile.url} attribution={tile.attribution} />
        <MapController occurrences={withCoords} />
        {withCoords.map(occ => (
          <Marker
            key={occ.id}
            position={[occ.lat!, occ.lng!]}
            icon={createPinIcon(occ, occ.id === selectedPinId, isDark)}
            eventHandlers={{ click: () => onPinClick(occ) }}
          />
        ))}
      </MapContainer>

      {/* Toggle light/dark tile */}
      <button
        onClick={toggleTile}
        title={isDark ? 'Mudar para mapa claro' : 'Mudar para mapa escuro'}
        className="absolute top-3 right-3 z-[1001] flex items-center justify-center transition hover:opacity-90"
        style={{
          width: 34,
          height: 34,
          borderRadius: 6,
          background: isDark ? 'rgba(20,20,20,0.75)' : `${palette.surface}EE`,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : palette.line}`,
          color: isDark ? '#fff' : palette.inkSoft,
          backdropFilter: 'blur(4px)',
        }}
      >
        {isDark ? <Sun size={15} /> : <Moon size={15} />}
      </button>

      {/* Badge */}
      <div
        className="absolute bottom-4 left-4 font-mono text-[10px] tracking-wider uppercase px-3 py-2 z-[1001]"
        style={{
          background: isDark ? 'rgba(15,15,15,0.70)' : `${palette.surface}EE`,
          color: isDark ? 'rgba(255,255,255,0.70)' : palette.inkSoft,
          borderRadius: 4,
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : palette.line}`,
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
