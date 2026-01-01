import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"

type BottomNavProps = {
  step: number
  onBack: () => void
  onNext: () => void
  onScrollToIntake: () => void
}

export function BottomNav({ step, onBack, onNext, onScrollToIntake }: BottomNavProps) {
  return (
    <div className="sticky bottom-0 z-10 bg-white/95 backdrop-blur-sm border-t border-amber-200/50 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {step > 1 && step < 4 && (
          <Button
            variant="outlined"
            onClick={onBack}
            className="rounded-full px-6 border-amber-200/50 hover:border-amber-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}

        {step === 1 && <div />}

        {step < 4 ? (
          <Button
            onClick={onNext}
            className="bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300 ml-auto"
          >
            {step === 3 ? "Review Booking" : "Continue"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={onScrollToIntake}
            className="w-full bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Continue to Intake Form
          </Button>
        )}
      </div>
    </div>
  )
}
