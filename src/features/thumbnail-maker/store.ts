import { create } from 'zustand'

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

  setRatio: (ratio: Ratio) => void
  setMainText: (text: string) => void
  setSubText: (text: string) => void
  setBgColor: (color: string) => void
  setFormat: (format: 'png' | 'jpeg' | 'webp') => void
  setQuality: (quality: number) => void
}

export const useThumbnailMakerStore = create<ThumbnailMakerState>((set) => ({
  preset: 'dev-sense',
  ratio: '16:9',
  mainText: '개발 능력은\n코딩을 잘하는 능력이 아니다',
  subText: '중요한 건 문제를 고르는 감각과 우선순위 판단',
  bgColor: '#0b1220',
  format: 'png',
  quality: 92,

  setRatio: (ratio) => set({ ratio }),
  setMainText: (mainText) => set({ mainText }),
  setSubText: (subText) => set({ subText }),
  setBgColor: (bgColor) => set({ bgColor }),
  setFormat: (format) => set({ format }),
  setQuality: (quality) => set({ quality: Math.max(1, Math.min(100, quality)) }),
}))
