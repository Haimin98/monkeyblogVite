import React from "react";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostImage from "./PostImage";
const PostNewestItem = () => {
  return (
    <div
      className="flex items-center gap-5 mb-7 pb-7 border-b-1 border-solid 
  border-[#ccc] last:pb-0 last:border-b-0 last:mb-0"
    >
      <PostImage
        className="block shrink-0 w-[180px] h-[130px] rounded-xl"
        url="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
      ></PostImage>

      <div className="post-content">
        <PostCategory classMore="mb-2" type="secondary">
          Kiến thức
        </PostCategory>
        <PostTitle className="mb-2">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </PostTitle>
        <div className="flex items-center gap-3 text-sm font-semibold text-[#6b6b6b]">
          <span className="post-time">Mar 23</span>
          <span className="inline-block rounded-full size-1 bg-current-color"></span>
          <span className="post-author">Andiez Le</span>
        </div>
      </div>
    </div>
  );
};

export default PostNewestItem;
