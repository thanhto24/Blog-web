import React from 'react';
import Header from './components/Header';
import PopularPost from './components/PopularPost';
import Footer from './components/Footer';

import PostList from '../../components/PostList';
// import { PostContext } from '../../contexts/PostContext';

import { PostProvider } from '../../contexts/PostContext'; // assuming this is the provider

const Home = () => {
    return (
        <div>
            <Header />
            <PopularPost />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                <PostProvider>
                    <PostList />
                </PostProvider>
            </div>
            <Footer />
        </div>
    );
}

export default Home;