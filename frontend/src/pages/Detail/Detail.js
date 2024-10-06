import React from 'react';

import ListPostRecommend from './components/ListPostRecommend';
import PostDetail from '../../components/PostDetail';

const Detail = (id) => {
  return (
    <div>
      <h1>Detail</h1>
        {/* <PostProvider> */}

            <PostDetail />
            <ListPostRecommend />
        {/* </PostProvider> */}
    </div>
  );
};

export default Detail;