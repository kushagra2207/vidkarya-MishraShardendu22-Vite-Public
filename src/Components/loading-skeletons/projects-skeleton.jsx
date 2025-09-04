import React from 'react';
import './loading-skeleton.css';

export default function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-2 p-1 gap-5  ">
      <ProjectSkeletonBox />
      <ProjectSkeletonBox />
      <ProjectSkeletonBox />
      <ProjectSkeletonBox />
    </div>
  );
}

const ProjectSkeletonBox = () => {
  return (
    <div className="border shadow-lg p-3 rounded-lg">
      <div className="flex gap-5">
        <div className="skeleton w-[3rem]"></div>
        <div className="w-full">
          <div className="skeleton w-[30%] h-6"></div>
          <div className="skeleton w-1/4 h-3 mt-2"></div>
        </div>
      </div>

      <div className="skeleton w-[75%] my-4 h-16"></div>

      <div>
        <div className="skeleton w-[30%] h-3 my-2"></div>
        <div className="skeleton w-[27%] h-3 my-2"></div>
        <div className="skeleton w-[24%] h-3 my-2"></div>
      </div>
    </div>
  );
};
