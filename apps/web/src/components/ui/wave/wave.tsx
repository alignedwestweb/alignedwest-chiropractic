import { useEffect, useRef } from "react"
import {
  heroBGWrapper,
  canvasContainer,
  getGradientInlineStyle,
  gradientKeyframes,
} from "./styles"
import './gradient.css'
import { NOISE_SETTINGS, RIPPLE_SETTINGS, SAND_SETTINGS, COLORS } from "./constants"
import type { Point } from "./types"

export default function HeroBG() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sandTexCanvas = useRef<HTMLCanvasElement>(document.createElement("canvas"))
  const sandTexCtx = useRef<CanvasRenderingContext2D | null>(null)

  // ----------------------------------------
  // INJECT GRADIENT KEYFRAMES
  // ----------------------------------------
  useEffect(() => {
    const styleEl = document.createElement("style")
    styleEl.innerHTML = gradientKeyframes
    document.head.appendChild(styleEl)
    return () => {
      document.head.removeChild(styleEl)
    }
  }, [])

  // ----------------------------------------
  // NOISE / GRAIN UTILS
  // ----------------------------------------
  const smoothNoise = (width: number, height: number) => {
    const arr = new Float32Array(width * height)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const nx = (x + NOISE_SETTINGS.seed * 31) / NOISE_SETTINGS.scale
        const ny = (y + NOISE_SETTINGS.seed * 17) / NOISE_SETTINGS.scale
        let val =
          Math.sin(nx) * Math.cos(ny * 1.1) +
          Math.cos(nx * 0.71 + 8) * Math.sin(ny * 0.7 - 7) +
          Math.sin(nx * 0.19 + ny * 0.29)
        arr[y * width + x] = (val + 3) / 6
      }
    }
    return arr
  }

  const addSandGrain = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const img = ctx.getImageData(0, 0, width, height)
    for (let i = 0; i < img.data.length; i += 4) {
      const grain = (Math.random() - 0.5) * SAND_SETTINGS.grainIntensity
      img.data[i] += grain
      img.data[i + 1] += grain * 0.8
      img.data[i + 2] += grain * 0.6
    }
    ctx.putImageData(img, 0, 0)
  }

  // ----------------------------------------
  // CREATE SAND TEXTURE
  // ----------------------------------------
  const createSandTexture = (width: number, height: number) => {
    sandTexCanvas.current.width = width * 2
    sandTexCanvas.current.height = height * 2

    sandTexCtx.current = sandTexCanvas.current.getContext("2d")
    const ctx = sandTexCtx.current
    if (!ctx) return

    ctx.fillStyle = COLORS.base
    ctx.fillRect(0, 0, sandTexCanvas.current.width, sandTexCanvas.current.height)

    const data = ctx.getImageData(0, 0, sandTexCanvas.current.width, sandTexCanvas.current.height)
    const arr = smoothNoise(sandTexCanvas.current.width, sandTexCanvas.current.height)

    for (let i = 0; i < arr.length; i++) {
      const grain = Math.floor(arr[i] * 38)
      data.data[i * 4] -= grain
      data.data[i * 4 + 1] -= grain
      data.data[i * 4 + 2] -= grain + 4
    }
    ctx.putImageData(data, 0, 0)

    for (let y = 0; y < sandTexCanvas.current.height; y += SAND_SETTINGS.windLineSpacing) {
      ctx.beginPath()
      for (let x = 0; x <= sandTexCanvas.current.width; x += 2) {
        const wobble =
          Math.sin(x * 0.012 + y * 0.012) * 8 +
          Math.cos((y + x) * 0.0032) * 2 +
          Math.sin(x * 0.019 + y * 0.015)
        ctx.lineTo(x, y + wobble)
      }
      ctx.strokeStyle = COLORS.windStroke
      ctx.lineWidth = 6.5 + Math.sin(y * 0.038) * 1.3
      ctx.shadowColor = "rgba(185,175,130,0.04)"
      ctx.shadowBlur = 6.2
      ctx.stroke()
      ctx.shadowBlur = 2
    }

    addSandGrain(ctx, sandTexCanvas.current.width, sandTexCanvas.current.height)
  }

  // ----------------------------------------
  // DRAW INDIVIDUAL RIPPLE
  // ----------------------------------------
  const drawSandRipple = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, t: number, i: number) => {
    const points: Point[] = []
    for (let a = 0; a < Math.PI * 2; a += RIPPLE_SETTINGS.rippleDetail) {
      const wobble = Math.sin(a * 6 + t * 0.8 + i) * RIPPLE_SETTINGS.wobbleAmp
      const grain = Math.sin(a * 3 + t * 1.17 + i * 0.07) * 0.8
      const x = cx + Math.cos(a) * (r + wobble + grain)
      const y = cy + Math.sin(a) * (r + wobble + grain)
      points.push({ x, y })
    }

    const depthFactor = 1 - i / RIPPLE_SETTINGS.rippleCount

    ctx.beginPath()
    points.forEach((p, idx) => {
      const px = p.x - depthFactor * 3
      const py = p.y - depthFactor * 1
      idx === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
    })
    ctx.strokeStyle = `${COLORS.shadow}${0.15 * depthFactor})`
    ctx.lineWidth = 30 * depthFactor
    ctx.shadowColor = `${COLORS.deepShadow}${0.15 * depthFactor})`
    ctx.shadowBlur = 20 * depthFactor
    ctx.stroke()

    ctx.beginPath()
    points.forEach((p, idx) => {
      const px = p.x + depthFactor * 3
      const py = p.y + depthFactor * 1
      idx === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
    })
    ctx.strokeStyle = `${COLORS.highlight}${0.25 * depthFactor})`
    ctx.lineWidth = 15 * depthFactor
    ctx.shadowBlur = 0
    ctx.stroke()
  }

  // ----------------------------------------
  // DRAW RIPPLE LOOP
  // ----------------------------------------
  const drawRipples = (ctx: CanvasRenderingContext2D, time: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    const offsetX = (time * 0.01) % ctx.canvas.width // slowed down
    const offsetY = (time * 0.0075) % ctx.canvas.height

    if (sandTexCanvas.current) {
      ctx.drawImage(
        sandTexCanvas.current,
        offsetX,
        offsetY,
        ctx.canvas.width,
        ctx.canvas.height,
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      )
    }

    const cx = ctx.canvas.width * 0.5 // center X
    const cy = ctx.canvas.height * 1.1 // shifted start Y so no star-like ripple
    const maxR = Math.max(ctx.canvas.width, ctx.canvas.height) * 1.5
    const t = time * RIPPLE_SETTINGS.rippleSpeed

    for (let i = 0; i < RIPPLE_SETTINGS.rippleCount; i++) {
      const r = (i * 35 + t * 60) % maxR
      drawSandRipple(ctx, cx, cy, r, t, i)
    }
  }

  // ----------------------------------------
  // ANIMATE + RESIZE
  // ----------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createSandTexture(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener("resize", resize)

    const animate = (time: number) => {
      drawRipples(ctx, time)
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  // ----------------------------------------
  // RENDER
  // ----------------------------------------
  return (
    <section className={heroBGWrapper}>
      <div className="absolute inset-0 w-full h-full">
        <div className={`${canvasContainer} absolute inset-0`}>
          <div
            style={getGradientInlineStyle()}
            className="gradient absolute inset-0 z-1 pointer-events-none"
          />
          <canvas ref={canvasRef} className="absolute z-0 inset-0 w-full h-full" />
        </div>

      </div>
    </section>
  )
}