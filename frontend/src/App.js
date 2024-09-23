import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    // Gọi API từ backend
    fetch('http://localhost:5000') // Địa chỉ backend
      .then(response => response.text())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;
