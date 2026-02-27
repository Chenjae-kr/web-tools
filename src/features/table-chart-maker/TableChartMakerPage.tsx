import type { CSSProperties } from 'react'
import { ChartPreview } from './components/ChartPreview'
import { useTableChartStore } from './store'

export function TableChartMakerPage() {
  const {
    sourceType,
    sourceText,
    chartType,
    chartTitle,
    seriesColor,
    width,
    height,
    setSourceType,
    setSourceText,
    setChartType,
    setChartTitle,
    setSeriesColor,
    setWidth,
    setHeight,
  } = useTableChartStore()

  return (
    <section className="card">
      <h2>Table/JSON → Chart Image (초안)</h2>
      <p className="subtitle">ECharts + PapaParse 기반 1차 전환 버전</p>

      <div className="phaseList">
        <section className="phaseItem">
          <strong>Input</strong>
          <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button type="button" onClick={() => setSourceType('table')} style={btn(sourceType === 'table')}>Table</button>
            <button type="button" onClick={() => setSourceType('json')} style={btn(sourceType === 'json')}>JSON</button>
          </div>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            rows={7}
            style={{ marginTop: 8, width: '100%', border: '1px solid #cbd5e1', borderRadius: 8, padding: 8 }}
          />
        </section>

        <section className="phaseItem">
          <strong>Chart</strong>
          <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['bar', 'line', 'pie'] as const).map((t) => (
              <button key={t} type="button" onClick={() => setChartType(t)} style={btn(chartType === t)}>{t}</button>
            ))}
          </div>
          <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
            <input value={chartTitle} onChange={(e) => setChartTitle(e.target.value)} placeholder="차트 제목" style={input} />
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span>Series Color</span>
              <input type="color" value={seriesColor} onChange={(e) => setSeriesColor(e.target.value)} />
            </label>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span>W</span>
              <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value) || 1200)} style={{ ...input, width: 120 }} />
              <span>H</span>
              <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value) || 1200)} style={{ ...input, width: 120 }} />
            </label>
          </div>
        </section>

        <ChartPreview />
      </div>
    </section>
  )
}

function btn(active: boolean): CSSProperties {
  return {
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    padding: '6px 10px',
    background: active ? '#dbeafe' : '#fff',
    cursor: 'pointer',
    textTransform: 'uppercase',
  }
}

const input: CSSProperties = {
  border: '1px solid #cbd5e1',
  borderRadius: 8,
  padding: '6px 8px',
}
