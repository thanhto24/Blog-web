import './styles/App.css'; 
// MarkdownEditor.js
import React, { useState } from "react";

import PostCreate from './components/PostCreate.js';
import PostList from './components/PostList';
import PostContext from './contexts/PostContext';


const App = () => {
  return (
    <div className="App">
      <PostContext>
        <PostCreate />
        <PostList />
      </PostContext>
    </div>
  );
}
        
export default App;

