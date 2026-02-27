import { useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { z } from 'zod'
import { useThumbnailMakerStore } from '../store'

const schema = z.object({
  preset: z.enum(['quote', 'blog', 'youtube', 'dev-sense']).optional(),
  ratio: z.enum(['1:1', '16:9', '4:3', '3:2']).optional(),
  mainText: z.string().optional(),
  subText: z.string().optional(),
  bgMode: z.enum(['color', 'image']).optional(),
  bgColor: z.string().optional(),
  bgImageDataUrl: z.string().nullable().optional(),
  overlayMode: z.enum(['none', 'dim', 'gradient', 'vignette']).optional(),
  overlayStrength: z.number().optional(),
  decorStyle: z.enum(['minimal', 'frame', 'double-frame', 'corner']).optional(),
  textStroke: z.number().optional(),
  textPadding: z.number().optional(),
  mainY: z.number().optional(),
  subY: z.number().optional(),
  mainScale: z.number().optional(),
  subScale: z.number().optional(),
  format: z.enum(['png', 'jpeg', 'webp']).optional(),
  quality: z.number().optional(),
})

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
      mainScale: state.mainScale,
      subScale: state.subScale,
      format: state.format,
      quality: state.quality,
    }
    setRaw(JSON.stringify(payload, null, 2))
  }

  const applyObject = (obj: unknown) => {
    const parsed = schema.safeParse(obj)
    if (!parsed.success) {
      const first = parsed.error.issues[0]
      throw new Error(first?.message || 'invalid json schema')
    }
    const data = parsed.data
    if (data.ratio) state.setRatio(data.ratio)
    if (data.mainText) state.setMainText(String(data.mainText))
    if (data.subText) state.setSubText(String(data.subText))
    if (data.bgMode) state.setBgMode(data.bgMode)
    if (data.bgColor) state.setBgColor(String(data.bgColor))
    if (data.bgImageDataUrl !== undefined) state.setBgImageDataUrl(data.bgImageDataUrl)
    if (data.overlayMode) state.setOverlayMode(data.overlayMode)
    if (data.overlayStrength != null) state.setOverlayStrength(Number(data.overlayStrength))
    if (data.decorStyle) state.setDecorStyle(data.decorStyle)
    if (data.textStroke != null) state.setTextStroke(Number(data.textStroke))
    if (data.textPadding != null) state.setTextPadding(Number(data.textPadding))
    if (data.mainY != null) state.setMainY(Number(data.mainY))
    if (data.subY != null) state.setSubY(Number(data.subY))
    if (data.mainScale != null) state.setMainScale(Number(data.mainScale))
    if (data.subScale != null) state.setSubScale(Number(data.subScale))
    if (data.format) state.setFormat(data.format)
    if (data.quality != null) state.setQuality(Number(data.quality))
    if (data.preset) state.setPreset(data.preset)
  }

  const onImport = () => {
    try {
      applyObject(JSON.parse(raw))
      alert('JSON 적용 완료')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'JSON 파싱 실패'
      alert(`JSON 파싱 실패: ${msg}`)
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
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'JSON 파일 파싱 실패'
        alert(`JSON 파일 파싱 실패: ${msg}`)
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
