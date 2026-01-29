import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Skeleton } from "../components/ui/skeleton";

interface BlogDetailProps {
    isEmbedded?: boolean;
}

export default function BlogDetail({ isEmbedded = false }: BlogDetailProps) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: blog, isLoading, error } = useBlog(id || "");

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (error) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h2 className="text-3xl font-bold text-red-600 mb-4">Blog Not Found</h2>
                <p className="text-gray-600 mb-8">
                    Sorry, we couldn't find the blog you're looking for.
                </p>
                <Button onClick={() => navigate("/")} variant="outline">
                    Back to list
                </Button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <Skeleton className="h-10 w-24 mb-8" />
                <Skeleton className="aspect-video w-full rounded-2xl mb-10" />
                <div className="space-y-4 mb-10">
                    <Skeleton className="h-12 w-3/4" />
                    <div className="flex gap-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-4 w-32" />
                </div>
                <Separator className="my-8" />
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        );
    }

    if (!blog) return null;

    return (
        <div className={`container mx-auto px-4 py-12 max-w-4xl transition-all duration-300 ${isEmbedded ? "max-w-none px-8 lg:px-12" : ""
            }`}>
            {!isEmbedded && (
                <Button
                    onClick={() => navigate("/")}
                    variant="outline"
                    className="mb-8 group"
                >
                    <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span>
                    Back to Blogs
                </Button>
            )}

            <article>
                {/* Cover Image */}
                <div className="aspect-video w-full overflow-hidden rounded-2xl mb-10 shadow-xl">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Header Info */}
                <div className="space-y-6 mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center text-sm font-medium text-gray-500">
                            {formatDate(blog.date)}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {blog.category.map((cat) => (
                                <Badge key={cat} variant="secondary">
                                    {cat}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <p className="text-xl text-gray-500 italic border-l-4 border-blue-500 pl-4 py-1">
                        {blog.description}
                    </p>
                </div>

                <Separator className="my-10" />

                {/* Main Content */}
                <Card className="border-none shadow-none bg-transparent">
                    <CardContent className="p-0 prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6">
                        {blog.content.split("\n\n").map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </CardContent>
                </Card>
            </article>
        </div>
    );
}
