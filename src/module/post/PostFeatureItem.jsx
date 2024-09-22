import React, { useEffect, useState } from "react";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import slugify from "slugify";

const PostFeatureItem = ({ data }) => {
  const [category, setCategory] = useState("");
  useEffect(() => {
    async function getData() {
      const docRef = doc(db, "categories", data.categoryId);
      const docSnap = await getDoc(docRef);
      setCategory(docSnap.data());
    }
    getData();
  }, [data.categoryId]);
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetchUser() {
      if (data.userId) {
        const docRef = doc(db, "users", data.userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.data()) {
          setUser(docSnap.data());
        }
      }
    }
    fetchUser();
  }, [data.userId]);
  if (!data || !data.id) return null;
  console.log(user);
  return (
    <div className="w-full rounded-2xl relative h-[169px] min-[1024px]:h-[272px]">
      <PostImage
        className="object-cover size-full rounded-2xl"
        url={data.image}
      ></PostImage>

      <div className="absolute inset-0 rounded-2xl bg-custom-gradient mix-blend-multiply opacity-60"></div>
      <div className="absolute inset-0 z-10 p-5 text-white ">
        <div className="flex items-center justify-between mb-4">
          {category && (
            <PostCategory type="primary">{category?.name}</PostCategory>
          )}
          <PostMeta
            authorName={user?.fullname}
            to={slugify(user?.fullname || "", { lower: true })}
          ></PostMeta>
        </div>
        <PostTitle className="post-title" size="big">
          {data.title}
        </PostTitle>
      </div>
    </div>
  );
};

export default PostFeatureItem;
