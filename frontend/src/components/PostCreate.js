import React, { useContext, useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css'; // Import CSS for KaTeX
import { PostContext } from '../contexts/PostContext';
import TextInput from './TextInput';
import { showPopup } from './Popup';
import { useLocation } from 'react-router-dom'; // Import useLocation

const PostCreate = () => {
  const { state } = useLocation(); // Get state from navigation
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [thumbnail_url, setThumbnailUrl] = useState('');
  const [description, setDescription] = useState('');

  const { createPost, updatePost } = useContext(PostContext); // Get createPost from context

  // Populate form fields if editing an existing post
  useEffect(() => {
    if (state?.post) {
      const { title, slug, tags, category, body, thumbnail_url, description } = state.post;
      setTitle(title || '');
      setSlug(slug || '');
      setTags(tags || '');
      setCategory(category || '');
      setBody(body || '');
      setThumbnailUrl(thumbnail_url || '');
      setDescription(description || '');
    }
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('user');
    const userName = storedUser ? JSON.parse(storedUser).username : '';
    const userEmail = storedUser ? JSON.parse(storedUser).email : '';

    const postData = { title, slug, body, tags, category, author: userName, thumbnail_url, description, owner: userEmail };

    if (state?.post) {
      updatePost(state.post._id, postData)
      .then(() => showPopup('Post updated successfully!', 'success'))
      .catch((error) => showPopup('Failed to update post: ' + error.message, 'fail'));
    } else {
      createPost(postData)
      .then(() => showPopup('Post created successfully!', 'success'))
      .catch((error) => showPopup('Failed to create post: ' + error.message, 'fail'));
    }
  };

  return (
    <div className="mx-auto w-full rounded-lg bg-white p-6 shadow-md">
      <MDEditor
        value={body}
        onChange={setBody}
        height={500}
        previewOptions={{
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        }}
      />

      {/* Title */}
      <TextInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="mt-4"
      />

      {/* Slug */}
      <TextInput
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Slug"
        required
        className="mt-4"
      />

      {/* Tags */}
      <TextInput
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags"
        required
        className="mt-4"
      />

      {/* Category */}
      <TextInput
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
        className="mt-4"
      />

      {/* Thumbnail URL */}
      <TextInput
        value={thumbnail_url}
        onChange={(e) => setThumbnailUrl(e.target.value)}
        placeholder="Thumbnail URL"
        required
        className="mt-4"
      />

      {/* Description */}
      <TextInput
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="mt-4"
      />

      <button
        onClick={handleSubmit}
        className="mx-auto mt-6 flex w-40 justify-center rounded-lg bg-blue-500 py-2 text-white transition duration-200 hover:bg-blue-600"
      >
        {state?.post ? 'Update Post' : 'Create Post'} {/* Change button text based on edit mode */}
      </button>
    </div>
  );
};

export default PostCreate;
