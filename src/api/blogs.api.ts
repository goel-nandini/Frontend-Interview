import api from '../lib/axios';

// Data Contracts
export interface Blog {
    id: number;
    title: string;
    category: string[];
    description: string;
    date: string;
    coverImage: string;
    content: string;
}

export type CreateBlogPayload = Omit<Blog, 'id'>;

// API Functions

/**
 * Get all blogs
 */
export const getBlogs = async (): Promise<Blog[]> => {
    const response = await api.get<Blog[]>('/blogs');
    return response.data;
};

/**
 * Get blog by ID
 */
export const getBlogById = async (id: string | number): Promise<Blog> => {
    const response = await api.get<Blog>(`/blogs/${id}`);
    return response.data;
};

/**
 * Create new blog
 */
export const createBlog = async (data: CreateBlogPayload): Promise<Blog> => {
    const response = await api.post<Blog>('/blogs', data);
    return response.data;
};
