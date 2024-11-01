import React, { useState, useEffect, useContext } from 'react';
import { showPopup } from './Popup'; // Assuming showPopup is a notification function
import ReportModal from './ReportModal';
import { PostContext } from '../contexts/PostContext';

const ActionBar = ({ postId }) => {
  const [liked, setLiked] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const { setNeedFetch } = useContext(PostContext);

  const storedUser = localStorage.getItem('user');
  const email = storedUser ? JSON.parse(storedUser).email : '';

  // Function to check if the post is already liked
  const fetchCheckLike = async (e) => {
    try {
      const response = await fetch('https://my-blog-be.onrender.com/users/check-like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, postId: postId }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      setLiked(data.liked);
    } catch (error) {
      console.error('Failed to check like status:', error);
    }
  };

  // Function to toggle the like action
  const fetchLikeAction = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://my-blog-be.onrender.com/users/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, postId: postId }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      setLiked(true);
      setNeedFetch(true);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const fetchUnlikeAction = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://my-blog-be.onrender.com/users/unlike', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, postId: postId }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      setLiked(false);
      setNeedFetch(true);
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

  const fetchSendEmail = async (reason) => {
    try {
      const response = await fetch('https://my-blog-be.onrender.com/email/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email,
          subject: 'Report Post from Blog-web',
          messageObj: {
            link: 'https://my-blog.onrender.com/posts/id/' + postId,
            msg: ['The post below has been reported!', `Reason: ${reason}`, 'Please check and take action!'],
          },
        }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
      showPopup('This post has been reported successfully!', 'success');
    } catch (error) {
      console.error('Failed to report post:', error);
    }
  };

  const handleReport = (reason) => {
    fetchSendEmail(reason);
    // console.log(`Report reason: ${reason}`);
    showPopup('This post has been reported successfully!', 'success');
  };

  const handleShare = () => {
    const postUrl = `${window.location.origin}/posts/id/${postId}`;
    navigator.clipboard.writeText(postUrl)
      .then(() => {
        showPopup('Post URL copied to clipboard!', 'success');
      })
      .catch((error) => {
        console.error('Failed to copy URL:', error);
        showPopup('Failed to copy URL', 'error');
      });
  };

  return (
    <div className="mx-auto mb-32 flex max-w-3xl justify-around rounded-lg bg-gray-100 py-4">
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

      {/* Share Button */}
      <button 
        className="flex items-center space-x-1 text-gray-700 hover:text-green-500"
        onClick={handleShare}
      >
        <span role="img" aria-label="Share">🔗</span>
        <span>Share</span>
      </button>

      {/* Report Button */}
      <button
        className="flex items-center space-x-1 text-gray-700 hover:text-red-500"
        onClick={handleOpenReportModal}
      >
        <span role="img" aria-label="report">⚠️</span>
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
