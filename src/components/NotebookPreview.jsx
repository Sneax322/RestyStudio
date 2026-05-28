export default function NotebookPreview({ design, fields, values }) {
  const d = design || {
    colorA: '#fce7f3', colorB: '#e9d5ff', accent: '#d946ef', emoji: '🌸', name: 'Pastel Bloom'
  }
  const subject = values?.subject || 'Subject'
  const name = values?.name || 'Student Name'
  const section = values?.section || 'Section'

  // Decorative shapes based on design
  const shapes = {
    'pastel-bloom': (
      <>
        <circle cx="170" cy="20" r="28" fill={d.accent} fillOpacity="0.15" />
        <circle cx="10" cy="80" r="20" fill={d.accent} fillOpacity="0.1" />
        <circle cx="150" cy="100" r="15" fill={d.accent} fillOpacity="0.12" />
        <text x="158" y="30" fontSize="22" textAnchor="middle" dominantBaseline="middle">🌸</text>
        <text x="18" y="90" fontSize="14" textAnchor="middle" dominantBaseline="middle">✿</text>
      </>
    ),
    'ocean-breeze': (
      <>
        <path d="M0,70 Q40,55 80,70 Q120,85 160,70 Q190,58 200,65 L200,100 L0,100 Z" fill={d.accent} fillOpacity="0.08" />
        <path d="M0,80 Q40,65 80,80 Q120,95 160,80 L160,100 L0,100 Z" fill={d.accent} fillOpacity="0.06" />
        <text x="175" y="20" fontSize="20" textAnchor="middle" dominantBaseline="middle">🌊</text>
      </>
    ),
    'sunset-vibe': (
      <>
        <circle cx="185" cy="15" r="25" fill={d.accent} fillOpacity="0.2" />
        <circle cx="185" cy="15" r="18" fill={d.accent} fillOpacity="0.15" />
        <circle cx="185" cy="15" r="11" fill={d.accent} fillOpacity="0.2" />
        <text x="10" y="15" fontSize="16" dominantBaseline="middle">☀️</text>
      </>
    ),
    'forest-study': (
      <>
        <text x="5" y="18" fontSize="14">🌿</text>
        <text x="170" y="18" fontSize="14">🍃</text>
        <text x="170" y="88" fontSize="14">🌱</text>
        <rect x="0" y="95" width="200" height="5" fill={d.accent} fillOpacity="0.12" rx="2" />
      </>
    ),
    'lavender-dreams': (
      <>
        <circle cx="0" cy="0" r="40" fill={d.accent} fillOpacity="0.1" />
        <circle cx="200" cy="100" r="35" fill={d.accent} fillOpacity="0.1" />
        <text x="175" y="18" fontSize="16" dominantBaseline="middle">⭐</text>
        <text x="8" y="88" fontSize="12" dominantBaseline="middle">✨</text>
      </>
    ),
    'classic-minimal': (
      <>
        <rect x="0" y="0" width="6" height="100" fill={d.accent} fillOpacity="0.7" />
        <rect x="0" y="88" width="200" height="2" fill={d.accent} fillOpacity="0.15" />
        <rect x="0" y="92" width="200" height="2" fill={d.accent} fillOpacity="0.08" />
        <text x="180" y="50" fontSize="20" textAnchor="middle" dominantBaseline="middle" fill={d.accent} fillOpacity="0.15" fontWeight="900" fontFamily="Montserrat">📐</text>
      </>
    ),
  }

  const shapeEl = shapes[d.id] || shapes['pastel-bloom']

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Label preview */}
      <div className="w-full max-w-xs">
        <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg"
          className="w-full rounded-2xl shadow-lg overflow-hidden"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))' }}>
          {/* Background gradient */}
          <defs>
            <linearGradient id={`bg-${d.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={d.colorA} />
              <stop offset="100%" stopColor={d.colorB} />
            </linearGradient>
          </defs>
          <rect width="200" height="100" fill={`url(#bg-${d.id})`} />
          
          {/* Decorative elements */}
          {shapeEl}

          {/* Content */}
          <text
            x={d.id === 'classic-minimal' ? '108' : '100'}
            y="28"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Montserrat, sans-serif"
            fontWeight="800"
            fontSize="13"
            fill={d.accent}
            letterSpacing="0.5">
            {subject.toUpperCase().slice(0, 22)}
          </text>

          {/* Divider */}
          <rect
            x={d.id === 'classic-minimal' ? '14' : '20'}
            y="38" width="160" height="1.5"
            fill={d.accent} fillOpacity="0.3" rx="1" />

          <text
            x={d.id === 'classic-minimal' ? '108' : '100'}
            y="57"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Montserrat, sans-serif"
            fontWeight="600"
            fontSize="9"
            fill={d.accent}
            fillOpacity="0.8">
            {name.slice(0, 30)}
          </text>

          <text
            x={d.id === 'classic-minimal' ? '108' : '100'}
            y="73"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Montserrat, sans-serif"
            fontWeight="500"
            fontSize="8"
            fill={d.accent}
            fillOpacity="0.65">
            {section.slice(0, 20)}
          </text>

          {/* Bottom accent */}
          <rect x="75" y="83" width="50" height="2" fill={d.accent} fillOpacity="0.3" rx="1" />
        </svg>
      </div>

      {/* Design name badge */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
        style={{ backgroundColor: d.colorB, color: d.accent }}>
        <span>{d.emoji}</span>
        <span>{d.name}</span>
      </div>
    </div>
  )
}
