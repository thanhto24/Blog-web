import React, { useState, useEffect } from 'react';

const CommentList = ({ postId }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [replyTo, setReplyTo] = useState(null);
    const [replyOwner, setReplyOwner] = useState('');

    useEffect(() => {
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
                const response = await fetch('http://localhost:5000/comments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        comment_text: newComment,
                        comment_owner: 'Ryoma',
                        comment_post: postId,
                        comment_root: replyTo ? replyTo : null, // Giữ comment_root cho reply
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setComments((prevComments) => [data, ...prevComments]);

                setNewComment('');
                setReplyTo(null);
                setReplyOwner('');
            } catch (error) {
                console.error('Failed to create comment:', error);
            }
        }
    };

    const handleReply = (commentId, owner) => {
        setReplyTo(commentId);
        setNewComment('');
        setReplyOwner(owner);
    };

    const renderComments = (comments, parentId = null, depth = 0) => {
        return comments
            .filter(comment => comment.comment_root === parentId)
            .map((comment) => (
                <li key={comment._id} className="mb-4" style={{ marginLeft: Math.min(depth * 20, 100) }}>
                    <div className="flex items-center mb-2">
                        <span className="font-semibold mr-2">{comment.comment_owner}</span>
                        <span className="text-gray-500">{comment.createdAt || 'Just now'}</span>
                    </div>
                    <p>{comment.comment_text}</p>
                    <button 
                        className="text-blue-500 hover:underline mt-2"
                        onClick={() => handleReply(comment.comment_root || comment._id, comment.comment_owner)}
                    >
                        Reply
                    </button>
                    {/* Chỉ báo cho các comment không phải root */}
                    {comment.comment_root !== null && (
                        <div className="text-gray-500 text-sm italic">
                            Reply to {comment.comment_owner}: 
                            <span className="ml-1">
                                "{comments.find(c => c._id === comment.comment_root)?.comment_text.slice(0, 20) + (comments.find(c => c._id === comment.comment_root)?.comment_text.length > 20 ? '...' : '')}"
                            </span>
                        </div>
                    )}
                    <ul className="ml-4 mt-2">
                        {renderComments(comments, comment._id, depth + 1)}
                    </ul>
                </li>
            ));
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            <ul>
                {renderComments(comments)} 
            </ul>
            {replyTo && (
                <div className="mb-4 p-2 border border-gray-300 rounded bg-gray-100">
                    <p className="font-semibold">Bạn đang trả lời comment của {replyOwner}:</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="mt-4">
                <textarea
                    className="border border-gray-300 rounded-md p-2 w-full"
                    rows="3"
                    placeholder="Type your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button 
                    type="submit" 
                    className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
                    {replyTo ? 'Reply' : 'Submit Comment'}
                </button>
            </form>
        </div>
    );
};

export default CommentList;
