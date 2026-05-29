export default function NotebookPreview({ design, values }) {
  const d = design || {
    id: 'pastel-bloom',
    accent: '#d946ef',
    emoji: '🌸',
    name: 'Pastel Bloom',
    description: 'Soft floral watercolor tones',
    category: 'cartoons',
  }

  const subject = values?.subject || 'Subject'
  const name = values?.name || 'Student Name'
  const section = values?.section || 'Section'

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Label preview */}
      <div className="w-full max-w-xs">
        <div
          className="w-full rounded-2xl shadow-lg overflow-hidden"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))' }}
        >
          <div className="relative w-full aspect-[2/1]">
            {/* PNG background */}
            <img
              src={`/designs/${d.id}.png`}
              alt={d.name}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* Text overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div
                className="w-full text-center rounded-xl px-3 py-2"
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                }}
              >
                <div
                  className="text-[13px] font-extrabold tracking-wide"
                  style={{ color: d.accent }}
                >
                  {subject.toUpperCase().slice(0, 22)}
                </div>
                <div
                  className="h-[2px] w-12 mx-auto my-2 rounded-full"
                  style={{ backgroundColor: d.accent, opacity: 0.35 }}
                />
                <div
                  className="text-[10px] font-semibold"
                  style={{ color: d.accent, opacity: 0.85 }}
                >
                  {name.slice(0, 30)}
                </div>
                <div
                  className="text-[9px] font-medium"
                  style={{ color: d.accent, opacity: 0.7 }}
                >
                  {section.slice(0, 20)}
                </div>
              </div>
            </div>
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
