import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Import KaTeX styles
import { Link } from 'react-router-dom';

const PostDetail = ({ post }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const storedUser = localStorage.getItem('user');
  const email = storedUser ? JSON.parse(storedUser).email : '';
    
  useEffect(() => {
    // Fetch the follow status of the current post
    const fetchFollowStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/check-follow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, followEmail: post.owner }),
        });
        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
        const data = await response.json();
        setIsFollowing(data.followed);
      } catch (error) {
        console.error('Failed to check follow status:', error);
      }
    };
    fetchFollowStatus();
  }, [post, post.owner]);

  const handleFollow= async () => {
    try {
      const response = await fetch('http://localhost:5000/users/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, followEmail: post.owner }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/unfollow', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, followEmail: post.owner }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
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
      <div className="mb-2 flex justify-between items-center text-gray-600 font-bold">
        {/* Created at (left) */}
        <p>{formatDateTime(post.updatedAt)}</p>
        {/* Author and Follow button (right) */}
        <div className="flex items-center">
          <div className="mr-4">Tác giả:
            <Link to={`/user-profile/${post.owner}`} className="ml-2 text-blue-500 hover:underline">
              {post.author}
            </Link>
          </div>
          <button
            onClick={handleFollowToggle}
            className={`rounded-full px-4 py-1 font-semibold ${
              isFollowing ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
            } hover:opacity-90`}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
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
