import { useQuery } from '@tanstack/react-query';
import { getBlogs, Blog } from '../api/blogs.api';

/**
 * Hook to fetch all blogs
 */
export const useBlogs = () => {
    return useQuery<Blog[]>({
        queryKey: ['blogs'],
        queryFn: getBlogs,
    });
};
