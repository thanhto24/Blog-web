// FollowContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context
const FollowContext = createContext();

// Custom hook to use the FollowContext
export const useFollow = () => {
  return useContext(FollowContext);
};

// Provider component
export const FollowProvider = ({ children }) => {
  const [followingStatus, setFollowingStatus] = useState(new Map()); // Track follow status by email

  // Function to follow a user
  const followUser = (followEmail) => {
    setFollowingStatus((prev) => new Map(prev).set(followEmail, true));
  };

  // Function to unfollow a user
  const unfollowUser = (followEmail) => {
    setFollowingStatus((prev) => new Map(prev).set(followEmail, false));
  };

  // Function to toggle follow status
  const toggleFollow = (followEmail) => {
    const currentlyFollowing = followingStatus.get(followEmail);
    if (currentlyFollowing) {
      unfollowUser(followEmail);
    } else {
      followUser(followEmail);
    }
  };

  return (
    <FollowContext.Provider
      value={{
        followingStatus,
        toggleFollow,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};
