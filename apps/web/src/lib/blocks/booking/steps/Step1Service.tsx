import { CheckCircle2, Clock, Leaf, Sparkles } from "lucide-react"

import type { FormData } from "../types"
import { treatments } from "../constants"

type Step1ServiceProps = {
  formData: FormData
  updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void
}

export function Step1Service({ formData, updateField }: Step1ServiceProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <h3 className="text-xl text-primary">Choose Your Healing Journey</h3>
        </div>
        <p className="text-muted-foreground">
          Select the treatment that resonates with your wellness needs
        </p>
      </div>

      <div className="space-y-3">
        {treatments.map((treatment) => (
          <button
            key={treatment.value}
            onClick={() => updateField("service", treatment.value)}
            className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
              formData.service === treatment.value
                ? "border-amber-600 bg-amber-50/50 warm-shadow"
                : "border-amber-200/50 hover:border-amber-400 hover:bg-amber-50/30"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="w-4 h-4 text-amber-600" />
                  <p className="text-primary">{treatment.label}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {treatment.duration} min
                  </span>
                  <span className="text-amber-700">{treatment.price}</span>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  formData.service === treatment.value
                    ? "border-amber-600 bg-amber-600"
                    : "border-amber-300"
                }`}
              >
                {formData.service === treatment.value && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
