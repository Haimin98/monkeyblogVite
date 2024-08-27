import React from "react";
import { NavLink } from "react-router-dom";

const PostCategory = ({ children, type = "", classMore = "", to = "/" }) => {
  const PostCategoryClassBasic =
    "inline-block px-3 py-2 rounded-lg text-sm font-medium";
  const primary = "bg-grayF3 text-[#6b6b6b]";
  const secondary = "bg-tertiary text-white";
  const PostCategoryClass = `${PostCategoryClassBasic} ${
    type === "primary" ? primary : secondary
  } ${classMore}`;
  return (
    <div className={PostCategoryClass}>
      <NavLink to={to}>{children}</NavLink>
    </div>
  );
};

export default PostCategory;
