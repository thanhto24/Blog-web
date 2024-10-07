import './styles/App.css';
// MarkdownEditor.js
import React, { useState } from 'react';

import PostCreate from './components/PostCreate.js';
import PostList from './components/PostList';
import { PostProvider } from './contexts/PostContext';
import Home from './pages/Home/Home.js';
import Detail from './pages/Detail/Detail.js';
import ImageSite from './components/ImageSite.js';
import ImageCreate from './components/ImageCreate.js';

const App = () => {
  return (
    <div className="App">

      {/* <ImageCreate />
      <ImageSite /> */}
      <PostProvider>
        {/* <Home /> */}
        {/* <PostList /> */}
        {/* <Detail /> */}
        <PostCreate />
      </PostProvider>
    </div>
  );
};

export default App;
