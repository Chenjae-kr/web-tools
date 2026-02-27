import type { Preset, Ratio } from './store'

export type PresetConfig = {
  preset: Preset
  ratio: Ratio
  mainText: string
  subText: string
  bgColor: string
}

export const PRESETS: Record<Preset, PresetConfig> = {
  quote: {
    preset: 'quote',
    ratio: '1:1',
    mainText: '블로그 썸네일\n3분 제작',
    subText: '짧고 강한 메시지로 시선 잡기',
    bgColor: '#5f6fdd',
  },
  blog: {
    preset: 'blog',
    ratio: '4:3',
    mainText: '실전 가이드\n핵심 요약',
    subText: '바로 적용 가능한 포스트 템플릿',
    bgColor: '#2e3f8f',
  },
  youtube: {
    preset: 'youtube',
    ratio: '16:9',
    mainText: '조회수 올리는\n썸네일',
    subText: '클릭을 부르는 타이틀 디자인',
    bgColor: '#1c1f2a',
  },
  'dev-sense': {
    preset: 'dev-sense',
    ratio: '16:9',
    mainText: '개발 능력은\n코딩을 잘하는 능력이 아니다',
    subText: '중요한 건 문제를 고르는 감각과 우선순위 판단',
    bgColor: '#0b1220',
  },
}
