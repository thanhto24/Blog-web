import React from 'react';

const OtherFeature = () => {
  const listFeature = [
    { name: 'Email', url: 'mailto:thanhtovntmk@gmail.com', text: 'thanhtovntmk@gmail.com' },
    { name: 'GitHub', url: 'https://github.com/thanhto24', text: 'thanhto24' },
    { name: 'Facebook', url: 'https://www.facebook.com/thanhtto25', text: 'Thanh Tô' },
    { name: 'YouTube', url: 'https://www.youtube.com/@tothanh4751', text: 'Thanh Tô' },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">Contact with Me:</h1>
      <div className="flex flex-wrap justify-center space-x-4">
        {listFeature.map((feature, index) => (
          <a
            key={index}
            href={feature.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border bg-white p-4 shadow-md transition-shadow hover:shadow-lg flex flex-col items-center text-center m-2 min-w-[200px] max-w-xs"
          >
            <h3 className="mb-2 text-xl font-semibold">{feature.name}</h3>
            <p className="mb-2 text-gray-600">{feature.text}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default OtherFeature;
