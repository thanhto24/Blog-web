import React, { useContext, useState } from 'react';

import MDEditor from '@uiw/react-md-editor';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css'; // Import CSS của KaTeX

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
    <div className="markdown-editor">
      <MDEditor
        value={body}
        onChange={setBody}
        height={500} // Tùy chỉnh chiều cao
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
      />

      {/* Slug */}
      <TextInput
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Slug"
        required
      />

      {/* Tags */}
      <TextInput
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags"
        required
      />

      {/* Author */}
      <TextInput
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
      />

      {/* Category */}
      <TextInput
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <br />
      <button onClick={handleSubmit}>Create Post</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PostCreate;
