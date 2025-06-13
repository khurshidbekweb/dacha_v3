import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCardBanner() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full md:h-[440px] rounded-xl" />
        </div>
    )
}
