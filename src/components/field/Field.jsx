import React from "react";

const Field = ({ children }) => {
  return (
    <div className="flex flex-col items-start mb-10 gap-y-5 last:mb-0">
      {children}
    </div>
  );
};

export default Field;
