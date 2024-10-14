// ActionBar.js
import React, { useState, useEffect } from 'react';
import { showPopup } from './Popup';
import ReportModal from './ReportModal';

const ActionBar = ({ postId }) => {
  const [liked, setLiked] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const storedUser = localStorage.getItem('user');
  const email = storedUser ? JSON.parse(storedUser).email : '';

  // Function to check if the post is already liked
  const fetchCheckLike = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/check-like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, postId: postId }),
      });
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      setLiked(data.liked);
    } catch (error) {
      console.error('Failed to check like status:', error);
    }
  };

  // Function to toggle the like action
  const fetchLikeAction = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, postId: postId }),
      });
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      setLiked(true);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const fetchUnlikeAction = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/unlike', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, postId: postId }),
      });
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      setLiked(false);
    } catch (error) {
      console.error('Failed to unlike post:', error);
    }
  };

  // Fetch the initial like status when component mounts
  useEffect(() => {
    fetchCheckLike();
  }, [postId]);

  const handleOpenReportModal = () => {
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  const handleReport = (reason) => {
    // Handle report submission (e.g., send to your server)
    console.log(`Report reason: ${reason}`);
    showPopup('This post has been reported successfully!', 'success');
  };

  return (
    <div className="mx-auto mb-20 flex max-w-3xl justify-around rounded-lg bg-gray-100 py-4">
      {/* Like Button */}
      <button
        onClick={liked ? fetchUnlikeAction : fetchLikeAction}
        className={`flex items-center space-x-1 text-gray-700 hover:text-blue-500 ${liked ? 'text-blue-500' : ''}`}
      >
        <span role="img" aria-label="like">
          {liked ? '❤️' : '👍'}
        </span>
        <span>{liked ? 'Liked' : 'Like'}</span>
      </button>

      {/* Comment Button */}
      <button className="flex items-center space-x-1 text-gray-700 hover:text-green-500">
        <span role="img" aria-label="comment">
          💬
        </span>
        <span>Comment</span>
      </button>

      {/* Report Button */}
      <button
        className="flex items-center space-x-1 text-gray-700 hover:text-red-500"
        onClick={handleOpenReportModal}
      >
        <span role="img" aria-label="report">
          ⚠️
        </span>
        <span>Report</span>
      </button>

      {/* Report Modal */}
      <ReportModal
        show={showReportModal}
        handleClose={handleCloseReportModal}
        handleReport={handleReport}
      />
    </div>
  );
};

export default ActionBar;
