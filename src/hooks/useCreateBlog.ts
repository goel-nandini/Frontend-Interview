import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog, CreateBlogPayload, Blog } from '../api/blogs.api';

/**
 * Hook to create a new blog
 */
export const useCreateBlog = () => {
    const queryClient = useQueryClient();

    return useMutation<Blog, Error, CreateBlogPayload>({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};
