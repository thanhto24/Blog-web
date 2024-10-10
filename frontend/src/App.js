import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import PostCreate from './components/PostCreate';
import PostList from './components/PostList';
import { PostProvider } from './contexts/PostContext';
import PostAndImage from './components/PostAndImage';
import PostSearchResult from './components/PostSearchResult';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import Header from './components/Header'; // Use the new combined Header
import Footer from './components/Footer';

const App = () => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    // Perform any necessary cleanup here, such as removing user data from local storage
    // localStorage.removeItem('user');
    setUser(null); // Reset the user state to null
  };

  return (
    <Router>
      <div className="App">
        <Header user={user} onLogin={login} onLogout={logout} />
        <PostProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<PostAndImage />} />
            <Route path="/posts/id/:id" element={<Detail />} />
            <Route path="/posts/search/:search" element={<PostSearchResult />} />
            {/* Add more routes as necessary */}
          </Routes>
        </PostProvider>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
