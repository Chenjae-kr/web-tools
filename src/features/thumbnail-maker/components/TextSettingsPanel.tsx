import type { CSSProperties } from 'react'

type Props = {
  mainText: string
  subText: string
  onChangeMainText: (text: string) => void
  onChangeSubText: (text: string) => void
  textStroke: number
  onChangeTextStroke: (value: number) => void
  textPadding: number
  onChangeTextPadding: (value: number) => void
  mainY: number
  subY: number
  onChangeMainY: (value: number) => void
  onChangeSubY: (value: number) => void
}

export function TextSettingsPanel({
  mainText,
  subText,
  onChangeMainText,
  onChangeSubText,
  textStroke,
  onChangeTextStroke,
  textPadding,
  onChangeTextPadding,
  mainY,
  subY,
  onChangeMainY,
  onChangeSubY,
}: Props) {
  return (
    <section className="phaseItem">
      <strong>Text</strong>
      <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
        <textarea
          value={mainText}
          onChange={(e) => onChangeMainText(e.target.value)}
          rows={3}
          placeholder="메인 텍스트"
          style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: 8, padding: 8 }}
        />
        <textarea
          value={subText}
          onChange={(e) => onChangeSubText(e.target.value)}
          rows={2}
          placeholder="서브 텍스트"
          style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: 8, padding: 8 }}
        />
      </div>

      <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
        <label style={rowStyle}>
          <span>Stroke</span>
          <input type="number" min={0} max={20} value={textStroke} onChange={(e) => onChangeTextStroke(Number(e.target.value) || 0)} style={numStyle} />
        </label>
        <label style={rowStyle}>
          <span>Padding</span>
          <input type="number" min={20} max={220} value={textPadding} onChange={(e) => onChangeTextPadding(Number(e.target.value) || 56)} style={numStyle} />
        </label>
        <label style={rowStyle}>
          <span>Main Y%</span>
          <input type="number" min={10} max={70} value={mainY} onChange={(e) => onChangeMainY(Number(e.target.value) || 28)} style={numStyle} />
        </label>
        <label style={rowStyle}>
          <span>Sub Y%</span>
          <input type="number" min={25} max={90} value={subY} onChange={(e) => onChangeSubY(Number(e.target.value) || 56)} style={numStyle} />
        </label>
      </div>
    </section>
  )
}

const rowStyle: CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 8 }
const numStyle: CSSProperties = { width: 72, border: '1px solid #cbd5e1', borderRadius: 6, padding: '4px 6px' }
