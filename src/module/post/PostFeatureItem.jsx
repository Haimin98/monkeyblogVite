import React from "react";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";

const PostFeatureItem = () => {
  return (
    <div className="w-full rounded-2xl relative h-[169px] min-[1024px]:h-[272px]">
      <PostImage
        className="object-cover size-full rounded-2xl"
        url="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2662&q=80"
      ></PostImage>

      <div className="absolute inset-0 rounded-2xl bg-custom-gradient mix-blend-multiply opacity-60"></div>
      <div className="absolute inset-0 z-10 p-5 text-white ">
        <div className="flex items-center justify-between mb-4">
          <PostCategory type="primary">Kiến thức</PostCategory>
          <PostMeta></PostMeta>
        </div>
        <PostTitle className="post-title" size="big">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </PostTitle>
      </div>
    </div>
  );
};

export default PostFeatureItem;
