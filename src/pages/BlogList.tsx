import { useBlogs } from "../hooks/useBlogs";
import { BlogCard } from "../components/BlogCard";
import { BlogListSkeleton } from "../components/BlogSkeleton";
import { useParams, useNavigate } from "react-router-dom";
import BlogDetail from "./BlogDetail";
import { Button } from "../components/ui/button";

export default function BlogList() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: blogs, isLoading, error } = useBlogs();

    const isDetailMode = !!id;

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Blogs</h2>
                <p className="text-gray-600">Please check if your JSON server is running on port 3001.</p>
            </div>
        );
    }

    if (isDetailMode) {
        return (
            <div className="flex flex-col h-screen overflow-hidden bg-white">
                {/* Global Header with Close Button */}
                <header className="h-16 border-b flex items-center justify-between px-6 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex items-center gap-4">
                        <h2 className="font-bold text-xl text-gray-900 tracking-tight">Blog Reader</h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate("/")}
                        className="rounded-full hover:bg-gray-100 transition-colors"
                        title="Close and return to Grid View"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </Button>
                </header>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <aside className="w-80 border-r bg-gray-50/50 overflow-y-auto hidden md:block">
                        <div className="p-4 space-y-4">
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2">More Stories</h3>
                            {isLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-20 bg-gray-200 animate-pulse rounded-xl" />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {blogs?.map((blog) => (
                                        <BlogCard
                                            key={blog.id}
                                            blog={blog}
                                            variant="mini"
                                            active={blog.id === id}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
                        <BlogDetail isEmbedded={true} />
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="mb-12 flex justify-between items-end gap-6">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
                        Blogs
                    </h1>
                    <p className="text-lg text-gray-500">
                        Discover our latest stories, tutorials, and insights.
                    </p>
                </div>
                <Button onClick={() => navigate("/blogs/new")} className="mb-2">Create New Blog</Button>
            </header>

            {isLoading ? (
                <BlogListSkeleton />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
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
