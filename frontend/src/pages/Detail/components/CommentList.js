import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from '../../../assets/userDefault.png';

const CommentList = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [replyOwner, setReplyOwner] = useState('');
  const [replyText, setReplyText] = useState('');
  const commentFormRef = useRef(null);

  const storedUser = localStorage.getItem('user');
  const userEmail = storedUser ? JSON.parse(storedUser).email : '';
  const userName = storedUser ? JSON.parse(storedUser).username : '';
  const profilePic = storedUser ? JSON.parse(storedUser).profilePic : '';

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };
  
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`https://my-blog-be.onrender.com/comments/${postId}`);
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newComment.trim()) {
      try {
        const response = await fetch('https://my-blog-be.onrender.com/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comment_text: newComment,
            comment_owner: `${userEmail}|${userName}`,
            comment_post: postId,
            comment_root: replyTo ? replyTo : null,
            comment_ava_url: profilePic,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setComments((prevComments) => {
          const updatedComments = [data, ...prevComments];
          return updatedComments.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        });
        setNewComment('');
        setReplyTo(null);
        setReplyOwner('');
        setReplyText('');
      } catch (error) {
        console.error('Failed to create comment:', error);
      }
    }
  };

  const handleReply = (commentId, owner, commentText) => {
    setReplyTo(commentId);
    setNewComment('');
    setReplyOwner(owner);
    setReplyText(commentText);

    if (commentFormRef.current) {
      const element = commentFormRef.current;
      const elementRect = element.getBoundingClientRect();
      const actionBarHeight = 180;
      const scrollPosition = window.pageYOffset + elementRect.top - window.innerHeight + elementRect.height + actionBarHeight;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCancelReply = () => {
    setReplyTo(null);
    setReplyOwner('');
    setReplyText('');
    setNewComment('');
  };

  const renderComments = (comments, parentId = null, depth = 0) => {
    return comments
      .filter((comment) => comment.comment_root === parentId)
      .map((comment) => (
        <li
          key={comment._id}
          className="mb-6"
          style={{ marginLeft: Math.min(depth * 20, 100) }}
        >
          <div className="mb-3 flex items-start bg-white shadow-md rounded-lg p-4 transition-all hover:shadow-lg">
            <img
              src={comment.comment_ava_url || UserAvatar}
              alt={`${comment.comment_owner}'s avatar`}
              className="mr-3 w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <Link to={`/user-profile/${comment.comment_owner.split('|')[0]}`} className="font-semibold text-gray-800">{comment.comment_owner.split('|')[1]}</Link>
                <span className="text-xs text-gray-500">{formatDateTime(comment.updatedAt) || 'Just now'}</span>
              </div>
              <p className="mt-1 text-gray-700">{comment.comment_text}</p>

              {comment.comment_root !== null && (
                <div className="text-sm italic text-gray-400">
                  Replied to {comment.comment_owner.split('|')[1]}:
                  <span className="ml-1">
                    "
                    {comments
                      .find((c) => c._id === comment.comment_root)
                      ?.comment_text.slice(0, 20) +
                      (comments.find((c) => c._id === comment.comment_root)
                        ?.comment_text.length > 20
                        ? '...'
                        : '')}
                    "
                  </span>
                </div>
              )}

              <button
                className="mt-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                onClick={() =>
                  handleReply(
                    comment.comment_root || comment._id,
                    comment.comment_owner,
                    comment.comment_text
                  )
                }
              >
                Reply
              </button>
            </div>
          </div>

          <ul className="ml-5 mt-3">
            {renderComments(comments, comment._id, depth + 1)}
          </ul>
        </li>
      ));
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Comments</h2>
      <ul>{renderComments(comments)}</ul>
      <div ref={commentFormRef}>
        {replyTo && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center">
            <div>
              You're replying to <span className="font-semibold">{replyOwner.split('|')[1]}</span>:
              <span className="ml-2 text-sm italic text-gray-600">
                "{replyText.slice(0, 20) + (replyText.length > 20 ? '...' : '')}"
              </span>
            </div>
            <button
              onClick={handleCancelReply}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Cancel reply"
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-blue-600 py-2 px-4 text-white font-semibold hover:bg-blue-700 transition-all"
          >
            {replyTo ? 'Reply' : 'Submit Comment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentList;
