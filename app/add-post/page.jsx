"use client"
// Importing necessary dependencies
import Link from 'next/link';
import { useState } from 'react';

export default function AddPost() {
  // State variables for title, content, and loading status
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false); // Initially, not submitting

  // Event handler for title change
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Event handler for content change
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Start submitting
      setSubmitting(true);

      // Sending POST request to add post
      await fetch('/api/add-post', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      });

      // Clearing the form fields by setting state to empty strings
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
    } finally {
      // Finish submitting
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      {/* Link to view blogs */}
      <Link href={'/'} className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block">
        View Blogs
      </Link>
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-4">Add Post</h1>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            value={title} 
            onChange={handleTitleChange}
            required
            className="mt-1 px-3 py-2 block w-full shadow-lg focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
          />
        </div>
        {/* Content input */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
            rows={8}
            className="mt-1 px-3 py-2 block w-full shadow-lg focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md resize-none"
          />
        </div>
        {/* Submit button or loading indicator */}
        {submitting ? (
          <p className="text-gray-600">Submitting...</p>
        ) : (
          <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Submit
          </button>
        )}
      </form>
    </main>
  );
}
