import { create } from 'zustand'

export type ChartType = 'bar' | 'line' | 'pie'
export type SourceType = 'table' | 'json'

type State = {
  sourceType: SourceType
  sourceText: string
  chartType: ChartType
  chartTitle: string
  seriesColor: string
  width: number
  height: number

  setSourceType: (v: SourceType) => void
  setSourceText: (v: string) => void
  setChartType: (v: ChartType) => void
  setChartTitle: (v: string) => void
  setSeriesColor: (v: string) => void
  setWidth: (v: number) => void
  setHeight: (v: number) => void
}

export const useTableChartStore = create<State>((set) => ({
  sourceType: 'table',
  sourceText: 'label,value\nA,40\nB,28\nC,65',
  chartType: 'bar',
  chartTitle: '매출 추이',
  seriesColor: '#4fffb0',
  width: 1200,
  height: 1200,

  setSourceType: (sourceType) => set({ sourceType }),
  setSourceText: (sourceText) => set({ sourceText }),
  setChartType: (chartType) => set({ chartType }),
  setChartTitle: (chartTitle) => set({ chartTitle }),
  setSeriesColor: (seriesColor) => set({ seriesColor }),
  setWidth: (width) => set({ width: Math.max(600, Math.min(2400, width)) }),
  setHeight: (height) => set({ height: Math.max(600, Math.min(2400, height)) }),
}))
