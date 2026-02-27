import { useMemo } from 'react'
import { CanvasSettingsPanel } from './components/CanvasSettingsPanel'
import { TextSettingsPanel } from './components/TextSettingsPanel'
import { ExportSettingsPanel } from './components/ExportSettingsPanel'
import { useThumbnailMakerStore } from './store'

export function ThumbnailMakerPage() {
  const {
    preset,
    ratio,
    mainText,
    subText,
    bgColor,
    format,
    quality,
    setRatio,
    setMainText,
    setSubText,
    setBgColor,
    setFormat,
    setQuality,
  } = useThumbnailMakerStore()

  const summary = useMemo(() => ({ preset, ratio, format, quality }), [preset, ratio, format, quality])

  return (
    <section className="card">
      <h2>Thumbnail Maker (Step 1 완료)</h2>
      <p className="subtitle">설정 패널을 Canvas / Text / Export 컴포넌트로 분리</p>

      <div className="phaseList">
        <CanvasSettingsPanel
          ratio={ratio}
          onChangeRatio={setRatio}
          bgColor={bgColor}
          onChangeBgColor={setBgColor}
        />

        <TextSettingsPanel
          mainText={mainText}
          subText={subText}
          onChangeMainText={setMainText}
          onChangeSubText={setSubText}
        />

        <ExportSettingsPanel
          format={format}
          onChangeFormat={setFormat}
          quality={quality}
          onChangeQuality={setQuality}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>현재 상태 요약</strong>
        <pre style={{ margin: '8px 0 0', padding: 12, background: '#0f172a', color: '#e2e8f0', borderRadius: 8, overflowX: 'auto' }}>
          {JSON.stringify(summary, null, 2)}
        </pre>
      </div>
    </section>
  )
}
