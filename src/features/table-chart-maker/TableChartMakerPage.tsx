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
    bgColor,
    fontScale,
    showLegend,
    showValueLabel,
    legendPos,
    wmType,
    wmText,
    wmColor,
    wmOpacity,
    setSourceType,
    setSourceText,
    setChartType,
    setChartTitle,
    setSeriesColor,
    setWidth,
    setHeight,
    setBgColor,
    setFontScale,
    setShowLegend,
    setShowValueLabel,
    setLegendPos,
    setWmType,
    setWmText,
    setWmColor,
    setWmOpacity,
  } = useTableChartStore()

  return (
    <section className="card">
      <h2>Table/JSON → Chart Image (초안)</h2>
      <p className="subtitle">ECharts + PapaParse + Zod 기반 2차 전환 버전</p>

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
            <label style={row}><span>Series Color</span><input type="color" value={seriesColor} onChange={(e) => setSeriesColor(e.target.value)} /></label>
            <label style={row}><span>BG Color</span><input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} /></label>
            <label style={row}><span>Font %</span><input type="number" min={70} max={150} value={fontScale} onChange={(e) => setFontScale(Number(e.target.value) || 100)} style={{ ...input, width: 100 }} /></label>
            <label style={row}><span>W</span><input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value) || 1200)} style={{ ...input, width: 120 }} /><span>H</span><input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value) || 1200)} style={{ ...input, width: 120 }} /></label>
          </div>
        </section>

        <section className="phaseItem">
          <strong>Legend / Label</strong>
          <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
            <label style={row}><span>Legend</span><input type="checkbox" checked={showLegend} onChange={(e) => setShowLegend(e.target.checked)} /></label>
            <label style={row}><span>Value Label</span><input type="checkbox" checked={showValueLabel} onChange={(e) => setShowValueLabel(e.target.checked)} /></label>
            <label style={row}><span>Legend Pos</span>
              <select value={legendPos} onChange={(e) => setLegendPos(e.target.value as 'right' | 'bottom')} style={input}>
                <option value="right">right</option>
                <option value="bottom">bottom</option>
              </select>
            </label>
          </div>
        </section>

        <section className="phaseItem">
          <strong>Watermark</strong>
          <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={() => setWmType('off')} style={btn(wmType === 'off')}>off</button>
              <button type="button" onClick={() => setWmType('text')} style={btn(wmType === 'text')}>text</button>
            </div>
            <input value={wmText} onChange={(e) => setWmText(e.target.value)} placeholder="watermark text" style={input} />
            <label style={row}><span>Color</span><input type="color" value={wmColor} onChange={(e) => setWmColor(e.target.value)} /></label>
            <label style={row}><span>Opacity%</span><input type="number" min={5} max={100} value={wmOpacity} onChange={(e) => setWmOpacity(Number(e.target.value) || 55)} style={{ ...input, width: 100 }} /></label>
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
const row: CSSProperties = { display: 'inline-flex', alignItems: 'center', gap: 8 }
