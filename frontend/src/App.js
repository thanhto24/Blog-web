import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import PostCreate from './components/PostCreate';
import PostList from './components/PostList';
import { PostProvider } from './contexts/PostContext';
import PostAndImage from './components/PostAndImage';
import PostSearchResult from './components/PostSearchResult';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/AutoScrollTop';
import UserProfile from './pages/UserProfile/UserProfile';
import ListFollowing from './pages/UserProfile/components/ListFollowing';

const App = () => {


  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <div className="mt-[12rem]"></div>
        
        <PostProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<PostAndImage />} />
            <Route path="/posts/id/:id" element={<Detail />} />
            <Route path="/posts/search/:search" element={<PostSearchResult />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/user/follow/all" element={<ListFollowing />} />
            {/* Add more routes as necessary */}
          </Routes>
        </PostProvider>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;
