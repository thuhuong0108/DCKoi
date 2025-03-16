import React from "react";

const CategorySkeleton = () => (
  <div className="bg-white p-5 rounded-xl shadow-lg w-[320px] animate-pulse">
    {/* Category header skeleton */}
    <div className="flex justify-between items-center mb-4">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-6 w-6 bg-gray-200 rounded"></div>
    </div>

    {/* Category description skeleton */}
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>

    {/* Task items skeletons */}
    {[1, 2, 3].map((item) => (
      <div
        key={item}
        className="bg-gray-200 rounded-md my-2 border-l-4 border-gray-300 p-3"
      >
        <div className="h-5 bg-gray-300 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    ))}
  </div>
);

const ManagerSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4 py-6">
      {[1, 2, 3].map((category) => (
        <CategorySkeleton key={category} />
      ))}
    </div>
  );
};

export default ManagerSkeleton;
