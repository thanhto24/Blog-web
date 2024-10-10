import React, { useContext, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Import KaTeX styles

const PostDetail = ({ post }) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">
        {post.title}
      </h1>
      {/* Flexbox container for date and author */}
      <div className="mb-2 flex justify-between text-gray-600 font-bold">
        {/* Created at (left) */}
        <p>{formatDateTime(post.createdAt)}</p>
        {/* Author (right) */}
        <p>Tác giả: {post.author}</p>
      </div>
      <div className="whitespace-pre-wrap rounded bg-gray-100 p-10">
        <ReactMarkdown
          children={post.body}
          remarkPlugins={[remarkMath]} // For parsing math
          rehypePlugins={[rehypeKatex]} // For rendering math with KaTeX
        />
      </div>
    </div>
  );
};

export default PostDetail;
