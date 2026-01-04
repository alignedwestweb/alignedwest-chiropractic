import {
  GRADIENT_ANIMATION_NAME,
  GRADIENT_DURATION,
  GRADIENT_TIMING,
  GRADIENT_OPACITY,
} from "./constants"

export const heroBGWrapper = `
  flex relative size-full overflow-hidden justify-center items-center
`

export const canvasContainer = `
  flex absolute top-0 left-0 size-full inset-0 z-0 pointer-events-none
`

export const gradientOverlay = `
  absolute inset-0 z-1 opacity-100 pointer-events-none
`

export const sandImage = `
  fixed z-0 opacity-20 inset-0 size-full object-cover
`

export const gradientKeyframes = `
@keyframes ${GRADIENT_ANIMATION_NAME} {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`

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