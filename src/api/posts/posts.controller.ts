import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {
    CreatePostDTO,
    PostsQueryDTO,
    RequestParamsDTO,
    UpdatePostDTO,
} from './posts.model.js';

const prisma = new PrismaClient();
/* 
 id Int @id @default(autoincrement())
  title String
  content String
  author User @relation(fields: [authorId], references: [id])
  authorId Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
 */
export const getPosts = async (
    req: Request<{}, {}, {}, PostsQueryDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { limit, offset, search } = req.query;

        const postsQueryDTO = await PostsQueryDTO.parseAsync({
            limit: limit,
            offset: offset,
            search: search,
        });

        const posts = await prisma.post.findMany({
            take: postsQueryDTO.limit,
            skip: postsQueryDTO.offset,
            where: postsQueryDTO.search
                ? {
                      OR: [
                          { title: { contains: postsQueryDTO.search } },
                          { content: { contains: postsQueryDTO.search } },
                      ],
                  }
                : undefined,
        });
        if (!posts) {
            return res.json({ message: 'No posts exist yet.' });
        }
        return res.json(posts);
    } catch (error) {
        next(error);
    }
};
export const getCurrentUserPosts = async (
    req: Request<{}, {}, {}, PostsQueryDTO>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.session.user!.id;

        const { limit, offset, search } = req.query;

        const postsQueryDTO = await PostsQueryDTO.parseAsync({
            limit: limit,
            offset: offset,
            search: search,
        });

        const posts = await prisma.post.findMany({
            take: postsQueryDTO.limit,
            skip: postsQueryDTO.offset,
            where: postsQueryDTO.search
                ? {
                      authorId: userId,
                      OR: [
                          { title: { contains: postsQueryDTO.search } },
                          { content: { contains: postsQueryDTO.search } },
                      ],
                  }
                : {
                      authorId: userId,
                  },
        });
        if (!posts) {
            return res.json({ message: 'You did not create any posts yet.' });
        }
        return res.json(posts);
    } catch (error) {
        next(error);
    }
};
export const createPost = async (
    req: Request<{}, unknown, CreatePostDTO, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.session.user!.id;
        const createPostDTO = await CreatePostDTO.parseAsync(req.body);
        const newPost = await prisma.post.create({
            data: { ...createPostDTO, authorId: userId },
        });
        res.json(newPost);
    } catch (error) {
        next(error);
    }
};
export const getPost = async (
    req: Request<{ postId: number }, unknown, {}, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const postsQueryDTO = await RequestParamsDTO.parseAsync(req.params);

        const post = await prisma.post.findFirst({
            where: {
                id: postsQueryDTO.postId,
            },
        });
        if (!post) {
            return res
                .status(404)
                .json({ message: 'No post with this id was found.' });
        }

        res.json(post);
    } catch (error) {
        next(error);
    }
};
export const updatePost = async (
    req: Request,

    res: Response,
    next: NextFunction
) => {
    try {
        const postsQueryDTO = await RequestParamsDTO.parseAsync(req.params);
        const userId = req.session.user!.id;
        const updatePostDTO = await UpdatePostDTO.parseAsync(req.body);

        const existingPost = await prisma.post.findFirst({
            where: {
                id: postsQueryDTO.postId,
            },
        });
        if (!existingPost) {
            return res
                .status(404)
                .json({ message: 'No post with this id was found.' });
        }

        if (existingPost.authorId !== userId) {
            return res
                .status(401)
                .json({ message: "You're not authorized to edit this post." });
        }

        // update post
        const updatedPost = await prisma.post.update({
            data: { ...updatePostDTO },
            where: { id: postsQueryDTO.postId },
        });

        res.json(updatedPost);
    } catch (error) {
        next(error);
    }
};
export const deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const postsQueryDTO = await RequestParamsDTO.parseAsync(req.params);
        const userId = req.session.user!.id;

        const existingPost = await prisma.post.findFirst({
            where: {
                id: postsQueryDTO.postId,
            },
        });
        if (!existingPost) {
            return res
                .status(404)
                .json({ message: 'No post with this id was found.' });
        }

        if (existingPost.authorId !== userId) {
            return res
                .status(401)
                .json({ message: "You're not authorized to edit this post." });
        }

        // update post
        const deletedPost = await prisma.post.delete({
            where: { id: postsQueryDTO.postId },
        });

        res.json({ message: 'Post deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
