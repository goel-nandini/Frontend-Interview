import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog } from '../api/blogs.api';
import type { CreateBlogPayload, Blog } from '../api/blogs.api';

/**
 * Hook to create a new blog
 */
export const useCreateBlog = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<Blog, Error, CreateBlogPayload>({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });

    return {
        mutate: mutation.mutate,
        isLoading: mutation.isPending,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
    };
};

