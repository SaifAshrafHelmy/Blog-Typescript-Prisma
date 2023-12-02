import { z } from 'zod';

export const CreatePostDTO = z.object({
    title: z.string({
        required_error: 'title is required',
        invalid_type_error: 'title must be a string',
    }),

    content: z.string({
        required_error: 'content is required',
        invalid_type_error: 'content must be a string',
    }),
});

export type CreatePostDTO = z.infer<typeof CreatePostDTO>;

export const UpdatePostDTO = z.object({
    title: z
        .string({
            required_error: 'Title is required',
            invalid_type_error: 'Title must be a string',
        })
        .min(8, { message: 'Title be 3 or more characters long' })
        .optional(),

    content: z
        .string({
            required_error: 'Content is required',
            invalid_type_error: 'Content must be a string',
        })
        .min(8, { message: 'Content be 3 or more characters long' })
        .optional(),
});

export type UpdatePostDTO = z.infer<typeof UpdatePostDTO>;

export const PostsQueryDTO = z.object({
    limit: z.coerce
        .number()
        .optional()
        .transform((x) => (x ? x : undefined)),

    offset: z.coerce
        .number()
        .optional()
        .transform((x) => (x ? x : undefined)),
    search: z.string().optional(),
});
export type PostsQueryDTO = z.infer<typeof PostsQueryDTO>;

export const RequestParamsDTO = z.object({
    postId: z.coerce.number().transform((x) => (x ? x : undefined)),
});
