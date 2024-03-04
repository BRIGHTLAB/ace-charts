"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = (props: Props) => {
  const { ...rest } = props;

  return (
    <button
      className={cn(
        "rounded-md text-center text-sm font-semibold w-full p-[2px] h-full bg-blue-900 cursor-pointer",
        {
          "opacity-50": props.disabled,
        }
      )}
      {...rest}
    >
      <span className="flex w-full h-full items-center justify-center text-white rounded-full py-2 px-[2.12rem] text-nowrap">
        {props.children}
      </span>
    </button>
  );
};

export default Button;
