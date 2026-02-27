import './App.css'
import { ThumbnailMakerPage } from './features/thumbnail-maker/ThumbnailMakerPage'

const phases = [
  { id: 'Phase 0', title: '기준선 확보', detail: '기능 인벤토리 + 핵심 도구 회귀 테스트' },
  { id: 'Phase 1', title: '새 레포 부트스트랩', detail: 'Vite/TS/React + GitHub Pages 자동배포' },
  { id: 'Phase 2', title: '공통 엔진 분리', detail: '파서/변환/이미지 유틸 라이브러리화' },
  { id: 'Phase 3', title: '핵심 도구 전환', detail: 'thumbnail-maker 등 고복잡 도구부터 마이그레이션' },
]

function App() {
  return (
    <main className="container">
      <h1>web-tools (dev-tools-next)</h1>
      <p className="subtitle">GitHub Pages 기반 점진 마이그레이션 프로젝트</p>

      <section className="card">
        <h2>프로젝트 목적</h2>
        <ul>
          <li>유지보수성 향상</li>
          <li>신규 기능 개발 속도 개선</li>
          <li>회귀 버그 감소</li>
          <li>오픈소스 협업 친화 구조 확보</li>
        </ul>
      </section>

      <section className="card">
        <h2>마이그레이션 페이즈</h2>
        <div className="phaseList">
          {phases.map((phase) => (
            <article key={phase.id} className="phaseItem">
              <strong>{phase.id}</strong>
              <div>{phase.title}</div>
              <small>{phase.detail}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>문서</h2>
        <a href="./docs/dev-tools-next-migration-plan.md" target="_blank" rel="noreferrer">
          dev-tools-next-migration-plan.md 열기
        </a>
      </section>

      <ThumbnailMakerPage />
    </main>
  )
}

export default App
