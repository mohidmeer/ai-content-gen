import { Skeleton } from "../ui/skeleton";

export const EditorSkeleton = () => {
    return (
        <div className="flex flex-col  space-y-4 bg-card rounded-lg">
            {/* Toolbar */}
            <div className="flex space-x-2">
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
                <Skeleton className="w-10 h-10" />
            </div>
            {/* Content Area */}
            <div className="flex flex-col space-y-2">
                <Skeleton className="w-full h-60" /> {/* Main text area */}
                <Skeleton className="w-full h-6" /> {/* Footer or additional information */}
            </div>
            <div className="flex space-x-2">
                <div className="flex flex-col space-y-2 flex-grow">
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-full h-6" />
                </div>
            </div>
        </div>
    );
};