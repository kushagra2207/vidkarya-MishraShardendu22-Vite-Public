const Skeleton = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative">
        <div className="absolute top-0 left-0 w-3 h-full bg-gray-300"></div>
        <div className="p-6 pl-8">
          <div className="mb-6">
            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-300 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="h-10 bg-gray-300 rounded-xl w-1/4 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
