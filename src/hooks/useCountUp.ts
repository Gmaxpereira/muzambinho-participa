import { useEffect, useRef, useState } from 'react'

function formatBR(n: number, decimals: number): string {
  return n.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/** Parses a Brazilian-formatted numeric string like "2.111", "42,6%", "76%".
 *  Returns the numeric value, decimal precision, and any suffix (e.g. "%"). */
export function parseCountUpValue(str: string): { num: number; decimals: number; suffix: string } {
  const suffix = str.replace(/[\d.,]/g, '')
  const numPart = str.replace(/[^\d.,]/g, '')

  if (numPart.includes(',')) {
    const [intPart, decPart] = numPart.split(',')
    return {
      num: parseFloat(intPart.replace(/\./g, '') + '.' + decPart),
      decimals: decPart.length,
      suffix,
    }
  }

  return {
    num: parseFloat(numPart.replace(/\./g, '')),
    decimals: 0,
    suffix,
  }
}

/**
 * Animates a number from 0 to `target` with cubic ease-out,
 * triggering once when the returned `ref` element enters the viewport.
 */
export function useCountUp(target: number, duration = 1500, decimals = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(formatBR(0, decimals))
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return
        hasRun.current = true
        observer.disconnect()

        let startTs: number | null = null

        function tick(ts: number) {
          if (startTs === null) startTs = ts
          const elapsed = ts - startTs
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(formatBR(eased * target, decimals))
          if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, decimals])

  return { ref, display }
}
