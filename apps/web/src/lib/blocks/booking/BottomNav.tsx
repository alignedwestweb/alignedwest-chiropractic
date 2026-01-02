import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"

type BottomNavProps = {
  step: number
  onBack: () => void
  onNext: () => void
  onScrollToIntake: () => void

  /**
   * Optional: CSS selector for the actual submit button you want clicked.
   * Examples:
   *  - "#input_36" (Jotform submit)
   *  - "button[type='submit']"
   */
  submitSelector?: string

  /**
   * Optional: if your submit button lives inside an iframe you control (same-origin),
   * pass a selector to find that iframe and we'll attempt to click inside it.
   * NOTE: This will NOT work for cross-origin iframes (standard Jotform embed).
   */
  iframeSelector?: string
}

function tryClick(el: Element | null) {
  if (!el) return false
  const htmlEl = el as HTMLElement
  htmlEl.focus?.()
  htmlEl.click?.()
  return true
}

function trySubmit({
  submitSelector,
  iframeSelector,
}: {
  submitSelector?: string
  iframeSelector?: string
}) {
  if (!submitSelector) return false

  // 1) Same-page DOM (works if Jotform is not cross-origin iframe)
  if (tryClick(document.querySelector(submitSelector))) return true

  // 2) Same-origin iframe (works only if iframe is same-origin)
  if (iframeSelector) {
    const frame = document.querySelector(iframeSelector) as HTMLIFrameElement | null
    const doc = frame?.contentDocument
    if (doc && tryClick(doc.querySelector(submitSelector))) return true
  }

  return false
}

export function BottomNav({
  step,
  onBack,
  onNext,
  onScrollToIntake,
  submitSelector,
  iframeSelector,
}: BottomNavProps) {
  const handleFinalCTA = () => {
    const submitted = trySubmit({ submitSelector, iframeSelector })
    if (!submitted) onScrollToIntake()
  }

  return (
    <div className="sticky bottom-0 z-10 bg-white/95 backdrop-blur-sm border-t border-amber-200/50 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {step > 1 && step < 4 ? (
          <Button
            variant="outlined"
            onClick={onBack}
            className="rounded-full px-6 border-amber-200/50 hover:border-amber-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <Button
            onClick={onNext}
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300 ml-auto"
          >
            {step === 3 ? "Book Now" : "Continue"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleFinalCTA}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Submit Intake Form
          </Button>
        )}
      </div>
    </div>
  )
}
