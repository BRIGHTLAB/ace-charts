import { cn } from "@/lib/utils";
import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

const Loading = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        className,
        "flex w-full h-full justify-center items-center"
      )}
    >
      <span className="animate-spin text-3xl">
        <BiLoaderCircle />
      </span>
    </div>
  );
};

export default Loading;
