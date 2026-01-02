"use client"

import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog"

type BookingDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;              // the jotform URL to embed
  title?: string;
};

export function BookingDialog({
  isOpen,
  onClose,
  src
}: BookingDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 max-w-none w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] overflow-hidden">
    

        <div className="px-3 pt-12 pb-3 h-full">
          <iframe
            key={src} // IMPORTANT: forces reload when src changes
            title="Booking"
            src={src}
            className="w-full h-full border-0 rounded-md"
            allow="geolocation; microphone; camera; fullscreen; payment"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}