import React from "react";
import { Link } from "react-router-dom";

const PostMeta = ({
  className = "",
  date = "xx/xx/xx",
  authorName = "undefined",
  to = "",
}) => {
  const classBasic =
    "flex items-center gap-3 text-sm font-semibold text-inherit";
  return (
    <div className={`${classBasic} ${className}`}>
      <span className="post-time">{date}</span>
      <span className="inline-block rounded-full size-1 bg-current-color"></span>
      <Link to={`/author/${to}`}>
        <span className="post-author">{authorName}</span>
      </Link>
    </div>
  );
};

export default PostMeta;
