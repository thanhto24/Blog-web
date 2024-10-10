import React from 'react';
import { useParams } from 'react-router-dom';
import ListPostRecommend from './components/ListPostRecommend';
import PostDetail from '../../components/PostDetail';

const Detail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detail</h1>
      {/* <PostProvider> */}

      <PostDetail id={id} />
      <ListPostRecommend />
      {/* </PostProvider> */}
    </div>
  );
};

export default Detail;
