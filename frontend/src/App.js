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
      <div className="App flex flex-col min-h-screen"> {/* Sử dụng flexbox với chiều cao tối thiểu */}
        <Header />
        <div className="mt-[12rem] flex-grow"> {/* Flex-grow để nội dung mở rộng */}
          <PostProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-post" element={<PostAndImage />} />
              <Route path="/posts/id/:id" element={<Detail />} />
              <Route path="/posts/search/:search" element={<PostSearchResult />} />
              <Route path="/user-profile/:email" element={<UserProfile />} />
              <Route path="/user/follow/all" element={<ListFollowing />} />
              {/* Thêm nhiều route nếu cần */}
            </Routes>
          </PostProvider>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
