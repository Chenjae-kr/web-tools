import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useThumbnailMakerStore } from '../store'

export function JsonIOPanel() {
  const state = useThumbnailMakerStore()
  const [raw, setRaw] = useState('')
  const fileRef = useRef<HTMLInputElement | null>(null)

  const onExport = () => {
    const payload = {
      preset: state.preset,
      ratio: state.ratio,
      mainText: state.mainText,
      subText: state.subText,
      bgMode: state.bgMode,
      bgColor: state.bgColor,
      bgImageDataUrl: state.bgImageDataUrl,
      overlayMode: state.overlayMode,
      overlayStrength: state.overlayStrength,
      decorStyle: state.decorStyle,
      textStroke: state.textStroke,
      textPadding: state.textPadding,
      mainY: state.mainY,
      subY: state.subY,
      format: state.format,
      quality: state.quality,
    }
    setRaw(JSON.stringify(payload, null, 2))
  }

  const applyObject = (obj: any) => {
    if (obj.ratio) state.setRatio(obj.ratio)
    if (obj.mainText) state.setMainText(String(obj.mainText))
    if (obj.subText) state.setSubText(String(obj.subText))
    if (obj.bgMode) state.setBgMode(obj.bgMode)
    if (obj.bgColor) state.setBgColor(String(obj.bgColor))
    if (obj.bgImageDataUrl !== undefined) state.setBgImageDataUrl(obj.bgImageDataUrl)
    if (obj.overlayMode) state.setOverlayMode(obj.overlayMode)
    if (obj.overlayStrength != null) state.setOverlayStrength(Number(obj.overlayStrength))
    if (obj.decorStyle) state.setDecorStyle(obj.decorStyle)
    if (obj.textStroke != null) state.setTextStroke(Number(obj.textStroke))
    if (obj.textPadding != null) state.setTextPadding(Number(obj.textPadding))
    if (obj.mainY != null) state.setMainY(Number(obj.mainY))
    if (obj.subY != null) state.setSubY(Number(obj.subY))
    if (obj.format) state.setFormat(obj.format)
    if (obj.quality != null) state.setQuality(Number(obj.quality))
    if (obj.preset) state.setPreset(obj.preset)
  }

  const onImport = () => {
    try {
      applyObject(JSON.parse(raw))
      alert('JSON 적용 완료')
    } catch {
      alert('JSON 파싱 실패')
    }
  }

  const onImportFile = (file: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const text = String(reader.result ?? '')
        setRaw(text)
        applyObject(JSON.parse(text))
        alert('JSON 파일 적용 완료')
      } catch {
        alert('JSON 파일 파싱 실패')
      }
    }
    reader.readAsText(file)
  }

  return (
    <section className="phaseItem">
      <strong>JSON Import / Export</strong>
      <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type="button" onClick={onExport} style={btnStyle}>Export</button>
        <button type="button" onClick={onImport} style={btnStyle}>Import</button>
        <button type="button" onClick={() => fileRef.current?.click()} style={btnStyle}>JSON 파일 불러오기</button>
        <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => onImportFile(e.target.files?.[0] ?? null)} />
      </div>
      <textarea
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        rows={8}
        placeholder="thumbnail config json"
        style={{ marginTop: 8, width: '100%', border: '1px solid #cbd5e1', borderRadius: 8, padding: 8 }}
      />
    </section>
  )
}

const btnStyle: CSSProperties = {
  border: '1px solid #cbd5e1',
  borderRadius: 8,
  padding: '6px 10px',
  background: '#fff',
  cursor: 'pointer',
}
