type Props = {
  format: 'png' | 'jpeg' | 'webp'
  onChangeFormat: (format: 'png' | 'jpeg' | 'webp') => void
  quality: number
  onChangeQuality: (quality: number) => void
}

const formats: Array<'png' | 'jpeg' | 'webp'> = ['png', 'jpeg', 'webp']

export function ExportSettingsPanel({ format, onChangeFormat, quality, onChangeQuality }: Props) {
  return (
    <section className="phaseItem">
      <strong>Export</strong>
      <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {formats.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => onChangeFormat(f)}
            style={{
              border: '1px solid #cbd5e1',
              borderRadius: 8,
              padding: '6px 10px',
              background: format === f ? '#dbeafe' : '#fff',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span>Quality</span>
          <input
            type="number"
            min={1}
            max={100}
            value={quality}
            onChange={(e) => onChangeQuality(Math.max(1, Math.min(100, Number(e.target.value) || 92)))}
            style={{ width: 70, border: '1px solid #cbd5e1', borderRadius: 6, padding: '4px 6px' }}
          />
        </label>
      </div>
    </section>
  )
}
