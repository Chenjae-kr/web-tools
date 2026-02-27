import { useEffect, useMemo, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { parseJsonText, parseTableText } from '../parser'
import { useTableChartStore } from '../store'

export function ChartPreview() {
  const ref = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)
  const [parseError, setParseError] = useState<string | null>(null)
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
  } = useTableChartStore()

  const data = useMemo(() => {
    try {
      setParseError(null)
      return sourceType === 'json' ? parseJsonText(sourceText) : parseTableText(sourceText)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'parse error'
      setParseError(msg)
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
    const scale = Math.max(70, Math.min(150, fontScale)) / 100

    const commonSeries = {
      label: { show: showValueLabel, color: '#e8ecf5', fontSize: Math.round(14 * scale) },
      itemStyle: { color: seriesColor },
    }

    const option: echarts.EChartsOption = {
      animation: false,
      backgroundColor: bgColor,
      title: {
        text: chartTitle,
        left: '5%',
        top: '4%',
        textStyle: { color: '#e8ecf5', fontWeight: 700, fontSize: Math.round(28 * scale) },
      },
      tooltip: { trigger: chartType === 'pie' ? 'item' : 'axis' },
      legend: showLegend
        ? {
            textStyle: { color: '#a8b2ca', fontSize: Math.round(14 * scale) },
            ...(legendPos === 'right' ? { right: 10, top: 24 } : { bottom: 10, left: 'center' }),
          }
        : undefined,
      xAxis:
        chartType === 'pie'
          ? undefined
          : {
              type: 'category',
              data: data.map((d) => d.label),
              axisLabel: { color: '#a8b2ca', fontSize: Math.round(13 * scale) },
            },
      yAxis:
        chartType === 'pie'
          ? undefined
          : {
              type: 'value',
              axisLabel: { color: '#a8b2ca', fontSize: Math.round(13 * scale) },
              splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
            },
      series:
        chartType === 'pie'
          ? [
              {
                type: 'pie',
                data: data.map((d) => ({ name: d.label, value: d.value })),
                label: { show: showValueLabel, color: '#e8ecf5', fontSize: Math.round(13 * scale) },
              },
            ]
          : [
              {
                type: chartType,
                data: data.map((d) => d.value),
                smooth: chartType === 'line',
                ...commonSeries,
              },
            ],
      graphic:
        wmType === 'text'
          ? [
              {
                type: 'text',
                right: 16,
                bottom: 12,
                style: {
                  text: wmText,
                  fill: wmColor,
                  opacity: Math.max(0.05, Math.min(1, wmOpacity / 100)),
                  font: `${Math.round(20 * scale)}px JetBrains Mono, monospace`,
                },
              },
            ]
          : undefined,
    }

    chartRef.current.setOption(option, true)
    chartRef.current.resize({ width, height })
  }, [data, chartType, chartTitle, seriesColor, width, height, bgColor, fontScale, showLegend, showValueLabel, legendPos, wmType, wmText, wmColor, wmOpacity])

  const download = async (format: 'png' | 'jpeg' | 'webp') => {
    if (!chartRef.current) return

    if (format === 'webp') {
      const pngUrl = chartRef.current.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: bgColor })
      const img = new Image()
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('image load failed'))
        img.src = pngUrl
      })
      const c = document.createElement('canvas')
      c.width = img.width
      c.height = img.height
      const cctx = c.getContext('2d')
      if (!cctx) return
      cctx.drawImage(img, 0, 0)
      const webpUrl = c.toDataURL('image/webp', 0.92)
      const a = document.createElement('a')
      a.href = webpUrl
      a.download = `chart_${Date.now()}.webp`
      a.click()
      return
    }

    const type = format === 'jpeg' ? 'jpeg' : 'png'
    const url = chartRef.current.getDataURL({ type, pixelRatio: 2, backgroundColor: bgColor })
    const a = document.createElement('a')
    a.href = url
    a.download = `chart_${Date.now()}.${type === 'jpeg' ? 'jpg' : type}`
    a.click()
  }

  return (
    <section className="phaseItem">
      <strong>Preview</strong>
      <div style={{ marginTop: 10, overflow: 'auto' }}>
        <div ref={ref} style={{ width, height, borderRadius: 10, border: '1px solid #e2e8f0' }} />
      </div>
      <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type="button" onClick={() => download('png')}>PNG</button>
        <button type="button" onClick={() => download('jpeg')}>JPG</button>
        <button type="button" onClick={() => download('webp')}>WEBP</button>
      </div>
      {parseError && <p style={{ color: '#b91c1c', marginTop: 8 }}>입력 파싱 오류: {parseError}</p>}
    </section>
  )
}
