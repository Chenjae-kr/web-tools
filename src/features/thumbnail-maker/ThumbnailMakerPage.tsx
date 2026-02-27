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
    bgColor,
    format,
    quality,
    setPreset,
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
