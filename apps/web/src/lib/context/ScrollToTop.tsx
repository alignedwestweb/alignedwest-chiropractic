import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) // or remove behavior for instant
  }, [pathname, search]) // include search if you want ?article=... to also scroll

  return null
}