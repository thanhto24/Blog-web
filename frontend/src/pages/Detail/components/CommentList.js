import React, { useState, useEffect } from 'react';

const CommentList = ({ postId }) => {
    // Example initial comments
    const initialComments = [
        {
            id: 1,
            comment_text: 'Great post!',
            comment_owner: 'John Doe',
            comment_post: postId,
            comment_root: null,
            comment_likes: 2,
        },
        {
            id: 2,
            comment_text: 'I agree!',
            comment_owner: 'Jane Doe',
            comment_post: postId,
            comment_root: '1',
            comment_likes: 0,
        },
        {
            id: 3,
            comment_text: 'Thanks for sharing!',
            comment_owner: 'Alice',
            comment_post: postId,
            comment_root: null,
            comment_likes: 1,
        },
    ];

    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch comments for the post
        fetchComments();
    }, []);
    
    const fetchComments = async () => {
        try {
          const response = await fetch(`http://localhost:5000/comments/${postId}`);
          if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
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
                // Create a new comment
                const response = await fetch('http://localhost:5000/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        comment_text: newComment,
                        comment_owner: 'Aliceheheheeh',
                        comment_post: postId,
                        comment_root: null,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setComments([data, ...comments]);
                setNewComment('');
            } catch (error) {
                console.error('Failed to create comment:', error);
            }
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className="mb-4">
                        <div className="flex items-center mb-2">
                            <span className="font-semibold mr-2">{comment.comment_owner}</span>
                            {/* Assuming comment.createdAt is not available, you can remove or add createdAt */}
                            <span className="text-gray-500">{comment.createdAt || 'Just now'}</span>
                        </div>
                        <p>{comment.comment_text}</p>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="mt-4">
                <textarea
                    className="border border-gray-300 rounded-md p-2 w-full"
                    rows="3"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button 
                    type="submit" 
                    className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
                    Submit Comment
                </button>
            </form>
        </div>
    );
};

export default CommentList;
