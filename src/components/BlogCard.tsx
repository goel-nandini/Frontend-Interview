import type { Blog } from "../api/blogs.api";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface BlogCardProps {
    blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
    // Simple date formatter
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            {/* Cover Image */}
            <div className="aspect-video w-full overflow-hidden">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>

            <CardHeader className="space-y-1">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                    {formatDate(blog.date)}
                </div>
                <CardTitle className="line-clamp-2 hover:text-blue-600 transition-colors">
                    {blog.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 flex-1 flex flex-col">
                <p className="text-gray-600 line-clamp-3 text-sm flex-1">
                    {blog.description}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {blog.category.map((cat) => (
                        <Badge key={cat} variant="secondary">
                            {cat}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
