import React from "react";
import { NavLink } from "react-router-dom";

const PostTitle = ({ children, className = "", size = "", to = "/" }) => {
  const fontNormal = "text-lg";
  const fontBig = "text-[22px]";
  const classFont = `font-bold leading-6 block [&_a]:block ${className} ${
    size === "big" ? fontBig : fontNormal
  }`;
  return (
    <h3 className={classFont}>
      <NavLink to={to}>{children}</NavLink>
    </h3>
  );
};

export default PostTitle;
