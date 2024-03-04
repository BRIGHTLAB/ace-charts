import { cn } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: Props) => {
  const { className, onChange, ...rest } = props;

  return (
    <label>
      <div className={"text-sm text-black font-semibold"}>
        {props.placeholder}
      </div>
      <div
        className={cn(
          "w-full rounded-md py-3 px-[1.375rem] text-black text-base mt-[2px] bg-[#FAFAFA] border border-[#DBDBDB]",
          className
        )}
      >
        <input
          className="w-full outline-none font-medium placeholder:text-[#D6D6D6]"
          {...rest}
          onChange={onChange}
        />
      </div>
    </label>
  );
};

export default Input;
