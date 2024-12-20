import slugify from "slugify";
import React, {useEffect, useState} from "react";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import PostCategory from "./PostCategory";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase-config";

const PostFeatureItem = ({data}) => {
    if (!data || !data.id) return null;
    //*time
    const date = new Date(data?.createAt?.seconds * 1000);
    const formatDate = new Date(date).toLocaleDateString("vi-VN");
    // eslint-disable-next-line react/prop-types
    const {category, user} = data;
    return (
        <div className="w-full rounded-2xl relative h-[169px] min-[1024px]:h-[272px]">
            <PostImage
                className="object-cover size-full rounded-2xl"
                url={data.image}
            ></PostImage>

            <div className="absolute inset-0 rounded-2xl bg-custom-gradient mix-blend-multiply opacity-60"></div>
            <div className="absolute inset-0 z-10 p-5 text-white ">
                <div className="flex items-center justify-between mb-4">
                    {category?.name && (
                        <PostCategory type="primary">{category?.name}</PostCategory>
                    )}
                    <PostMeta
                        authorName={user?.fullname}
                        to={slugify(user?.fullname || "", {lower: true})}
                        date={formatDate}
                    ></PostMeta>
                </div>
                <PostTitle className="post-title" size="big" to={data.slug}>
                    {data.title}
                </PostTitle>
            </div>
        </div>
    );
};

export default PostFeatureItem;
