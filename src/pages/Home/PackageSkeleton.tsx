import React from "react";
import { Skeleton } from "antd";
const PackageSkeleton = () => {
  return (
    // sekeleton loading for 3 package
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index}>
          <Skeleton active />
        </div>
      ))}
    </div>
  );
};

export default PackageSkeleton;
