import { useEffect } from "react"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "all", label: "All Resources" },
  { id: "apprenticeship", label: "Apprenticeship Program" },
  { id: "blog", label: "Blog" },
  { id: "industry", label: "Industry Insights" },
  { id: "skills", label: "Skills & Training" },
]

type Props = {
  value: string
  onChange: (categoryId: string) => void
}

export function CategoryChips({ value, onChange }: Props) {
  // Optional: keep in sync with back/forward buttons
  useEffect(() => {
    const onPop = () => {
      const params = new URLSearchParams(window.location.search)
      onChange(params.get("category") || "all")
    }
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [onChange])

  const handleCategoryClick = (categoryId: string) => {
    onChange(categoryId)

    const url =
      categoryId === "all"
        ? "/resources"
        : `/resources?category=${categoryId}`

    window.history.pushState({}, "", url)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={value === category.id ? "filled" : "outlined"}
          size="sm"
          onClick={() => handleCategoryClick(category.id)}
          className="rounded-full"
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}