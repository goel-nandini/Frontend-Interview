import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function BlogSkeleton() {
    return (
        <Card className="overflow-hidden flex flex-col h-full">
            {/* Image Skeleton */}
            <Skeleton className="aspect-video w-full" />

            <CardHeader className="space-y-2">
                {/* Date Skeleton */}
                <Skeleton className="h-4 w-24" />
                {/* Title Skeleton */}
                <Skeleton className="h-7 w-full" />
            </CardHeader>

            <CardContent className="space-y-4 flex-1">
                {/* Description Skeleton */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Badges Skeleton */}
                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>
            </CardContent>
        </Card>
    );
}

export function BlogListSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <BlogSkeleton key={i} />
            ))}
        </div>
    );
}
