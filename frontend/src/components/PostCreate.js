import React, { useContext, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css'; // Import CSS for KaTeX
import { PostContext } from '../contexts/PostContext';
import TextInput from './TextInput';
import { showPopup } from './Popup';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  const [thumbnail_url, setThumbnailUrl] = useState('');
  const [description, setDescription] = useState('');

  const { createPost } = useContext(PostContext); // Get createPost from context

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('user');
    const userName = storedUser ? JSON.parse(storedUser).username : '';
    const userEmail = storedUser ? JSON.parse(storedUser).email : '';
    console.log('userName', userName);
    const postData = { title, slug, body, tags, category, author:userName, thumbnail_url, description, owner:userEmail };

    createPost(postData)
      .then(() => {
        showPopup('Post created successfully', 'success');
        // Reset fields if needed
        // setTitle('');
        // setSlug('');
        // setTags('');
        // setAuthor('');
        // setCategory('');
        // setBody('');
      })
      .catch((error) => {
        showPopup('Failed to create post.' + error, 'fail');
      });
  };

  return (
    <div className="mx-auto w-full rounded-lg bg-white p-6 shadow-md">
      {/* <h2 className="mb-4 text-2xl font-bold">Create New Post</h2> */}

      <MDEditor
        value={body}
        onChange={setBody}
        height={500} // Customize height
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
        Create Post
      </button>
    </div>
  );
};

export default PostCreate;
