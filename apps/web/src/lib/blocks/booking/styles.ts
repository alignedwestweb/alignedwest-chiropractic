export const calendarModifiersStyles = {
  booked: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    textDecoration: "line-through",
  },
  limited: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    fontWeight: "bold",
  },
} as const

// -----------------------------
// Jotform embed & layout styles
// -----------------------------

export const jotformIframeStyles = {
  width: "100%",
  minHeight: "540px",
  border: "none",
  overflow: "hidden",
} as const

export const jotformContainerClass =
  "w-full rounded-2xl overflow-hidden border border-amber-200/50 bg-white"

// -----------------------------
// Booking dialog layout helpers
// -----------------------------

export const dialogHeaderClass =
  "sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-amber-200/50"

export const dialogFooterClass =
  "sticky bottom-0 z-10 bg-white/95 backdrop-blur-sm border-t border-amber-200/50"

export const stepContainerClass =
  "flex-1 overflow-y-auto px-6 py-6 space-y-6"