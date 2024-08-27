import React from "react";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";

const PostNewestLarge = () => {
  return (
    <div>
      <PostImage
        className="block mb-4 h-[433px] rounded-2xl"
        url="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
        // to={"/sign-up"}
      ></PostImage>

      <PostCategory classMore="mb-4" type="secondary">
        Kiến thức
      </PostCategory>

      <PostTitle size="big" className="mb-[10px]">
        Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
      </PostTitle>
      <PostMeta></PostMeta>
    </div>
  );
};

export default PostNewestLarge;
