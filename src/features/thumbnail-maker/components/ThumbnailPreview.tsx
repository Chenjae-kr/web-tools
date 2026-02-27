import { useEffect, useMemo, useRef } from 'react'
import { renderThumbnail } from '../renderer'
import { useThumbnailMakerStore } from '../store'

export function ThumbnailPreview() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { ratio, bgColor, bgImageDataUrl, overlayMode, overlayStrength, mainText, subText } = useThumbnailMakerStore()

  const bgImage = useMemo(() => {
    if (!bgImageDataUrl) return null
    const img = new Image()
    img.src = bgImageDataUrl
    return img
  }, [bgImageDataUrl])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const paint = () =>
      renderThumbnail(canvas, { ratio, bgColor, bgImage, overlayMode, overlayStrength, mainText, subText })

    if (bgImage && !bgImage.complete) {
      bgImage.onload = paint
      return
    }
    paint()
  }, [ratio, bgColor, bgImage, overlayMode, overlayStrength, mainText, subText])

  return (
    <section className="phaseItem">
      <strong>Preview</strong>
      <div style={{ marginTop: 10, background: '#0f172a', borderRadius: 10, padding: 10 }}>
        <canvas ref={canvasRef} style={{ width: '100%', borderRadius: 8, background: '#111827' }} />
      </div>
    </section>
  )
}
