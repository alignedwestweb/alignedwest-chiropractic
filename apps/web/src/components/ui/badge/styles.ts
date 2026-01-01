import { cva, type VariantProps } from "class-variance-authority"

export const badgeVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap shrink-0 gap-1 [&>svg]:size-3 [&>svg]:pointer-events-none transition-[color,box-shadow,border-color,background-color] overflow-hidden border",
    {
        variants: {
            variant: {
                filled: "",
                outlined: "bg-transparent border border-solid",
                ghost: "bg-transparent border-transparent",
            },

            size: {
                sm: "text-xs p-2",
                md: "text-sm p-2.5",
                lg: "text-base p-3",
            },

            shape: {
                default: "rounded-md",
                ribbon: "rounded-t-md rounded-ee-md",
                circle: "rounded-full",
            },

            color: {
                default: "border-stone-300",
                primary: "border-primary",
                secondary: "border-secondary",
                info: "border-amber-100",
                success: "border-success",
                warning: "border-amber-500",
                destructive: "border-destructive",
                subtle: "border-sunset-200",
                contrast: "border-white",
            },
        },

        compoundVariants: [
            { variant: "filled", color: "default", class: "bg-stone-300 text-stone-900" },
            { variant: "filled", color: "primary", class: "bg-primary text-white" },
            { variant: "filled", color: "secondary", class: "bg-mint-100 text-secondary" },
            { variant: "filled", color: "info", class: "bg-amber-100 text-amber-700" },
            { variant: "filled", color: "success", class: "bg-sage-400 text-white" },
            { variant: "filled", color: "warning", class: "bg-amber-500 text-white" },
            { variant: "filled", color: "destructive", class: "bg-rose-500 text-white" },
            { variant: "filled", color: "subtle", class: "bg-sunset-50 text-primary" },
            { variant: "filled", color: "contrast", class: "bg-white text-black" },

            { variant: "outlined", color: "default", class: "text-default" },
            { variant: "outlined", color: "primary", class: "text-primary" },
            { variant: "outlined", color: "secondary", class: "text-secondary" },
            { variant: "outlined", color: "info", class: "text-info" },
            { variant: "outlined", color: "success", class: "text-success" },
            { variant: "outlined", color: "warning", class: "text-warning" },
            { variant: "outlined", color: "destructive", class: "text-destructive" },
            { variant: "outlined", color: "subtle", class: "text-neutral-800" },
            { variant: "outlined", color: "contrast", class: "text-white" },

            { variant: "ghost", color: "default", class: "text-default" },
            { variant: "ghost", color: "primary", class: "text-primary" },
            { variant: "ghost", color: "secondary", class: "text-secondary" },
            { variant: "ghost", color: "info", class: "text-info" },
            { variant: "ghost", color: "success", class: "text-success" },
            { variant: "ghost", color: "warning", class: "text-warning" },
            { variant: "ghost", color: "destructive", class: "text-destructive" },
            { variant: "ghost", color: "subtle", class: "text-neutral-800" },
            { variant: "ghost", color: "contrast", class: "text-white" },
        ],

        defaultVariants: {
            variant: "filled",
            color: "default",
            shape: "default",
            size: "md",
        },
    }
)

export type BadgeVariantProps = VariantProps<typeof badgeVariants>