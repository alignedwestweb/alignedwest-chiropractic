import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./badge" // adjust path
import type { BadgeProps } from "./types" // adjust path
import type { BadgeVariantProps } from "./styles"

const VARIANTS: NonNullable<BadgeProps["variant"]>[] = ["filled", "outlined", "ghost"]
const COLORS: NonNullable<BadgeProps["color"]>[] = [
  "default",
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "destructive",
  "subtle",
  "contrast",
]
const SIZES: NonNullable<BadgeVariantProps["size"]>[] = ["sm", "md", "lg"]
const SHAPES: NonNullable<BadgeVariantProps["shape"]>[] = ["default", "ribbon", "circle"]

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  args: {
    variant: "filled",
    color: "default",
    size: "md",
    shape: "default",
    children: "Badge",
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    color: { control: "select", options: COLORS },
    size: { control: "select", options: SIZES },
    shape: { control: "select", options: SHAPES },
    children: { control: "text" },
  },
}
export default meta

type Story = StoryObj<typeof Badge>

export const Playground: Story = {}

export const AllColors: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: 16 }}>
      {COLORS.map((color) => (
        <Badge key={color} {...args} color={color}>
          {color}
        </Badge>
      ))}
    </div>
  ),
}

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 16, padding: 16 }}>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {COLORS.map((color) => (
            <Badge key={`${variant}-${color}`} {...args} variant={variant} color={color}>
              {variant} / {color}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const SizesAndShapes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 16, padding: 16 }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          {SHAPES.map((shape) => (
            <Badge key={`${size}-${shape}`} {...args} size={size} shape={shape}>
              {shape === "circle" ? "●" : `${size} / ${shape}`}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}

/** Full “does everything actually work?” matrix */
export const Matrix: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 20, padding: 16 }}>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: "grid", gap: 10 }}>
          <div style={{ fontWeight: 600 }}>{variant}</div>
          {SIZES.map((size) => (
            <div key={`${variant}-${size}`} style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
              {COLORS.map((color) => (
                <Badge
                  key={`${variant}-${size}-${color}`}
                  {...args}
                  variant={variant}
                  size={size}
                  color={color}
                  shape="default"
                >
                  {color}
                </Badge>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}