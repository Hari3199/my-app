// pages/api/posts/[id].js

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const postId = req.query.id;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Failed to fetch post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
}


