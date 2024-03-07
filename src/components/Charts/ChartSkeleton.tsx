import React from "react";

type Props = {};

const ChartSkeleton = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col gap-3 animate-pulse">
      <div className="h-[2.5rem] w-[7rem] bg-gray-200"></div>
      <div className="flex-1 bg-gray-200"></div>
    </div>
  );
};

export default ChartSkeleton;
