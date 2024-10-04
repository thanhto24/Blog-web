// import React, { useState } from 'react';

// function App() {
//   const [title, setTitle] = useState('');
//   const [slug, setSlug] = useState('');
//   const [body, setBody] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent the default form submission

//     const postData = { title, slug, body };

//     // Call API to create a new post
//     fetch('http://localhost:5000/posts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(postData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setMessage('Post created successfully!');
//         // Reset form fields
//         setTitle('');
//         setSlug('');
//         setBody('');
//       })
//       .catch((error) => {
//         setMessage(`Error creating post: ${error.message}`);
//       });
//   };

//   return (
//     <div>
//       <h1>Welcome to My Blog</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Slug:</label>
//           <input
//             type="text"
//             value={slug}
//             onChange={(e) => setSlug(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Body:</label>
//           <textarea
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <button type="submit">Create Post</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default App;


// MarkdownEditor.js
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "katex/dist/katex.min.css"; // Import CSS của KaTeX
import { renderToString } from "katex"; // Import hàm render của KaTeX
import rehypeKatex from "rehype-katex"; // Import plugin KaTeX cho rehype
import remarkMath from "remark-math"; // Plugin để nhận diện cú pháp toán học

import PostList from './components/PostList';

const MarkdownEditor = () => {
  const [title, setTitle] = useState("a");
  const [slug, setSlug] = useState("b");
  const [tags, setTags] = useState("c");
  const [author, setAuthor] = useState("d");
  const [category, setCategory] = useState("e");
  const date = new Date();
  const [body, setBody] = useState("f");
  const [message, setMessage] = useState("g");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    const postData = { title, slug, tags, author, category, date, body};

    // Call API to create a new post
    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMessage('Post created successfully!');
        // Reset form fields
        // setContent('');
      }) 
      .catch((error) => {
        setMessage(`Error creating post: ${error.message}`);
      });
  };


  return (
    <div className="markdown-editor">
      {/*Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required />
      {/* Editor */}
      <MDEditor
        value={body}
        onChange={setBody}
        height={500} // Tùy chỉnh chiều cao
        previewOptions={{
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        }}
      />
      {/* Slug */}
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="Slug"
        required />
      {/* Tags */}
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags"
        required />
      {/* Author */}
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required />
      {/* Category */}
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required />
      
      {/* Button */}
      <button onClick={handleSubmit}>Create Post</button>
        
        {/* Message */}
        {message && <p>{message}</p>}
        
    <PostList />
    </div>


  );
};


export default MarkdownEditor;

