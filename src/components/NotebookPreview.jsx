import { useEffect, useMemo, useState } from 'react'

export default function NotebookPreview({ design, values }) {
  const d = design || {
    id: 'bato',
    accent: '#38b6ff',
    emoji: '🪨',
    name: 'Bato',
    description: 'Cartoon label design',
    category: 'cartoons',
  }

  const subject = (values?.subject || 'Subject').toString()
  const name = (values?.name || 'Student Name').toString()
  const section = (values?.section || 'Section').toString()

  // Ensure asset URLs resolve correctly on nested routes (e.g. /products/:id)
  // and on GitHub Pages / custom bases.
  const baseUrl = import.meta.env.BASE_URL || '/'
  const pngUrl = `${baseUrl}designs/${d.id}.png`
  const svgUrl = `${baseUrl}designs/${d.id}.svg`

  const [svgText, setSvgText] = useState(null)
  const [pngOk, setPngOk] = useState(true)
  const [svgOk, setSvgOk] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setSvgOk(true)
        const res = await fetch(svgUrl, { cache: 'no-store' })
        if (!res.ok) throw new Error(`Failed to load SVG overlay for ${d.id}`)
        const text = await res.text()
        if (!cancelled) setSvgText(text)
      } catch {
        if (!cancelled) {
          setSvgOk(false)
          setSvgText(null)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [d.id, svgUrl])

  useEffect(() => {
    // reset PNG status when switching designs
    setPngOk(true)
  }, [d.id])

  const svgWithValues = useMemo(() => {
    if (!svgText) return null

    return svgText
      .replaceAll('{subject}', subject.toUpperCase().slice(0, 22))
      .replaceAll('{name}', name.slice(0, 30))
      .replaceAll('{section}', section.slice(0, 20))
  }, [svgText, subject, name, section])

  const showFallback = !pngOk && !svgWithValues

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Label preview */}
      <div className="w-full">
        <div
          className="w-full rounded-2xl shadow-lg overflow-hidden bg-white/60 dark:bg-white/5"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))' }}
        >
          <div className="relative w-full" style={{ paddingTop: '50%' }}>
            {/* Bottom layer: PNG background */}
            <img
              src={pngUrl}
              alt={d.name}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
              onError={() => {
                setPngOk(false)
              }}
            />

            {/* Top layer: inline SVG overlay */}
            {svgWithValues ? (
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: svgWithValues }}
              />
            ) : null}

            {/* Fallback: show text even if assets fail to load */}
            {showFallback ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <div className="text-lg font-black text-slate-800 dark:text-slate-100">
                  {subject.toUpperCase().slice(0, 22)}
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {name.slice(0, 30)}
                </div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {section.slice(0, 20)}
                </div>
                <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Preview assets failed to load ({`png:${pngOk ? 'ok' : 'missing'}`},{' '}
                  {`svg:${svgOk ? 'ok' : 'missing'}`}).
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Design name badge */}
      <div
        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/60 dark:bg-white/10"
        style={{ color: d.accent }}
      >
        <span>{d.emoji}</span>
        <span>{d.name}</span>
      </div>
    </div>
  )
}
