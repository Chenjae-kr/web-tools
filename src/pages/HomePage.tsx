export function HomePage() {
  return (
    <section className="card" style={{ padding: 12 }}>
      <h2 style={{ margin: '4px 0 10px' }}>AS-IS Home (Legacy index.html)</h2>
      <p className="subtitle" style={{ marginBottom: 10 }}>
        기존 <code>dev-tools</code> 홈 화면을 그대로 재현한 프리뷰입니다.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <a href="./legacy/index.html" target="_blank" rel="noreferrer">
          새 탭으로 열기
        </a>
      </div>

      <iframe
        title="legacy-home"
        src="./legacy/index.html"
        style={{ width: '100%', minHeight: '78vh', border: '1px solid #e2e8f0', borderRadius: 10, background: '#fff' }}
      />
    </section>
  )
}
