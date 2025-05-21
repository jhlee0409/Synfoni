import { cn } from "@/lib/utils"

/**
 * Renders a placeholder div with a pulsing animation, typically used to indicate loading content.
 *
 * Combines default skeleton styling with any additional classes and props provided.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
