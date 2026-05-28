import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    {
        variants: {
            variant: {
                default:
                    "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slat",

                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                ghost: "bg-transparent text-slate-500 border-transparent",
                link: "text-primary underline-offset-4 hover:underline",

                primary:
                    "bg-sky-400 text-primary-foreground hover:bg-sky-400/90 border-sky-500 border-b-4 active:border-b-0",
                primaryOutline: "bg-white text-sky-500 hover:bg-slate-100",
                secondary:
                    "bg-emerald-500 text-black hover:bg-emerald-400 border-b-4 border-emerald-700 active:border-b-0",
                secondaryOutline: "bg-transparent text-emerald-400 border border-emerald-500 hover:bg-emerald-500/10",
                danger:
                    "bg-rose-500 text-primary-foreground hover:bg-rose-500/90 border-rose-600 border-b-4 active:border-b-0",
                dangerOutline: "bg-white text-rose-500 hover:bg-slate-100",
                super:
                    "bg-indigo-500 text-primary-foreground hover:bg-indigo-500/90 border-indigo-600 border-b-4 active:border-b-0",
                superOutline: "bg-white text-indigo-500 hover:bg-slate-100",

                sidebar:
                    "bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none",
                sidebarOutline:
                    "bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20 transition-none",

                locked:
                    "bg-neutral-200 text-primary-foreground hover:bg-neutral-200/90 border-neutral-400 border-b-4 active:border-b-0",
                cta:
                    "rounded-full bg-emerald-500 text-black hover:bg-emerald-400 active:bg-emerald-600 shadow-[0_0_16px_rgba(16,185,129,0.35)] hover:shadow-[0_0_22px_rgba(16,185,129,0.5)]",
            },
            size: {
                default: "h-11 px-4 py-2",
                sm: "h-9 px-3",
                lg: "h-12 px-8",
                icon: "h-10 w-10",
                rounded: "h-10 px-6 rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Button({
                    className,
                    variant,
                    size,
                    asChild = false,
                    ...props
                }: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
    asChild?: boolean
}) {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({variant, size, className}))}
            {...props}
        />
    )
}

export { Button, buttonVariants }
