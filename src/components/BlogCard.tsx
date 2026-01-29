import type { Blog } from "../api/blogs.api";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
    blog: Blog;
    variant?: "default" | "mini";
    active?: boolean;
}

export function BlogCard({ blog, variant = "default", active }: BlogCardProps) {
    const navigate = useNavigate();

    // Simple date formatter
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (variant === "mini") {
        return (
            <div
                onClick={() => navigate(`/blogs/${blog.id}`)}
                className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white hover:shadow-md border border-transparent ${active ? "bg-white shadow-md border-blue-100" : "bg-transparent"
                    }`}
            >
                <div className="h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col justify-center min-w-0">
                    <h4 className={`text-sm font-semibold line-clamp-2 leading-tight transition-colors ${active ? "text-blue-600" : "text-gray-900"
                        }`}>
                        {blog.title}
                    </h4>
                    <span className="text-xs text-gray-500 mt-1">{formatDate(blog.date)}</span>
                </div>
            </div>
        );
    }

    return (
        <Card
            onClick={() => navigate(`/blogs/${blog.id}`)}
            className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
        >
            {/* Cover Image */}
            <div className="aspect-video w-full overflow-hidden">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <CardHeader className="space-y-1">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                    {formatDate(blog.date)}
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
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
