import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonImage() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="max-w-[140px] md:max-w-[250px] h-[80px] rounded-xl" />
        </div>
    )
}