import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"

declare global {
  interface Window {
    JotformAgent?: any
  }
}

const AGENT_SCRIPT_SRC =
  "https://cdn.jotfor.ms/agent/embedjs/019b85fe75807be7928b4261d8b79b329f33/embed.js"

function loadScriptOnce(src: string) {
  return new Promise<void>((resolve, reject) => {
    // already loaded?
    if (document.querySelector(`script[src="${src}"]`)) return resolve()

    const s = document.createElement("script")
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.body.appendChild(s)
  })
}

export default function JotformAgent() {
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    loadScriptOnce(AGENT_SCRIPT_SRC)
      .then(() => setReady(true))
      .catch(() => setReady(false))
  }, [])

  useEffect(() => {
    if (!ready) return

    // Some Jotform agent embeds auto-render the widget when script loads.
    // If yours requires explicit init, it usually looks like:
    //
    // window.JotformAgent?.init?.({
    //   // agentId: "...",
    //   // ...options
    // })
    //
    // Leave this here only if your agent needs it.
  }, [ready])

  useEffect(() => {
    if (!ready) return

    // If the agent exposes open/close methods, use them.
    // Otherwise it may render its own launcher and you can skip our toggle UI.
    if (open) {
      window.JotformAgent?.open?.()
    } else {
      window.JotformAgent?.close?.()
    }
  }, [open, ready])

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
        aria-label={open ? "Close chat" : "Open chat"}
        disabled={!ready}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Optional: if the agent needs a mount target, keep this.
          If your script auto-injects everything, you can delete it. */}
      <div id="jotform-agent-root" />
    </>
  )
}