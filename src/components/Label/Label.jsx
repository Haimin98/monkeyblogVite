import React from "react";

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <div
      className="font-semibold cursor-pointer text-grayDark"
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </div>
  );
};

export default Label;
