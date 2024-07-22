import React from "react";
import ReactSelect, { SingleValue } from "react-select";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  options: FilterOption[];
  value: FilterOption | null;
  isLoading?: boolean;
  disabled?: boolean;
  onChange: (value: SingleValue<FilterOption>) => void;
  maxMenuHeight?: number;
};

const Select: React.FC<Props> = ({
  className,
  options,
  value,
  isLoading,
  disabled,
  onChange,
  maxMenuHeight,
  ...rest
}) => {
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      border: `2px solid transparent`,
      borderRadius: "0.4rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "transparent",
      },
      borderColor: state.isFocused ? "black !important" : "transparent",
    }),

    placeholder: (provided: any) => ({
      ...provided,
      whiteSpace: "nowrap", // Prevent wrapping
      overflowX: "hidden", // Hide overflowing text
      textOverflow: "ellipsis", // Add ellipsis (...) if text overflows
    }),

    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor:
        state.isHovered || state.isSelected ? "#ff788E" : "white", // Change colors as needed
      color: state.isSelected ? "white" : "black", // Change colors as needed
      fontSize: ".875rem",
      //   borderRadius: "1rem",
    }),
    // menu: (provided: any) => ({
    //   ...provided,
    //   borderRadius: "1.25rem",
    //   paddingInline: ".25rem",
    //   paddingBlock: ".5rem",
    // }),
  };

  return (
    <ReactSelect
      className={className}
      isDisabled={disabled}
      // Remove isClearable for single value selection
      options={options}
      value={value}
      isLoading={isLoading}
      styles={customStyles}
      isSearchable={false}
      maxMenuHeight={maxMenuHeight}
      onChange={(selectedOption: SingleValue<FilterOption>) =>
        onChange(selectedOption as SingleValue<FilterOption>)
      } // Access value from selectedOption
      {...rest}
    />
  );
};

export default Select;
