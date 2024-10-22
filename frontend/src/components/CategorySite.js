import React from 'react';
import { Link } from 'react-router-dom';

const CategorySite = () => {
  const categorySlugs = {
    'Thời sự': 'thoi-su',
    'Đời sống': 'doi-song',
    'Giải trí': 'giai-tri',
    'Thể thao': 'the-thao',
    'Kinh doanh': 'kinh-doanh',
    'Xe cộ': 'xe-co',
    'Ẩm thực': 'am-thuc',
    'Pháp luật': 'phap-luat',
    'Nhà đất': 'nha-dat',
    'Tuyển sinh': 'tuyen-sinh',
    'Tin tức khác': 'khac',
  };

  const categoryList = Object.keys(categorySlugs);

  return (
    <div className="flex w-full flex-wrap items-center justify-center bg-gray-100 p-5">
      <div className="flex space-x-3">
        {categoryList.map((category) => (
          <Link
            key={category}
            to={`/posts/search/${categorySlugs[category]}`}
            className="rounded-md bg-slate-800 px-4 py-2 text-white transition duration-200 hover:bg-slate-700 hover:text-orange-200"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySite;
