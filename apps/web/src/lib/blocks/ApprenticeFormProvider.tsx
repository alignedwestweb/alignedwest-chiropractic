import React, { createContext, useContext, useMemo, useState, useCallback } from "react"
import { BookingDialog } from "@/lib/blocks/JotformsDialog"

const APPRENTICE_BASE = "https://form.jotform.com/253270906369059"

type ApprenticeFormContextValue = {
  openForm: (url?: string) => void
  closeForm: () => void
}

const ApprenticeFormContext = createContext<ApprenticeFormContextValue | undefined>(undefined)

export function ApprenticeFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [src, setSrc] = useState<string>(APPRENTICE_BASE)

  const openForm = useCallback((url?: string) => {
    setSrc(url ?? APPRENTICE_BASE)
    setIsOpen(true)
  }, [])

  const closeForm = useCallback(() => setIsOpen(false), [])

  const value = useMemo(() => ({ openForm, closeForm }), [openForm, closeForm])

  return (
    <ApprenticeFormContext.Provider value={value}>
      {children}

      {/* Render the dialog once so it can be opened from anywhere via context */}
      <BookingDialog isOpen={isOpen} onClose={closeForm} src={src} />
    </ApprenticeFormContext.Provider>
  )
}

export function useApprenticeForm() {
  const ctx = useContext(ApprenticeFormContext)
  if (!ctx) throw new Error("useApprenticeForm must be used within <ApprenticeFormProvider />")
  return ctx
}
