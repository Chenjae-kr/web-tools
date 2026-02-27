import type { OverlayMode, Ratio } from './store'

type RenderInput = {
  ratio: Ratio
  bgColor: string
  bgImage?: HTMLImageElement | null
  overlayMode: OverlayMode
  overlayStrength: number
  mainText: string
  subText: string
}

const ratioMap: Record<Ratio, [number, number]> = {
  '1:1': [1200, 1200],
  '16:9': [1600, 900],
  '4:3': [1200, 900],
  '3:2': [1500, 1000],
}

export function renderThumbnail(canvas: HTMLCanvasElement, input: RenderInput) {
  const [w, h] = ratioMap[input.ratio]
  canvas.width = w
  canvas.height = h

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  drawBackground(ctx, w, h, input)
  drawOverlay(ctx, w, h, input.overlayMode, input.overlayStrength)

  const cardX = Math.round(w * 0.12)
  const cardY = Math.round(h * 0.16)
  const cardW = Math.round(w * 0.76)
  const cardH = Math.round(h * 0.68)

  ctx.fillStyle = 'rgba(15,23,42,0.55)'
  roundRect(ctx, cardX, cardY, cardW, cardH, 24)
  ctx.fill()

  ctx.strokeStyle = 'rgba(148,163,184,0.4)'
  ctx.lineWidth = 2
  roundRect(ctx, cardX, cardY, cardW, cardH, 24)
  ctx.stroke()

  const titleLines = input.mainText.split('\n').filter(Boolean)
  ctx.textAlign = 'left'
  ctx.fillStyle = '#F8FAFC'
  ctx.font = `800 ${Math.round(w * 0.05)}px Pretendard, Apple SD Gothic Neo, sans-serif`
  let y = cardY + Math.round(cardH * 0.28)
  for (const line of titleLines.slice(0, 2)) {
    ctx.fillText(line, cardX + 56, y)
    y += Math.round(w * 0.06)
  }

  ctx.fillStyle = '#94A3B8'
  ctx.font = `500 ${Math.round(w * 0.02)}px Pretendard, Apple SD Gothic Neo, sans-serif`
  ctx.fillText(input.subText, cardX + 56, cardY + Math.round(cardH * 0.56))

  const badgeW = Math.round(w * 0.25)
  const badgeH = 36
  const badgeX = cardX + 56
  const badgeY = cardY + cardH - 76
  const badgeGrad = ctx.createLinearGradient(badgeX, badgeY, badgeX + badgeW, badgeY)
  badgeGrad.addColorStop(0, '#22D3EE')
  badgeGrad.addColorStop(1, '#3B82F6')
  ctx.fillStyle = badgeGrad
  roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 18)
  ctx.fill()

  ctx.fillStyle = '#0B1220'
  ctx.font = `700 16px Inter, sans-serif`
  ctx.fillText('DEV SENSE', badgeX + 14, badgeY + 24)
}

function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number, input: RenderInput) {
  if (input.bgImage) {
    const img = input.bgImage
    const ir = img.width / img.height
    const cr = w / h
    let dw = w
    let dh = h
    let dx = 0
    let dy = 0
    if (ir > cr) {
      dh = h
      dw = h * ir
      dx = (w - dw) / 2
    } else {
      dw = w
      dh = w / ir
      dy = (h - dh) / 2
    }
    ctx.drawImage(img, dx, dy, dw, dh)
    return
  }

  ctx.fillStyle = input.bgColor
  ctx.fillRect(0, 0, w, h)

  const g = ctx.createLinearGradient(0, 0, w, h)
  g.addColorStop(0, 'rgba(34,211,238,0.12)')
  g.addColorStop(1, 'rgba(59,130,246,0.12)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
}

function drawOverlay(ctx: CanvasRenderingContext2D, w: number, h: number, mode: OverlayMode, strength: number) {
  const alpha = Math.max(0, Math.min(1, strength / 100))
  if (mode === 'none' || alpha <= 0) return

  if (mode === 'dim') {
    ctx.fillStyle = `rgba(0,0,0,${0.7 * alpha})`
    ctx.fillRect(0, 0, w, h)
    return
  }

  if (mode === 'gradient') {
    const g = ctx.createLinearGradient(0, 0, 0, h)
    g.addColorStop(0, `rgba(0,0,0,${0.15 * alpha})`)
    g.addColorStop(1, `rgba(0,0,0,${0.7 * alpha})`)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)
    return
  }

  const rg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.8)
  rg.addColorStop(0, 'rgba(0,0,0,0)')
  rg.addColorStop(1, `rgba(0,0,0,${0.85 * alpha})`)
  ctx.fillStyle = rg
  ctx.fillRect(0, 0, w, h)
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}
