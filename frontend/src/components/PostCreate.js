import React, { useContext, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css'; // Import CSS for KaTeX
import { PostContext } from '../contexts/PostContext';
import TextInput from './TextInput';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');

  const { createPost } = useContext(PostContext); // Get createPost from context

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { title, slug, body, tags, category, author };

    createPost(postData)
      .then(() => {
        setMessage('Post created successfully!');
        // Reset fields if needed
        // setTitle('');
        // setSlug('');
        // setTags('');
        // setAuthor('');
        // setCategory('');
        // setBody('');
      })
      .catch((error) => {
        setMessage(`Error creating post: ${error.message}`);
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

      {/* Author */}
      <TextInput
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
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

      <button
        onClick={handleSubmit}
        className="mx-auto mt-6 flex w-40 justify-center rounded-lg bg-blue-500 py-2 text-white transition duration-200 hover:bg-blue-600"
      >
        Create Post
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default PostCreate;
