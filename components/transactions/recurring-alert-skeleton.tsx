import { Skeleton } from "@/components/ui/skeleton"
import { Alert } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

export function RecurringAlertSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn("flex-1 @container", className)}>
            <Alert className="bg-primary/5 border-primary/20 flex flex-col items-center gap-4 py-4 @md:flex-row @md:justify-between">
                <div className="flex flex-col items-center gap-3 @md:flex-row flex-1 w-full">
                    {/* Icon skeleton */}
                    <Skeleton className="size-9 rounded-full shrink-0" />
                    
                    <div className="space-y-2 flex-1 w-full flex flex-col items-center @md:items-start">
                        {/* Title skeleton */}
                        <Skeleton className="h-5 w-48" />
                        {/* Description skeleton */}
                        <Skeleton className="h-4 w-full max-w-[350px]" />
                    </div>
                </div>

                {/* Button skeleton */}
                <Skeleton className="h-9 w-full @md:w-24 @md:ml-4" />
            </Alert>
        </div>
    )
}
