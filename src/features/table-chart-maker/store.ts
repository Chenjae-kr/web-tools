import { create } from 'zustand'

export type ChartType = 'bar' | 'line' | 'pie'
export type SourceType = 'table' | 'json'
export type LegendPos = 'right' | 'bottom'
export type WmType = 'off' | 'text'

type State = {
  sourceType: SourceType
  sourceText: string
  chartType: ChartType
  chartTitle: string
  seriesColor: string
  width: number
  height: number
  bgColor: string
  fontScale: number
  showLegend: boolean
  showValueLabel: boolean
  legendPos: LegendPos
  wmType: WmType
  wmText: string
  wmColor: string
  wmOpacity: number

  setSourceType: (v: SourceType) => void
  setSourceText: (v: string) => void
  setChartType: (v: ChartType) => void
  setChartTitle: (v: string) => void
  setSeriesColor: (v: string) => void
  setWidth: (v: number) => void
  setHeight: (v: number) => void
  setBgColor: (v: string) => void
  setFontScale: (v: number) => void
  setShowLegend: (v: boolean) => void
  setShowValueLabel: (v: boolean) => void
  setLegendPos: (v: LegendPos) => void
  setWmType: (v: WmType) => void
  setWmText: (v: string) => void
  setWmColor: (v: string) => void
  setWmOpacity: (v: number) => void
}

export const useTableChartStore = create<State>((set) => ({
  sourceType: 'table',
  sourceText: 'label,value\nA,40\nB,28\nC,65',
  chartType: 'bar',
  chartTitle: '매출 추이',
  seriesColor: '#4fffb0',
  width: 1200,
  height: 1200,
  bgColor: '#0d0f14',
  fontScale: 100,
  showLegend: true,
  showValueLabel: true,
  legendPos: 'right',
  wmType: 'text',
  wmText: '@chenjae-kr.github.io',
  wmColor: '#a8b2ca',
  wmOpacity: 55,

  setSourceType: (sourceType) => set({ sourceType }),
  setSourceText: (sourceText) => set({ sourceText }),
  setChartType: (chartType) => set({ chartType }),
  setChartTitle: (chartTitle) => set({ chartTitle }),
  setSeriesColor: (seriesColor) => set({ seriesColor }),
  setWidth: (width) => set({ width: Math.max(600, Math.min(2400, width)) }),
  setHeight: (height) => set({ height: Math.max(600, Math.min(2400, height)) }),
  setBgColor: (bgColor) => set({ bgColor }),
  setFontScale: (fontScale) => set({ fontScale: Math.max(70, Math.min(150, fontScale)) }),
  setShowLegend: (showLegend) => set({ showLegend }),
  setShowValueLabel: (showValueLabel) => set({ showValueLabel }),
  setLegendPos: (legendPos) => set({ legendPos }),
  setWmType: (wmType) => set({ wmType }),
  setWmText: (wmText) => set({ wmText }),
  setWmColor: (wmColor) => set({ wmColor }),
  setWmOpacity: (wmOpacity) => set({ wmOpacity: Math.max(5, Math.min(100, wmOpacity)) }),
}))
