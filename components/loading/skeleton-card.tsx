import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[130px] md:h-[180px] w-full md:w-[320px] rounded-xl bg-gray-300 dark:bg-secondary" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-gray-300 dark:bg-secondary" />
                <Skeleton className="h-4 w-full bg-gray-300 dark:bg-secondary" />
                <Skeleton className="h-4 w-full bg-gray-300 dark:bg-secondary" />
                <Skeleton className="h-4 w-full hidden md:block bg-gray-300 dark:bg-secondary" />
            </div>
        </div>
    )
}
