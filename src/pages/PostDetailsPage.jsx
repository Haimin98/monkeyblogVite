import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout.jsx";
import PostImage from "../module/post/PostImage.jsx";
import PostCategory from "../module/post/PostCategory.jsx";
import PostMeta from "../module/post/PostMeta.jsx";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage.jsx";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config.jsx";
import parse from "html-react-parser";
import slugify from "slugify";
import AuthorBox from "../components/author/AuthorBox.jsx";
import PostRelated from "../module/post/PostRelated.jsx";

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() && setPostInfo(doc.data());
        });
      });
    }

    fetchData();
  }, [slug]);
  //*auto ontop
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  if (!slug) return <NotFoundPage />;
  if (!postInfo.title) return null;
  const { user } = postInfo;
  const date = new Date(postInfo?.createAt?.seconds * 1000);
  const formatDate = new Date(date).toLocaleDateString("vi-VN");
  return (
    <>
      <Layout>
        <div className="container p-5 md:p-[100px]">
          <div className="flex flex-col items-center justify-between gap-5 mx-0 my-5 md:flex-row md:gap-10 md:my-10">
            <PostImage
              url={postInfo.image}
              className="w-full max-w-full md:max-w-[640px] h-[300px] md:h-[446px] rounded-2xl"
            ></PostImage>
            <div className="flex-1 w-full md:w-auto">
              <PostCategory
                to={slugify(postInfo?.category?.name || "", { lower: true })}
                className="mb-3 md:mb-6"
              >
                {postInfo?.category?.name}
              </PostCategory>
              <h1 className="mb-3 text-2xl font-bold md:mb-4 md:text-4xl">
                {postInfo.title}
              </h1>
              <PostMeta
                authorName={user?.fullname}
                to={slugify(user?.fullname || "", { lower: true })}
                date={formatDate}
              ></PostMeta>
            </div>
          </div>
          <div className="max-w-full md:max-w-[700px] mx-auto">
            <div className="text-base entry-content md:text-lg">
              {parse(postInfo.content || "")}
            </div>
            <AuthorBox userId={user.id}></AuthorBox>
          </div>
          <PostRelated categoryId={postInfo?.category?.id}></PostRelated>
        </div>
      </Layout>
    </>
  );
};

export default PostDetailsPage;
