import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Import KaTeX styles
import { Link, useNavigate } from 'react-router-dom';

const PostDetail = ({ post }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const storedUser = localStorage.getItem('user');
  const email = storedUser ? JSON.parse(storedUser).email : '';
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the follow status of the current post
    const fetchFollowStatus = async () => {
      try {
        const response = await fetch(
          'https://blog-web-be-a7k7.onrender.com/users/check-follow',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, followEmail: post.owner }),
          }
        );
        if (!response.ok)
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        const data = await response.json();
        setIsFollowing(data.followed);
      } catch (error) {
        console.error('Failed to check follow status:', error);
      }
    };
    if (email !== post.owner && email && post.owner)
      fetchFollowStatus();
  }, [post, post.owner]);

  const handleFollow = async () => {
    try {
      const response = await fetch('https://blog-web-be-a7k7.onrender.com/users/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, followEmail: post.owner }),
      });
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await fetch('https://blog-web-be-a7k7.onrender.com/users/unfollow', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, followEmail: post.owner }),
      });
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Failed to unfollow user:', error);
    }
  };

  const handleFollowToggle = async () => {
    if (isFollowing) {
      await handleUnfollow();
    } else {
      await handleFollow();
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="mx-auto max-w-6xl p-4">
      <h1 className="mb-6 text-center text-3xl font-bold">{post.title}</h1>
      {/* Flexbox container for date, author, and follow button */}
      <div className="mb-2 flex items-center justify-between font-bold text-gray-600">
        {/* Created at (left) */}
        <p>{formatDateTime(post.updatedAt)}</p>
        {/* Author and Follow button (right) */}
        <div className="flex items-center">
          <div className="mr-4">
            Tác giả:
            <Link
              to={`/user-profile/${post.owner}`}
              className="ml-2 text-blue-500 hover:underline"
            >
              {post.author}
            </Link>
            {post.owner === email && ' (You)'}
          </div>
          {post.owner !== email && (
            <button
              onClick={handleFollowToggle}
              className={`rounded-md text-white border border-gray-500 px-4 py-1 ${isFollowing ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
          {post.owner === email && (
            <button
              onClick={() => navigate('/create-post', { state: { post } })}
              className="ml-4 rounded-md border border-gray-500 px-4 py-1 bg-slate-800 text-white"
            >
              Edit
            </button>
          )}
        </div>
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
