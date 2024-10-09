import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CategorySite = () => {
  const categorySlugs = {
    'Thời sự': 'thoi-su',
    'Đời sống': 'doi-song',
    'Giải trí': 'giai-tri',
    'Thể thao': 'the-thao',
    'Kinh doanh': 'kinh-doanh',
    'Giáo dục': 'giao-duc',
    'Sức khỏe': 'suc-khoe',
    'Du lịch': 'du-lich',
    'Công nghệ': 'cong-nghe',
    'Xe cộ': 'xe-co',
    'Ẩm thực': 'am-thuc',
    'Pháp luật': 'phap-luat',
    'Nhà đất': 'nha-dat',
    'Tuyển sinh': 'tuyen-sinh',
    'Tin tức khác': 'tin-tuc-khac',
  };

  const categoryList = Object.keys(categorySlugs);

  return (
    <div className="flex w-full items-center justify-between bg-gray-100 p-5">
      <div className="flex space-x-3">
        {categoryList.map((category) => (
          <Link
            key={category}
            to={`/${categorySlugs[category]}`} // Use Link for navigation
            className="rounded-md bg-blue-500 px-3 py-1 text-white transition duration-200 hover:bg-blue-600"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const Header = ({ onLogin }) => {
  return (
    <>
      <header className="flex items-center justify-between bg-white p-5 shadow-md">
        <Link to="/" className="text-3xl font-bold">
          Home
        </Link>
        <div className="flex items-center">
          <button
            className="rounded-md bg-blue-500 px-3 py-1 text-white transition duration-200 hover:bg-blue-600"
            onClick={onLogin} // Call onLogin function when clicking Login
          >
            Login
          </button>
          <button className="ml-3 rounded-md bg-blue-500 px-3 py-1 text-white transition duration-200 hover:bg-blue-600">
            Sign Up
          </button>
        </div>
      </header>
      <CategorySite />
    </>
  );
};

export const SignedInHeader = ({ onLogout }) => {
  // Receive onLogout prop
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/create-post'); // Navigate to the create post route
  };

  return (
    <>
      <header className="flex items-center justify-between bg-white p-5 shadow-md">
        <Link to="/" className="text-3xl font-bold">
          Home
        </Link>
        <div className="flex items-center">
          <button
            className="rounded-md bg-blue-500 px-3 py-1 text-white transition duration-200 hover:bg-blue-600"
            onClick={handleCreatePost}
          >
            Create Post
          </button>
          <button
            className="ml-3 rounded-md bg-blue-500 px-3 py-1 text-white transition duration-200 hover:bg-blue-600"
            onClick={onLogout} // Call the onLogout function when clicking Logout
          >
            Logout
          </button>
        </div>
      </header>
      <CategorySite />
    </>
  );
};
