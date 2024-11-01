import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserSetting from './components/UserSetting';
import { PostContext } from '../../contexts/PostContext';
import ShortPost from '../Home/components/ShortPost';

const UserProfile = () => {
  const { email } = useParams();
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`https://blog-web-be-a7k7.onrender.com/users/get-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }),
      });
      if (!response.ok)
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      const data = await response.json();
      setName(data.name);
      setProfilePic(data.pic);
      // console.log('User profile:', data);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
    }
  };

  fetchUserProfile();

  const { userPosts, fetchUserPosts } = useContext(PostContext);

  // Trạng thái để mở/đóng UserSetting
  const [showSetting, setShowSetting] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); // Trạng thái Follow/Unfollow

  const user = localStorage.getItem('user');
  const localStorageEmail = user ? JSON.parse(user).email : '';

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
            body: JSON.stringify({ email: localStorageEmail, followEmail: email }),
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
    fetchFollowStatus();
    fetchUserPosts(email);
  }, [email]);

  // Hàm để bật/tắt UserSetting
  const handleToggleSetting = () => {
    setShowSetting(!showSetting);
  };

  const handleFollow = async () => {
    try {
      const response = await fetch('https://blog-web-be-a7k7.onrender.com/users/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: localStorageEmail, followEmail: email }),
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
        body: JSON.stringify({ email: localStorageEmail, followEmail: email }),
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

  return (
    <div className="container mx-auto p-6">
  <div className="mb-6 flex items-center justify-between">
    {/* Avatar and Username */}
    <div className="flex items-center">
      <img
        src={profilePic}
        alt="User Avatar"
        className="mr-3 h-12 w-12 rounded-full"
      />
      <h2 className="text-xl font-bold">{name}</h2>
    </div>

    {/* Settings or Follow/Unfollow button */}
    {localStorageEmail === email ? (
      <button
        className="rounded-lg bg-slate-600 px-4 py-2 font-semibold text-white shadow-lg transition duration-200 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={handleToggleSetting}
      >
        {showSetting ? 'Close Settings' : 'Open Settings'}
      </button>
    ) : (
      <button
        className={`rounded-lg px-4 py-2 font-semibold text-white transition duration-200 focus:outline-none ${isFollowing ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}
        onClick={handleFollowToggle}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    )}
  </div>

  {/* Show UserSetting if showSetting is true */}
  {showSetting && <UserSetting handleToggleSetting={handleToggleSetting} />}

  {/* Display all posts */}
  <h3 className="mb-6 text-2xl font-semibold text-gray-800">Posts of {name}</h3>
  
  {/* Container for user posts with scrolling enabled */}
  <div className="h-96 overflow-y-scroll scroll-hidden rounded-lg border border-gray-300 bg-gray-700 p-4 mb-4">
    <div className="grid w-full grid-cols-2 gap-6 p-4">
      {userPosts.map((post) => (
        <ShortPost key={post._id} post={post} />
      ))}
    </div>
  </div>
</div>

  );
};

export default UserProfile;
