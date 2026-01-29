import { Routes, Route, Navigate } from "react-router-dom";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/new" element={<CreateBlog />} />
        <Route path="/blogs/:id" element={<BlogList />} />

        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}
