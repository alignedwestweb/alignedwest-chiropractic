import type { RippleSettings, NoiseSettings, SandTextureSettings } from "./types"

// Noise / grain settings
export const NOISE_SETTINGS: NoiseSettings = {
  scale: 42,
  seed: Math.random() * 1000,
}

// Ripple settings
export const RIPPLE_SETTINGS: RippleSettings = {
  rippleDetail: 0.02,
  wobbleAmp: 6,
  rippleCount: 40,
  rippleSpeed: 0.002, // controls animation speed
}

// Sand texture settings
export const SAND_SETTINGS: SandTextureSettings = {
  grainIntensity: 30,
  windLineSpacing: 3,
}

// Sand colors + lighting
export const COLORS = {
  base: "#fcf8ee",
  shadow: "rgba(150,130,90,",
  deepShadow: "rgba(100,80,50,",
  highlight: "rgba(255,245,220,",
  windStroke: "rgba(220,190,120,0.02)",
}

// Gradient animation constants
export const GRADIENT_ANIMATION_NAME = "gradient-shift"
export const GRADIENT_DURATION = "20s" // slower than before
export const GRADIENT_TIMING = "ease"
export const GRADIENT_OPACITY = 1