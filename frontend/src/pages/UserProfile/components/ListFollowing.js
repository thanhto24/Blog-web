import React, { useState, useEffect } from 'react';

const ListFollowing = () => {
    const storedUser = localStorage.getItem('user');
    const email = storedUser ? JSON.parse(storedUser).email : '';
        
    const [following, setFollowing] = useState([]);
    const [userToUnfollow, setUserToUnfollow] = useState(null);
    const [fadeOutUser, setFadeOutUser] = useState('');

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const response = await fetch('https://my-blog-be.onrender.com/users/following', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                });
                if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
                const data = await response.json();
                setFollowing(data);
            } catch (error) {
                console.error('Failed to fetch following users:', error);
            }
        };
        fetchFollowing();
    }, [email]);

    // Function to unfollow a user
    const handleUnfollow = async (user) => {
        setFadeOutUser(user);  // Start fade-out animation
        setTimeout(async () => {
            try {
                const response = await fetch('https://my-blog-be.onrender.com/users/unfollow', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, followEmail: user }),
                });
                if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
                // Remove the user from the following list
                setFollowing(following.filter(followedUser => followedUser !== user));
            } catch (error) {
                console.error(`Failed to unfollow ${user}:`, error);
            }
            setFadeOutUser('');  // Reset fade-out state
        }, 500);  // Delay to allow fade-out animation
    };

    const openUnfollowPopup = (user) => {
        setUserToUnfollow(user);
    };

    const closeUnfollowPopup = () => {
        setUserToUnfollow(null);
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4 text-center">Following</h2>
            <ul className="space-y-4">
                {following.length > 0 ? (
                    following.map((user) => (
                        <li
                            key={user}
                            className={`flex items-center justify-between p-2 bg-gray-100 rounded-md shadow-md transition-opacity duration-500 ${
                                fadeOutUser === user ? 'opacity-0' : 'opacity-100'
                            }`}
                        >
                            <span>{user}</span>
                            <button
                                onClick={() => openUnfollowPopup(user)}
                                className="ml-4 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
                            >
                                Unfollow
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="text-center text-gray-500">You're not following anyone yet.</li>
                )}
            </ul>

            {/* Confirmation Popup */}
            {userToUnfollow && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md shadow-md w-96">
                        <h3 className="text-lg font-bold mb-4">Confirm Unfollow</h3>
                        <p className="mb-4">Are you sure you want to unfollow {userToUnfollow}?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeUnfollowPopup}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    handleUnfollow(userToUnfollow);
                                    closeUnfollowPopup();
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                            >
                                Unfollow
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListFollowing;
