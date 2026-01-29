import { useQuery } from '@tanstack/react-query';
import { getBlogById, Blog } from '../api/blogs.api';

/**
 * Hook to fetch a single blog by ID
 */
export const useBlog = (id: string | number) => {
    return useQuery<Blog>({
        queryKey: ['blogs', id],
        queryFn: () => getBlogById(id),
        enabled: !!id,
    });
};
