import { Skeleton } from "../ui/skeleton";

export default function LoadingSkeleton() {
    return (
        <div className="flex w-full flex-col space-y-3">
            <div className="flex justify-between">
                <Skeleton className="h-[25px] w-[20%] rounded-xl" />
                <Skeleton className="h-[25px] w-[20%] rounded-xl" />
            </div>
            <Skeleton className="h-[25px] w-full rounded-xl" />
            <Skeleton className="h-[25px] w-full rounded-xl" />
            <Skeleton className="h-[25px] w-full rounded-xl" />
        </div>
    )
}
