import React, {useEffect, useState} from "react";
import Layout from "../components/layout/Layout.jsx";
import Heading from "../components/layout/Heading.jsx";
import PostImage from "../module/post/PostImage.jsx";
import PostCategory from "../module/post/PostCategory.jsx";
import PostMeta from "../module/post/PostMeta.jsx";
import PostItem from "../module/post/PostItem.jsx";
import {useParams} from "react-router-dom";
import NotFoundPage from "./NotFoundPage.jsx";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../firebase/firebase-config.jsx";
import parse from 'html-react-parser';
import slugify from "slugify";
import AuthorBox from "../components/author/AuthorBox.jsx";

const PostDetailsPage = () => {
    const {slug} = useParams();
    const [postInfo, setPostInfo] = useState({});
    useEffect(() => {
        async function fetchData() {
            if (!slug) return;
            const colRef = query(collection(db, "posts"), where("slug", "==", slug));
            onSnapshot(colRef, (snapshot) => {
                snapshot.forEach((doc) => {
                    doc.data() && setPostInfo(doc.data());
                })
            });
        }

        fetchData();
    }, [slug]);
    // console.log(postInfo);
    if (!slug) return <NotFoundPage/>;
    if (!postInfo.title) return null;
    // console.log(postInfo.content);
    const {user} = postInfo;
    const date = new Date(postInfo?.createAt?.seconds * 1000);
    const formatDate = new Date(date).toLocaleDateString("vi-VN");
    return (

        <>
            <Layout>
                <div className="container p-[100px]">
                    <div className="flex justify-between items-center gap-10 my-10 mx-0">
                        <PostImage
                            url={postInfo.image}
                            className="w-full max-w-[640px] h-[446px] rounded-2xl"
                        ></PostImage>
                        <div className="flex-1">
                            <PostCategory className="mb-6">{postInfo?.category?.name}</PostCategory>
                            <h1 className="font-bold text-4xl mb-4">
                                {postInfo.title}
                            </h1>
                            <PostMeta authorName={user?.fullname}
                                      to={slugify(user?.fullname || "", {lower: true})}
                                      date={formatDate}></PostMeta>
                        </div>
                    </div>
                    <div className="max-w-[700px] mx-auto">
                        <div className="entry-content">
                            {parse(postInfo.content || "")}
                        </div>
                        <AuthorBox userId={user.id}></AuthorBox>
                    </div>
                    <div className="post-related">
                        <Heading>Bài viết liên quan</Heading>
                        <div className="grid-layout grid-layout--primary">
                            <PostItem></PostItem>
                            <PostItem></PostItem>
                            <PostItem></PostItem>
                            <PostItem></PostItem>
                        </div>
                    </div>
                </div>
            </Layout>
        </>


    );
};

export default PostDetailsPage;