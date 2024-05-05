import { useState } from 'react';
import Link from "next/link";

export default function Post({ id, title, content, authorName, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  
  // const handleEdit = async () => {
  //   // Navigate to the edit page with the post ID
  //   window.location.href = `/edit-post?id=${id}`;
  // };
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await fetch(`/api/post/${id}`, {
        method: 'DELETE'
      });
      onDelete(id);
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setDeleting(false);
    }
  };
  return (
    <div className="p-8 my-8 post-container h-auto w-auto">
      <h3 className="text-xl text-wrap font-bold author-name">{authorName}</h3>
      <h4 className="text-lg post-title text-wrap">{title}</h4>
      <p className="post-content text-wrap">{content}</p>
      <button 
        className="delete-post-button" 
        onClick={handleDelete} 
        disabled={deleting}
      >
        {deleting ? 'Deleting...' : 'Delete Post'}
      </button>
      <style jsx>{`
        .post-title {
          font-size: 1.25rem;
        }

        .post-content {
          margin-top: 0.5rem;
        }

        .delete-post-button {
          background-color: black; /* Blue */
          border: none;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          margin-top:30px;
        }

        .delete-post-button:hover {
          background-color: red; /* Darker Blue */
        }
      `}</style>
    </div>
  );
}
