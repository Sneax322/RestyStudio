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

  const [svgText, setSvgText] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(`./designs/${d.id}.svg`)
        if (!res.ok) throw new Error(`Failed to load SVG overlay for ${d.id}`)
        const text = await res.text()
        if (!cancelled) setSvgText(text)
      } catch {
        if (!cancelled) setSvgText(null)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [d.id])

  const svgWithValues = useMemo(() => {
    if (!svgText) return null

    return svgText
      .replaceAll('{subject}', subject.toUpperCase().slice(0, 22))
      .replaceAll('{name}', name.slice(0, 30))
      .replaceAll('{section}', section.slice(0, 20))
  }, [svgText, subject, name, section])

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Label preview */}
      <div className="w-full">
        <div
          className="w-full rounded-2xl shadow-lg overflow-hidden"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))' }}
        >
          {/*
            Use a padding-top ratio box instead of Tailwind aspect-[2/1]
            (aspect-ratio plugin may not be enabled, causing height=0).
          */}
          <div className="relative w-full" style={{ paddingTop: '50%' }}>
            {/* Bottom layer: PNG background */}
            <img
              src={`./designs/${d.id}.png`}
              alt={d.name}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
              onError={(e) => {
                // Hide broken image icon if the asset is missing
                e.currentTarget.style.display = 'none'
              }}
            />

            {/* Top layer: inline SVG overlay (from /designs/{id}.svg) */}
            {svgWithValues ? (
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: svgWithValues }}
              />
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
