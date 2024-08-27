import React from "react";
import { NavLink } from "react-router-dom";

const PostImage = ({ className = "", url = "", alt = "", to = null }) => {
  if (to) {
    return (
      <NavLink to={to} style={{ display: "block" }}>
        <div className={`post-image ${className}`}>
          <img
            className="size-full object-cover rounded-[inherit]"
            src={url}
            alt={alt}
            loading="lazy"
          />
        </div>
      </NavLink>
    );
  }
  return (
    <div className={`post-image ${className}`}>
      <img
        className="size-full object-cover rounded-[inherit]"
        src={url}
        alt={alt}
        loading="lazy"
      />
    </div>
  );
};

export default PostImage;
