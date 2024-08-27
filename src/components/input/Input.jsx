import React from "react";
import { useController } from "react-hook-form";

const Input = ({ name = "", type = "text", children, control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  const hasIcon = children ? true : false;
  const inputClassNames = `w-full p-5 ${
    hasIcon ? "pr-[60px] pt-5 pb-5 pl-5" : "p-5"
  } bg-grayLight rounded-md font-medium transition-all duration-200 ease-linear border border-solid border-grayLight border-transparent focus:bg-white focus:border-primary placeholder-grayDark`;

  return (
    <div className="relative w-full">
      <input
        className={inputClassNames}
        id={name}
        type={type}
        {...field}
        {...props}
      />
      {children ? (
        <div className="absolute transform -translate-y-1/2 cursor-pointer right-5 top-1/2">
          {children}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
