import React from "react";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PropTypes from "prop-types";
import slugify from "slugify";

const PostItem = ({ data }) => {
  if (!data) return null;
  const date = new Date(data?.createAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VN");
  return (
    <div className="flex flex-col items-start">
      <PostImage
        className="h-[202px] mb-5 block w-full rounded-2xl"
        to={data.slug}
        url={data.image}
      ></PostImage>

      <PostCategory
        to={data.category?.name}
        classMore="mb-4 post-category"
        type="secondary"
      >
        {data.category?.name}
      </PostCategory>

      <PostTitle className="mb-2 post-title" to={data.slug}>
        {data.title}
      </PostTitle>
      <PostMeta
        authorName={data?.user?.username}
        to={slugify(data?.user?.username || "", { lower: true })}
        date={formatDate}
      ></PostMeta>
    </div>
  );
};

PostItem.propTypes = {
  data: PropTypes.shape([]),
  image: PropTypes.string,
};

export default PostItem;
