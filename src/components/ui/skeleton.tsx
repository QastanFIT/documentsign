import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

type SkeletonProps = {
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
}

const skeletonVariants = cva(
    "animate-pulse bg-muted",
    {
      variants: {
        size: {
            xs: 'h-[12px]',
            sm: 'h-[14px]',
            base: 'h-[16px]',
            lg: 'h-[18px]',
            xl: 'h-[20px]',
            '2xl': 'h-[24px]',
            '3xl': 'h-[30px]',
            '4xl': 'h-[36px]',
            '5xl': 'h-[48px]',
            '6xl': 'h-[60px]',
            '7xl': 'h-[72px]',
            '8xl': 'h-[96px]',
            '9xl': 'h-[128px]',
        },
      },
      defaultVariants: {
        size: "base",
      },
    })

function Skeleton({
    size,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ size, className }))}
      {...props}
    />
  )
}

export { Skeleton }
