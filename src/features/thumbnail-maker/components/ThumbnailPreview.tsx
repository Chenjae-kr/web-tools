import { useEffect, useRef } from 'react'
import { renderThumbnail } from '../renderer'
import { useThumbnailMakerStore } from '../store'

export function ThumbnailPreview() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { ratio, bgColor, mainText, subText } = useThumbnailMakerStore()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    renderThumbnail(canvas, { ratio, bgColor, mainText, subText })
  }, [ratio, bgColor, mainText, subText])

  return (
    <section className="phaseItem">
      <strong>Preview</strong>
      <div style={{ marginTop: 10, background: '#0f172a', borderRadius: 10, padding: 10 }}>
        <canvas ref={canvasRef} style={{ width: '100%', borderRadius: 8, background: '#111827' }} />
      </div>
    </section>
  )
}
