import { create } from 'zustand'
import { PRESETS } from './presets'

export type Preset = 'quote' | 'blog' | 'youtube' | 'dev-sense'
export type Ratio = '1:1' | '16:9' | '4:3' | '3:2'

type ThumbnailMakerState = {
  preset: Preset
  ratio: Ratio
  mainText: string
  subText: string
  bgColor: string
  format: 'png' | 'jpeg' | 'webp'
  quality: number

  setPreset: (preset: Preset) => void
  setRatio: (ratio: Ratio) => void
  setMainText: (text: string) => void
  setSubText: (text: string) => void
  setBgColor: (color: string) => void
  setFormat: (format: 'png' | 'jpeg' | 'webp') => void
  setQuality: (quality: number) => void
}

const initial = PRESETS['dev-sense']

export const useThumbnailMakerStore = create<ThumbnailMakerState>((set) => ({
  preset: initial.preset,
  ratio: initial.ratio,
  mainText: initial.mainText,
  subText: initial.subText,
  bgColor: initial.bgColor,
  format: 'png',
  quality: 92,

  setPreset: (preset) => {
    const p = PRESETS[preset]
    set({
      preset,
      ratio: p.ratio,
      mainText: p.mainText,
      subText: p.subText,
      bgColor: p.bgColor,
    })
  },
  setRatio: (ratio) => set({ ratio }),
  setMainText: (mainText) => set({ mainText }),
  setSubText: (subText) => set({ subText }),
  setBgColor: (bgColor) => set({ bgColor }),
  setFormat: (format) => set({ format }),
  setQuality: (quality) => set({ quality: Math.max(1, Math.min(100, quality)) }),
}))
