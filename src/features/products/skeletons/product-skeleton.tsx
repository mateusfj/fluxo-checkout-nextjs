import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden transition rounded-none shadow-none border-none p-0 bg-transparent">
      <CardHeader className="flex justify-center p-6 bg-muted rounded-md">
        <Skeleton className="h-50 w-full object-contain" />
      </CardHeader>
      <CardContent className="space-y-1 text-start p-0">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-3/4 rounded" />
          <Skeleton className="h-5 w-16 rounded" />
        </div>
        <Skeleton className="h-3 w-full rounded mt-2" />
        <Skeleton className="h-3 w-5/6 rounded" />
      </CardContent>
      <CardFooter className="flex justify-start p-0">
        <Skeleton className="h-10 w-40 rounded-full" />
      </CardFooter>
    </Card>
  );
}
