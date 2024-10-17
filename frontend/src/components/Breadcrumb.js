import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="mb-4">
      <ol className="flex space-x-2 text-gray-700">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            <Link to={path.url} className="hover:text-blue-500">
              {path.label}
            </Link>
            {index < paths.length - 1 && <span className="mx-2"> &gt; </span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
