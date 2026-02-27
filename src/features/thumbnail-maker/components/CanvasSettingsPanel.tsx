type Ratio = '1:1' | '16:9' | '4:3' | '3:2'

type Props = {
  ratio: Ratio
  onChangeRatio: (ratio: Ratio) => void
  bgColor: string
  onChangeBgColor: (color: string) => void
}

const ratios: Ratio[] = ['1:1', '16:9', '4:3', '3:2']

export function CanvasSettingsPanel({ ratio, onChangeRatio, bgColor, onChangeBgColor }: Props) {
  return (
    <section className="phaseItem">
      <strong>Canvas</strong>
      <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {ratios.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => onChangeRatio(r)}
            style={{
              border: '1px solid #cbd5e1',
              borderRadius: 8,
              padding: '6px 10px',
              background: ratio === r ? '#dbeafe' : '#fff',
              cursor: 'pointer',
            }}
          >
            {r}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span>배경색</span>
          <input type="color" value={bgColor} onChange={(e) => onChangeBgColor(e.target.value)} />
        </label>
      </div>
    </section>
  )
}
