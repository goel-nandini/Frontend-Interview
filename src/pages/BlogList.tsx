import { useBlogs } from "../hooks/useBlogs";
import { BlogCard } from "../components/BlogCard";
import { BlogListSkeleton } from "../components/BlogSkeleton";

export default function BlogList() {
    const { data: blogs, isLoading, error } = useBlogs();

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Blogs</h2>
                <p className="text-gray-600">Please check if your JSON server is running on port 3001.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
                    Blogs
                </h1>
                <p className="text-lg text-gray-500">
                    Discover our latest stories, tutorials, and insights.
                </p>
            </header>

            {isLoading ? (
                <BlogListSkeleton />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs?.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                    {blogs?.length === 0 && (
                        <p className="col-span-full text-center text-gray-500 py-12">
                            No blogs found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
