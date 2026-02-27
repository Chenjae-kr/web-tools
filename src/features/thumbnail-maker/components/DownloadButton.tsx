import { useRef } from 'react'
import { useThumbnailMakerStore } from '../store'
import { renderThumbnail } from '../renderer'

export function DownloadButton() {
  const hiddenCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const { ratio, bgColor, mainText, subText, format, quality } = useThumbnailMakerStore()

  const onDownload = () => {
    const canvas = hiddenCanvasRef.current ?? document.createElement('canvas')
    hiddenCanvasRef.current = canvas
    renderThumbnail(canvas, { ratio, bgColor, mainText, subText })

    const mime = format === 'jpeg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png'
    const q = Math.max(0.01, Math.min(1, quality / 100))
    const url = canvas.toDataURL(mime, q)

    const a = document.createElement('a')
    a.href = url
    a.download = `thumbnail-${ratio.replace(':', 'x')}.${format === 'jpeg' ? 'jpg' : format}`
    a.click()
  }

  return (
    <button
      type="button"
      onClick={onDownload}
      style={{ border: '1px solid #cbd5e1', borderRadius: 8, padding: '8px 12px', background: '#fff', cursor: 'pointer' }}
    >
      썸네일 다운로드
    </button>
  )
}
