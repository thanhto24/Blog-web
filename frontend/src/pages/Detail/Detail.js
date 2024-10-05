import React from 'react';

import ListPostRecommend from './components/ListPostRecommend';
import { PostProvider } from '../../contexts/PostContext';

const Detail = () => {
  return (
    <div>
      <h1>Detail</h1>
        {/* <PostProvider> */}
            <ListPostRecommend />
        {/* </PostProvider> */}
    </div>
  );
};

export default Detail;