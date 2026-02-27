import { create } from 'zustand'
import { PRESETS } from './presets'

export type Preset = 'quote' | 'blog' | 'youtube' | 'dev-sense'
export type Ratio = '1:1' | '16:9' | '4:3' | '3:2'
export type BgMode = 'color' | 'image'
export type OverlayMode = 'none' | 'dim' | 'gradient' | 'vignette'
export type DecorStyle = 'minimal' | 'frame' | 'corner'

type ThumbnailMakerState = {
  preset: Preset
  ratio: Ratio
  mainText: string
  subText: string
  bgMode: BgMode
  bgColor: string
  bgImageDataUrl: string | null
  overlayMode: OverlayMode
  overlayStrength: number
  decorStyle: DecorStyle
  textStroke: number
  textPadding: number
  mainY: number
  subY: number
  format: 'png' | 'jpeg' | 'webp'
  quality: number

  setPreset: (preset: Preset) => void
  setRatio: (ratio: Ratio) => void
  setMainText: (text: string) => void
  setSubText: (text: string) => void
  setBgMode: (mode: BgMode) => void
  setBgColor: (color: string) => void
  setBgImageDataUrl: (dataUrl: string | null) => void
  setOverlayMode: (mode: OverlayMode) => void
  setOverlayStrength: (value: number) => void
  setDecorStyle: (style: DecorStyle) => void
  setTextStroke: (value: number) => void
  setTextPadding: (value: number) => void
  setMainY: (value: number) => void
  setSubY: (value: number) => void
  setFormat: (format: 'png' | 'jpeg' | 'webp') => void
  setQuality: (quality: number) => void
}

const initial = PRESETS['dev-sense']

export const useThumbnailMakerStore = create<ThumbnailMakerState>((set) => ({
  preset: initial.preset,
  ratio: initial.ratio,
  mainText: initial.mainText,
  subText: initial.subText,
  bgMode: 'color',
  bgColor: initial.bgColor,
  bgImageDataUrl: null,
  overlayMode: 'gradient',
  overlayStrength: 28,
  decorStyle: 'frame',
  textStroke: 4,
  textPadding: 56,
  mainY: 28,
  subY: 56,
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
      bgMode: 'color',
      bgImageDataUrl: null,
    })
  },
  setRatio: (ratio) => set({ ratio }),
  setMainText: (mainText) => set({ mainText }),
  setSubText: (subText) => set({ subText }),
  setBgMode: (bgMode) => set({ bgMode }),
  setBgColor: (bgColor) => set({ bgColor }),
  setBgImageDataUrl: (bgImageDataUrl) => set({ bgImageDataUrl }),
  setOverlayMode: (overlayMode) => set({ overlayMode }),
  setOverlayStrength: (overlayStrength) => set({ overlayStrength: Math.max(0, Math.min(100, overlayStrength)) }),
  setDecorStyle: (decorStyle) => set({ decorStyle }),
  setTextStroke: (textStroke) => set({ textStroke: Math.max(0, Math.min(20, textStroke)) }),
  setTextPadding: (textPadding) => set({ textPadding: Math.max(20, Math.min(220, textPadding)) }),
  setMainY: (mainY) => set({ mainY: Math.max(10, Math.min(70, mainY)) }),
  setSubY: (subY) => set({ subY: Math.max(25, Math.min(90, subY)) }),
  setFormat: (format) => set({ format }),
  setQuality: (quality) => set({ quality: Math.max(1, Math.min(100, quality)) }),
}))
