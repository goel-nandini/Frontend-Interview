import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBlog } from "../hooks/useCreateBlog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export default function CreateBlog() {
    const navigate = useNavigate();
    const { mutate, isLoading, isError } = useCreateBlog();

    const [formData, setFormData] = useState({
        title: "",
        coverImage: "",
        description: "",
        content: "",
        category: "",
    });

    const [validationError, setValidationError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setValidationError("");

        // Basic validation
        if (
            !formData.title.trim() ||
            !formData.coverImage.trim() ||
            !formData.description.trim() ||
            !formData.content.trim() ||
            !formData.category.trim()
        ) {
            setValidationError("All fields are required.");
            return;
        }

        // Prepare payload - Convert category string to uppercase array
        const categoriesArray = formData.category
            .split(",")
            .map((cat) => cat.trim().toUpperCase())
            .filter((cat) => cat !== "");

        const payload = {
            title: formData.title,
            coverImage: formData.coverImage,
            description: formData.description,
            content: formData.content,
            category: categoriesArray,
            date: new Date().toISOString(),
        };

        mutate(payload, {
            onSuccess: () => {
                // Redirect to blog list
                navigate("/blogs");
            },
        });
    };


    // Helper for category preview
    const previewCategories = formData.category
        .split(",")
        .map((cat) => cat.trim())
        .filter((cat) => cat !== "");

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl animate-in fade-in duration-500">
            <Card className="shadow-2xl border-none bg-white/80 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Create New Story
                    </CardTitle>
                    <p className="text-muted-foreground text-lg">
                        Share your thoughts and inspire the world.
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Title */}
                        <div className="space-y-3">
                            <Label htmlFor="title" className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                                Blog Title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter a catchy title"
                                value={formData.title}
                                onChange={handleChange}
                                className="h-12 text-lg focus:ring-2 focus:ring-blue-500 transition-all border-gray-200"
                            />
                        </div>

                        {/* Cover Image URL */}
                        <div className="space-y-3">
                            <Label htmlFor="coverImage" className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                                Cover Image URL
                            </Label>
                            <Input
                                id="coverImage"
                                name="coverImage"
                                placeholder="https://images.unsplash.com/..."
                                value={formData.coverImage}
                                onChange={handleChange}
                                className="focus:ring-2 focus:ring-blue-500 transition-all border-gray-200"
                            />
                        </div>

                        {/* Categories */}
                        <div className="space-y-3">
                            <Label htmlFor="category" className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                                Categories
                            </Label>
                            <Input
                                id="category"
                                name="category"
                                placeholder="FINANCE, TECH, LIFESTYLE"
                                value={formData.category}
                                onChange={handleChange}
                                className="focus:ring-2 focus:ring-blue-500 transition-all border-gray-200"
                            />
                            <p className="text-xs text-muted-foreground italic">Separate tags with commas</p>
                            {previewCategories.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {previewCategories.map((cat, i) => (
                                        <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 uppercase text-[10px] font-bold">
                                            {cat}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <Label htmlFor="description" className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                                Short Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="A brief summary of your blog post..."
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                className="resize-none focus:ring-2 focus:ring-blue-500 transition-all border-gray-200"
                            />
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                            <Label htmlFor="content" className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                                Full Content
                            </Label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Write your masterpiece here..."
                                rows={10}
                                value={formData.content}
                                onChange={handleChange}
                                className="focus:ring-2 focus:ring-blue-500 transition-all border-gray-200"
                            />
                        </div>

                        {/* Errors */}
                        {(validationError || isError) && (
                            <div className="p-4 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl animate-shake">
                                {validationError || "Something went wrong. Please try again."}
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-6 flex gap-4">
                            <Button
                                type="button"
                                variant="ghost"
                                className="flex-1 h-12 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
                                onClick={() => navigate("/")}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-200 transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Publishing...
                                    </span>
                                ) : (
                                    "Publish Blog"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

