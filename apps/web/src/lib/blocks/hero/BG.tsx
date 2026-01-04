import { BGImage } from "@/components/ui/image"
import { HERO_BG_WRAPPER_STYLES, bgStyles, DEFAULT_BACKGROUND_ALT, type BGProps } from "@/lib/blocks/hero"
import { cn } from '@/lib/utils'

export function BackgroundImages({
  fixed = true,
  images,
  fallback,
  alt = DEFAULT_BACKGROUND_ALT,
  className,
}: BGProps) {
  const wrapperClass = fixed
    ? HERO_BG_WRAPPER_STYLES.parallax
    : HERO_BG_WRAPPER_STYLES.fixed
  const imageSM = images?.sm ?? fallback
  const imageMD = images?.md ?? fallback
  const imageLG = images?.lg ?? fallback

  const applyFixed = (style: string) =>
    fixed ? style : style.replace("fixed ", "")

  return (
    <div className={cn(wrapperClass, className)}>

      {/* Large screens */}
      {imageLG && (
        <BGImage
          alt={alt}
          src={imageLG}
          loading="lazy"
          className={`${applyFixed(bgStyles.lg)} ${className ?? ""}`}
        />
      )}

      {/* Tablets */}
      {imageMD && (
        <BGImage
          alt={alt}
          src={imageMD}
          loading="lazy"
          className={`${applyFixed(bgStyles.md)} ${className ?? ""}`}
        />
      )}

      {/* Mobile — eager load to ensure quick display */}
      {imageSM && (
        <BGImage
          alt={alt}
          src={imageSM}
          loading="eager"
          className={`${applyFixed(bgStyles.sm)} ${className ?? ""}`}
        />
      )}
    </div>
  )
}
