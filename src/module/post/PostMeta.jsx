import React from "react";

const PostMeta = ({
  className = "",
  date = "Mar 23",
  authorName = "Minh Hai",
}) => {
  const classBasic =
    "flex items-center gap-3 text-sm font-semibold text-inherit";
  return (
    <div className={`${classBasic} ${className}`}>
      <span className="post-time">{date}</span>
      <span className="inline-block rounded-full size-1 bg-current-color"></span>
      <span className="post-author">{authorName}</span>
    </div>
  );
};

export default PostMeta;
