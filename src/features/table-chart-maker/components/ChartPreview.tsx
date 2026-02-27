import { useEffect, useMemo, useRef } from 'react'
import * as echarts from 'echarts'
import { parseJsonText, parseTableText } from '../parser'
import { useTableChartStore } from '../store'

export function ChartPreview() {
  const ref = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)
  const { sourceType, sourceText, chartType, chartTitle, seriesColor, width, height } = useTableChartStore()

  const data = useMemo(() => {
    try {
      return sourceType === 'json' ? parseJsonText(sourceText) : parseTableText(sourceText)
    } catch {
      return []
    }
  }, [sourceType, sourceText])

  useEffect(() => {
    if (!ref.current) return
    chartRef.current = echarts.init(ref.current)
    return () => chartRef.current?.dispose()
  }, [])

  useEffect(() => {
    if (!chartRef.current) return

    const option: echarts.EChartsOption = {
      backgroundColor: '#0d0f14',
      title: { text: chartTitle, left: '5%', top: '4%', textStyle: { color: '#e8ecf5', fontWeight: 700 } },
      tooltip: { trigger: chartType === 'pie' ? 'item' : 'axis' },
      legend: { textStyle: { color: '#a8b2ca' }, right: 10, top: 24 },
      xAxis: chartType === 'pie' ? undefined : {
        type: 'category',
        data: data.map((d) => d.label),
        axisLabel: { color: '#a8b2ca' },
      },
      yAxis: chartType === 'pie' ? undefined : {
        type: 'value',
        axisLabel: { color: '#a8b2ca' },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
      },
      series: chartType === 'pie'
        ? [{ type: 'pie', data: data.map((d) => ({ name: d.label, value: d.value })), label: { color: '#e8ecf5' } }]
        : [{ type: chartType, data: data.map((d) => d.value), itemStyle: { color: seriesColor }, smooth: chartType === 'line' }],
    }

    chartRef.current.setOption(option, true)
    chartRef.current.resize({ width, height })
  }, [data, chartType, chartTitle, seriesColor, width, height])

  return (
    <section className="phaseItem">
      <strong>Preview</strong>
      <div style={{ marginTop: 10, overflow: 'auto' }}>
        <div ref={ref} style={{ width, height, borderRadius: 10, border: '1px solid #e2e8f0' }} />
      </div>
    </section>
  )
}
