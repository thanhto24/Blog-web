import React from 'react';
import PopularPost from './components/PopularPost';
import PostList from '../../components/PostList';

const Home = () => {
    return (
        <div>
            {/* <Header /> */}
            <PopularPost />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                {/* <PostProvider> */}
                    <PostList />
                {/* </PostProvider> */}
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default Home;