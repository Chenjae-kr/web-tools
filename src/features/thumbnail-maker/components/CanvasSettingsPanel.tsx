import type { CSSProperties } from 'react'
import type { BgMode, DecorStyle, OverlayMode, Ratio } from '../store'

type Props = {
  ratio: Ratio
  onChangeRatio: (ratio: Ratio) => void
  bgMode: BgMode
  onChangeBgMode: (mode: BgMode) => void
  bgColor: string
  onChangeBgColor: (color: string) => void
  onUploadBgImage: (file: File | null) => void
  overlayMode: OverlayMode
  onChangeOverlayMode: (mode: OverlayMode) => void
  overlayStrength: number
  onChangeOverlayStrength: (value: number) => void
  decorStyle: DecorStyle
  onChangeDecorStyle: (style: DecorStyle) => void
}

const ratios: Ratio[] = ['1:1', '16:9', '4:3', '3:2']
const overlayModes: OverlayMode[] = ['none', 'dim', 'gradient', 'vignette']
const decorStyles: DecorStyle[] = ['minimal', 'frame', 'corner']

export function CanvasSettingsPanel({
  ratio,
  onChangeRatio,
  bgMode,
  onChangeBgMode,
  bgColor,
  onChangeBgColor,
  onUploadBgImage,
  overlayMode,
  onChangeOverlayMode,
  overlayStrength,
  onChangeOverlayStrength,
  decorStyle,
  onChangeDecorStyle,
}: Props) {
  return (
    <section className="phaseItem">
      <strong>Canvas</strong>
      <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {ratios.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => onChangeRatio(r)}
            style={modeBtn(ratio === r)}
          >
            {r}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span>배경</span>
          <button type="button" onClick={() => onChangeBgMode('color')} style={modeBtn(bgMode === 'color')}>단색</button>
          <button type="button" onClick={() => onChangeBgMode('image')} style={modeBtn(bgMode === 'image')}>이미지</button>
        </div>

        {bgMode === 'color' ? (
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span>배경색</span>
            <input type="color" value={bgColor} onChange={(e) => onChangeBgColor(e.target.value)} />
          </label>
        ) : (
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span>배경 이미지</span>
            <input type="file" accept="image/*" onChange={(e) => onUploadBgImage(e.target.files?.[0] ?? null)} />
          </label>
        )}
      </div>

      <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span>Overlay</span>
          {overlayModes.map((m) => (
            <button key={m} type="button" onClick={() => onChangeOverlayMode(m)} style={modeBtn(overlayMode === m)}>
              {m}
            </button>
          ))}
        </div>
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span>강도</span>
          <input
            type="number"
            min={0}
            max={100}
            value={overlayStrength}
            onChange={(e) => onChangeOverlayStrength(Number(e.target.value) || 0)}
            style={{ width: 72, border: '1px solid #cbd5e1', borderRadius: 6, padding: '4px 6px' }}
          />
        </label>
      </div>

      <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span>Decor</span>
          {decorStyles.map((s) => (
            <button key={s} type="button" onClick={() => onChangeDecorStyle(s)} style={modeBtn(decorStyle === s)}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function modeBtn(active: boolean): CSSProperties {
  return {
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    padding: '6px 10px',
    background: active ? '#dbeafe' : '#fff',
    cursor: 'pointer',
  }
}
