import React from 'react';
import { Link } from 'react-router-dom';

const CategorySite = () => {
  const categorySlugs = {
    'Công nghệ': 'cong-nghe',
    'Học tập': 'hoc-tap',
    'Ngôn ngữ': 'ngon-ngu',
    'Hoạt động': 'hoat-dong',
    'Giải trí': 'giai-tri',
    'Tin tức khác': 'khac',
  };

  const categoryList = Object.keys(categorySlugs);

  return (
    <div className="flex w-full flex-wrap items-center justify-center bg-gray-100 py-6">
      <div className="flex flex-wrap justify-center gap-3">
        {categoryList.map((category) => (
          <Link
            key={category}
            to={`/posts/search/${categorySlugs[category]}`}
            className="flex min-w-[8rem] justify-center rounded-md bg-slate-800 px-5 py-2 text-white text-center transition duration-200 hover:bg-slate-700 hover:text-orange-200"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySite;
