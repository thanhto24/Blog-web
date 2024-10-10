import React from 'react';

const OtherFeature = () => {
  const listFeature = [
    'Feature 1',
    'Feature 2',
    'Feature 3',
    'Feature 4',
    'Feature 5',
  ];
  return (
    <div className="flex items-center justify-between p-5">
      <h1 className="text-3xl font-bold">Incoming Feature</h1>
      <div className="flex space-x-4">
        {listFeature.map((feature, index) => (
          <div
            key={index}
            className="rounded-lg border bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
          >
            <h3 className="mb-2 text-xl font-semibold">{feature}</h3>
            <p className="mb-2 text-gray-600">Description of {feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherFeature;
