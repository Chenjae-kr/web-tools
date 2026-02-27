type Preset = 'quote' | 'blog' | 'youtube' | 'dev-sense'

type Ratio = '1:1' | '16:9' | '4:3' | '3:2'

export function ThumbnailMakerPage() {
  const presets: Preset[] = ['quote', 'blog', 'youtube', 'dev-sense']
  const ratios: Ratio[] = ['1:1', '16:9', '4:3', '3:2']

  return (
    <section className="card">
      <h2>Thumbnail Maker (React 전환 골격)</h2>
      <p className="subtitle">기존 tools/image/thumbnail-maker.html 기능을 단계적으로 이전하기 위한 시작점</p>

      <div className="phaseList">
        <div className="phaseItem">
          <strong>Step 1</strong>
          <div>설정 패널 구조 분리</div>
          <small>Canvas / Text / Export 영역 컴포넌트화</small>
        </div>
        <div className="phaseItem">
          <strong>Step 2</strong>
          <div>preset + ratio 상태관리 도입</div>
          <small>Zustand 또는 local state로 시작, 이후 store 분리</small>
        </div>
        <div className="phaseItem">
          <strong>Step 3</strong>
          <div>canvas 렌더러 이전</div>
          <small>기존 draw 로직을 순수 함수로 이관 후 테스트 추가</small>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <h3 style={{ margin: '0 0 8px' }}>초기 데이터 모델(안)</h3>
        <pre style={{ margin: 0, padding: 12, background: '#0f172a', color: '#e2e8f0', borderRadius: 8, overflowX: 'auto' }}>
{`type ThumbnailState = {
  preset: Preset
  ratio: Ratio
  mainText: string
  subText: string
  bgMode: 'color' | 'image'
  bgColor: string
  textColor: string
  strokeColor: string
  strokeWidth: number
  overlay: 'none' | 'dim' | 'gradient' | 'vignette'
  overlayStrength: number
}`}
        </pre>
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Preset 후보:</strong>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          {presets.map((p) => (
            <span key={p} style={{ border: '1px solid #cbd5e1', borderRadius: 999, padding: '4px 10px', background: '#f8fafc' }}>{p}</span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Ratio 후보:</strong>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          {ratios.map((r) => (
            <span key={r} style={{ border: '1px solid #cbd5e1', borderRadius: 999, padding: '4px 10px', background: '#f8fafc' }}>{r}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
