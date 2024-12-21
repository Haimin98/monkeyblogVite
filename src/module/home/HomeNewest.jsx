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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mb-8 md:mb-[64px] items-start">
          <PostNewestLarge></PostNewestLarge>
          <div className="px-4 md:px-[28px] py-4 md:py-[20px] bg-[#f3edff] rounded-xl md:rounded-2xl">
            <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 md:gap-7">
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
