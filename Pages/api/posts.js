// pages/api/posts.js
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const page = parseInt(req.query.page) || 1;
            const pageSize = parseInt(req.query.pageSize) || 5;
            const skip = (page - 1) * pageSize;

            const posts = await prisma.post.findMany({
                where: { published: true },
                include: {
                    author: {
                        select: { name: true }
                    }
                },
                skip: skip,
                take: pageSize
            });
            res.status(200).json(posts);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    } else if (req.method === "PATCH") {
        try {
            const { id, title, content, published } = req.body;
            const post = await prisma.post.update({
                where: { id: id },
                data: {
                    title: title,
                    content: content,
                    published: published
                }
            });
            res.status(200).json(post);
        } catch (error) {
            console.error('Failed to update post:', error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
}
