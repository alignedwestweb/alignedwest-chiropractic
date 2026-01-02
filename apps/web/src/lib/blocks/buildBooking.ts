const BOOKING_BASE = "https://form.jotform.com/253645977132162"

type BookingOpts = {
  serviceType?: string; // e.g. "New Patient - NAET"
};

export function buildBookingSrc(opts: BookingOpts = {}) {
  const url = new URL(BOOKING_BASE)

  // Only add params if you pass them
  if (opts.serviceType) {
    url.searchParams.set("serviceType", opts.serviceType)
    url.searchParams.set("q20_serviceType", opts.serviceType) // keep if your form uses it
  }

  return url.toString()
}