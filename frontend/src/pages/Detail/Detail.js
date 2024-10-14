import React, {useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListPostRecommend from './components/ListPostRecommend';
import PostDetail from '../../components/PostDetail';
import { PostContext } from '../../contexts/PostContext';
import ActionBar from '../../components/ActionBar';

const Detail = () => {
  const { id } = useParams();
  const { postWithId, fetchPostById } = useContext(PostContext);
  window.scrollTo(0, 0);

  useEffect(() => {
    fetchPostById(id);
  }, [id]);

  let relatedData = postWithId.tags;
  console.log(relatedData);
  return (
    <div>
      {/* <PostProvider> */}

      <PostDetail post={postWithId} />
      <ActionBar postId={id}/>
      <ListPostRecommend relatedData={relatedData} currentPost={postWithId}/>
      {/* </PostProvider> */}
    </div>
  );
};

export default Detail;
