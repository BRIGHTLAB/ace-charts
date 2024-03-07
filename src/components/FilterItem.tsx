import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
};

const FilterItem = (props: Props) => {
  return (
    <div
      className={clsx(
        "w-full h-full flex items-center justify-center py-2  cursor-pointer duration-300 shadow-md select-none",
        {
          "text-white bg-red-primary": props.selected,
          "bg-white text-black": !props.selected,
        }
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default FilterItem;
