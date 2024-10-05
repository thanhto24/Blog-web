import './styles/App.css'; 
// MarkdownEditor.js
import React, { useState } from "react";

import PostCreate from './components/PostCreate.js';
import PostList from './components/PostList';
import {PostProvider} from './contexts/PostContext';
import Home from './pages/Home/Home.js';


const App = () => {
  return (
    <div className="App">
      {/* <PostProvider>
        <PostCreate />
        <PostList />
      </PostProvider> */}

      <Home />
    </div>
  );
}
        
export default App;

