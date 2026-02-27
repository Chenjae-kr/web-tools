import { useState } from 'react'
import type { CSSProperties } from 'react'
import { useThumbnailMakerStore } from '../store'

export function JsonIOPanel() {
  const state = useThumbnailMakerStore()
  const [raw, setRaw] = useState('')

  const onExport = () => {
    const payload = {
      preset: state.preset,
      ratio: state.ratio,
      mainText: state.mainText,
      subText: state.subText,
      bgColor: state.bgColor,
      format: state.format,
      quality: state.quality,
    }
    setRaw(JSON.stringify(payload, null, 2))
  }

  const onImport = () => {
    try {
      const obj = JSON.parse(raw)
      if (obj.ratio) state.setRatio(obj.ratio)
      if (obj.mainText) state.setMainText(String(obj.mainText))
      if (obj.subText) state.setSubText(String(obj.subText))
      if (obj.bgColor) state.setBgColor(String(obj.bgColor))
      if (obj.format) state.setFormat(obj.format)
      if (obj.quality != null) state.setQuality(Number(obj.quality))
      if (obj.preset) state.setPreset(obj.preset)
      alert('JSON 적용 완료')
    } catch {
      alert('JSON 파싱 실패')
    }
  }

  return (
    <section className="phaseItem">
      <strong>JSON Import / Export</strong>
      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button type="button" onClick={onExport} style={btnStyle}>Export</button>
        <button type="button" onClick={onImport} style={btnStyle}>Import</button>
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
