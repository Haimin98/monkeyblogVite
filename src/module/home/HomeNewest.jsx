import React from "react";
import Heading from "../../components/layout/Heading";
import PostNewestItem from "../post/PostNewestItem";
import PostItem from "../post/PostItem";
import PostNewestLarge from "../post/PostNewestLarge";

const HomeNewest = () => {
  return (
    <div className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="grid grid-cols-2 gap-10 mb-[64px] items-start max-[640px]:grid-cols-1">
          <PostNewestLarge></PostNewestLarge>
          <div className="px-[28px] py-[20px] bg-[#f3edff] rounded-2xl">
            <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem>
          </div>
        </div>
        <div className="grid-layout grid-layout--primary">
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
          <PostItem></PostItem>
        </div>
      </div>
    </div>
  );
};

export default HomeNewest;
