import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListPostRecommend from './components/ListPostRecommend';
import PostDetail from '../../components/PostDetail';
import { PostContext } from '../../contexts/PostContext';
import ActionBar from '../../components/ActionBar';
import Breadcrumb from '../../components/Breadcrumb';
import CommentList from './components/CommentList';

const Detail = () => {
  const breadcrumbPaths = [
    { label: 'Home', url: '/' },
    { label: 'Detail', url: '' },
  ];
  const { id } = useParams();
  const { postWithId, fetchPostById } = useContext(PostContext);
  window.scrollTo(0, 0);

  useEffect(() => {
    fetchPostById(id);
  }, [id]);

  let relatedData = postWithId.tags;

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb paths={breadcrumbPaths} />
      <PostDetail post={postWithId} />
      
      {/* Comment Section */}
      <div className="comment-section mt-10 mb-10">
        <CommentList postId={id}/>
      </div>
      <ActionBar postId={id} />
      <ListPostRecommend relatedData={relatedData} currentPost={postWithId} />
    </div>
  );
};

export default Detail;
