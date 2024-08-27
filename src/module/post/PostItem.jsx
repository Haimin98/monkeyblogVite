import React from "react";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";

const PostItem = () => {
  return (
    <div className="flex flex-col items-start">
      <PostImage
        className="h-[202px] mb-5 block w-full rounded-2xl"
        url="https://images.unsplash.com/photo-1570993492881-25240ce854f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2290&q=80"
      ></PostImage>

      <PostCategory classMore="mb-4 post-category" type="secondary">
        Kiến thức
      </PostCategory>

      <PostTitle className="mb-2 post-title">
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </PostTitle>
      <PostMeta></PostMeta>
    </div>
  );
};

export default PostItem;
