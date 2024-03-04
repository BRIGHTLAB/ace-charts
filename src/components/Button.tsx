"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  rounded?: "default" | "none";
}

const Button = (props: Props) => {
  const { variant = "primary", rounded = "default", ...rest } = props;

  return (
    <button
      className={cn("text-center text-sm font-semibold w-full p-[2px] h-full", {
        "rounded-md": rounded === "default",
        "bg-blue-900": variant === "primary",
        "bg-gray-500": variant === "secondary",
        "opacity-50": props.disabled,
        "cursor-pointer": !props.disabled,
      })}
      {...rest}
    >
      <span className="flex w-full h-full items-center justify-center text-white rounded-full py-2 px-[2.12rem] text-nowrap">
        {props.children}
      </span>
    </button>
  );
};

export default Button;
