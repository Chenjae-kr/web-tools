import { useMemo, useState } from 'react'
import { CanvasSettingsPanel } from './components/CanvasSettingsPanel'
import { TextSettingsPanel } from './components/TextSettingsPanel'
import { ExportSettingsPanel } from './components/ExportSettingsPanel'

type Preset = 'quote' | 'blog' | 'youtube' | 'dev-sense'
type Ratio = '1:1' | '16:9' | '4:3' | '3:2'

export function ThumbnailMakerPage() {
  const [preset] = useState<Preset>('dev-sense')
  const [ratio, setRatio] = useState<Ratio>('16:9')
  const [mainText, setMainText] = useState('개발 능력은\n코딩을 잘하는 능력이 아니다')
  const [subText, setSubText] = useState('중요한 건 문제를 고르는 감각과 우선순위 판단')
  const [bgColor, setBgColor] = useState('#0b1220')
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png')
  const [quality, setQuality] = useState(92)

  const summary = useMemo(
    () => ({ preset, ratio, format, quality }),
    [preset, ratio, format, quality],
  )

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
