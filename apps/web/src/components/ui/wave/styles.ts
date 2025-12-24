import {
  GRADIENT_ANIMATION_NAME,
  GRADIENT_DURATION,
  GRADIENT_TIMING,
  GRADIENT_OPACITY,
} from "./constants"

/* ────────────────────────────────────────────────
   Layout Containers
────────────────────────────────────────────────── */

export const heroBGWrapper = `
  flex relative w-full h-full overflow-hidden justify-center items-center
`

export const canvasContainer = `
  flex absolute top-0 left-0 w-full h-full inset-0 z-0 pointer-events-none
`

export const gradientOverlay = `
  absolute inset-0 z-1 opacity-100 pointer-events-none
`

export const sandImage = `
  fixed z-0 opacity-20 inset-0 size-full object-cover
`

/* ────────────────────────────────────────────────
   RAW React CSS Style Object (old version preserved)
────────────────────────────────────────────────── */

export const gradientStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: `linear-gradient(
    45deg,
    #0E1429 0%,
    #293150 50%,
    #4A548F 100%,
  )`,
  backgroundSize: "400% 400%",
  animation: "gradient-shift 5s ease infinite",
  opacity: 1,
  zIndex: 1,
}

/* ────────────────────────────────────────────────
   Tailwind Class Version of the Gradient Layer
────────────────────────────────────────────────── */

export const gradientStyleClass = `
  absolute inset-0 z-30 pointer-events-none
  bg-[linear-gradient(45deg,#0E1429_0%,#293150_50%,#4A548F_100%)]
  bg-[length:400%_400%]
  animate-gradientShift
`

/* ────────────────────────────────────────────────
   Keyframes For Injection (No external CSS file)
────────────────────────────────────────────────── */

export const gradientKeyframes = `
@keyframes ${GRADIENT_ANIMATION_NAME} {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`

/* ────────────────────────────────────────────────
   Inline Gradient Style Generator
────────────────────────────────────────────────── */

export function getGradientInlineStyle(): Record<string, string | number> {
  return {
    background:
      "linear-gradient(45deg, #0E1429 0%, #293150 50%, #4A548F 100%)",
    backgroundSize: "400% 400%",
    animationName: GRADIENT_ANIMATION_NAME,
    animationDuration: GRADIENT_DURATION,
    animationTimingFunction: GRADIENT_TIMING,
    animationIterationCount: "infinite",
    opacity: String(GRADIENT_OPACITY),
  }
}