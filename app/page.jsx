"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Post from "./components/Post";
import styles from "./page.module.css";
import prisma from "@/lib/prisma";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/posts?page=${page}`);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page]);

  const deletePost = async (postId) => {
    try {
      await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
      });
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <main className="p-6 bg-white">
      <Link
        href={"/add-post"}
        className="font-semibold mb-4 inline-block"
      >
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Add Post</button>
      </Link>
      <h1 className="text-2xl font-bold my-4">Feed</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border border-black mt-4">
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            authorName={post.author.name}
            onDelete={() => deletePost(post.id)}
          />
         
        </div>
        ))
      )}
     
      <div className="flex justify-between mt-6">
        <button
          className="px-4 py-2 bg-gray-300 text-black font-semibold rounded hover:bg-gray-400"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || loading}
        >
          Prev
        </button>
        {page}
        <button
          className="px-4 py-2 bg-gray-300 text-black font-semibold rounded hover:bg-gray-400"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
        >
          Next
        </button>
      </div>
    </main>
  );
}
