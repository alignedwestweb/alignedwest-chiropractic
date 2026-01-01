import { Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  label: string
}

interface ProgressStepperProps {
  steps: Step[]
  currentStep: number
}

export function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <div className="flex items-center gap-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep
        const isDone = stepNumber === steps.length && currentStep >= steps.length

        return (
          <div key={index} className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-full text-2xl font-medium",
                  isCurrent && "bg-[#D4A574] text-[#8B6F47]",
                  isCompleted && "bg-[#E8DCC8] text-[#9B8B7A]",
                  !isCurrent && !isCompleted && !isDone && "bg-[#E8DCC8] text-[#9B8B7A]",
                  isDone && "border-2 border-[#D4A574] bg-white text-[#D4A574]",
                )}
              >
                {isDone ? <Check className="h-8 w-8 stroke-[3]" /> : stepNumber}
              </div>
              <span className={cn("text-base font-medium", isCurrent ? "text-foreground" : "text-muted-foreground")}>
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && <ChevronRight className="h-8 w-8 text-muted-foreground -mt-8" />}
          </div>
        )
      })}
    </div>
  )
}
