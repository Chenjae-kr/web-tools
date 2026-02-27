import { useMemo } from 'react'
import { CanvasSettingsPanel } from './components/CanvasSettingsPanel'
import { TextSettingsPanel } from './components/TextSettingsPanel'
import { ExportSettingsPanel } from './components/ExportSettingsPanel'
import { ThumbnailPreview } from './components/ThumbnailPreview'
import { DownloadButton } from './components/DownloadButton'
import { JsonIOPanel } from './components/JsonIOPanel'
import { useThumbnailMakerStore } from './store'

export function ThumbnailMakerPage() {
  const {
    preset,
    ratio,
    mainText,
    subText,
    bgMode,
    bgColor,
    overlayMode,
    overlayStrength,
    decorStyle,
    textStroke,
    textPadding,
    mainY,
    subY,
    format,
    quality,
    setPreset,
    setRatio,
    setMainText,
    setSubText,
    setBgMode,
    setBgColor,
    setBgImageDataUrl,
    setOverlayMode,
    setOverlayStrength,
    setDecorStyle,
    setTextStroke,
    setTextPadding,
    setMainY,
    setSubY,
    setFormat,
    setQuality,
  } = useThumbnailMakerStore()

  const summary = useMemo(
    () => ({ preset, ratio, bgMode, overlayMode, overlayStrength, decorStyle, textStroke, textPadding, mainY, subY, format, quality }),
    [preset, ratio, bgMode, overlayMode, overlayStrength, decorStyle, textStroke, textPadding, mainY, subY, format, quality],
  )

  const onUploadBgImage = (file: File | null) => {
    if (!file) {
      setBgImageDataUrl(null)
      return
    }
    const reader = new FileReader()
    reader.onload = () => setBgImageDataUrl(String(reader.result ?? ''))
    reader.readAsDataURL(file)
    setBgMode('image')
  }

  return (
    <section className="card">
      <h2>Thumbnail Maker (Parity 확장 중)</h2>
      <p className="subtitle">배경/오버레이/데코/텍스트 세부옵션 이관</p>

      <div className="phaseList">
        <section className="phaseItem">
          <strong>Preset</strong>
          <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['quote', 'blog', 'youtube', 'dev-sense'] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPreset(p)}
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: 8,
                  padding: '6px 10px',
                  background: preset === p ? '#dbeafe' : '#fff',
                  cursor: 'pointer',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </section>

        <CanvasSettingsPanel
          ratio={ratio}
          onChangeRatio={setRatio}
          bgMode={bgMode}
          onChangeBgMode={setBgMode}
          bgColor={bgColor}
          onChangeBgColor={setBgColor}
          onUploadBgImage={onUploadBgImage}
          overlayMode={overlayMode}
          onChangeOverlayMode={setOverlayMode}
          overlayStrength={overlayStrength}
          onChangeOverlayStrength={setOverlayStrength}
          decorStyle={decorStyle}
          onChangeDecorStyle={setDecorStyle}
        />

        <TextSettingsPanel
          mainText={mainText}
          subText={subText}
          onChangeMainText={setMainText}
          onChangeSubText={setSubText}
          textStroke={textStroke}
          onChangeTextStroke={setTextStroke}
          textPadding={textPadding}
          onChangeTextPadding={setTextPadding}
          mainY={mainY}
          subY={subY}
          onChangeMainY={setMainY}
          onChangeSubY={setSubY}
        />

        <ExportSettingsPanel
          format={format}
          onChangeFormat={setFormat}
          quality={quality}
          onChangeQuality={setQuality}
        />

        <ThumbnailPreview />
        <JsonIOPanel />
      </div>

      <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <strong>현재 상태 요약</strong>
        <DownloadButton />
      </div>
      <pre style={{ margin: '8px 0 0', padding: 12, background: '#0f172a', color: '#e2e8f0', borderRadius: 8, overflowX: 'auto' }}>
        {JSON.stringify(summary, null, 2)}
      </pre>
    </section>
  )
}
