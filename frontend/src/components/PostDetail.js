import React, { useContext } from 'react';
import { PostContext } from '../contexts/PostContext';

const PostDetail = () => {
    const { postWithId } = useContext(PostContext);
    // console.log(postWithId);
    
    // return <div>Loading ...</div>
    
    return (
        <div className="mx-auto max-w-2xl p-4">
        <h1 className="mb-6 text-center text-3xl font-bold">{postWithId.title}</h1>
        <pre className="whitespace-pre-wrap rounded bg-gray-100 p-2">
            {postWithId.body}
        </pre>
        </div>
    );
};

export default PostDetail;