import React, {useEffect,useState} from "react";

import styled from "styled-components";
import Layout from "../components/layout/Layout.jsx";
import Heading from "../components/layout/Heading.jsx";
import PostImage from "../module/post/PostImage.jsx";
import PostCategory from "../module/post/PostCategory.jsx";
import PostMeta from "../module/post/PostMeta.jsx";
import PostItem from "../module/post/PostItem.jsx";
import {useParams} from "react-router-dom";
import NotFoundPage from "./NotFoundPage.jsx";
import {collection, getDoc, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../firebase/firebase-config.jsx";
import parse from 'html-react-parser';
import slugify from "slugify";


const PostDetailsPageStyles = styled.div`
    padding-bottom: 100px;

    .post {
        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 40px;
            margin: 40px 0;
        }

        &-feature {
            width: 100%;
            max-width: 640px;
            height: 466px;
            border-radius: 20px;
        }

        &-heading {
            font-weight: bold;
            font-size: 36px;
            margin-bottom: 16px;
        }

        &-info {
            flex: 1;
        }

        &-content {
            max-width: 700px;
            margin: 80px auto;
        }
    }

    .author {
        margin-top: 40px;
        margin-bottom: 80px;
        display: flex;
        border-radius: 20px;
        background-color: ${(props) => props.theme.grayF3};

        &-image {
            width: 200px;
            height: 200px;
            flex-shrink: 0;
            border-radius: inherit;
        }

        &-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: inherit;
        }

        &-content {
            flex: 1;
            padding: 20px;
        }

        &-name {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 20px;
        }

        &-desc {
            font-size: 14px;
            line-height: 2;
        }
    }

    @media screen and (max-width: 1023.98px) {
        padding-bottom: 40px;
        .post {
            &-header {
                flex-direction: column;
            }

            &-feature {
                height: auto;
            }

            &-heading {
                font-size: 26px;
            }

            &-content {
                margin: 40px 0;
            }
        }

        .author {
            flex-direction: column;

            &-image {
                width: 100%;
                height: auto;
            }
        }
    }
`;

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
    console.log(postInfo);
    if (!slug) return <NotFoundPage/>;
    if (!postInfo.title) return null;
    // console.log(postInfo.content);
    const {user} = postInfo;
    const date = new Date(postInfo?.createAt?.seconds * 1000);
    const formatDate = new Date(date).toLocaleDateString("vi-VN");
    return (
        <PostDetailsPageStyles>
            <Layout>
                <div className="container">
                    <div className="post-header">
                        <PostImage
                            url={postInfo.image}
                            className="post-feature"
                        ></PostImage>
                        <div className="post-info">
                            <PostCategory className="mb-6">{postInfo?.category?.name}</PostCategory>
                            <h1 className="post-heading">
                                {postInfo.title}
                            </h1>
                            <PostMeta authorName={user?.fullname}
                                      to={slugify(user?.fullname || "", {lower: true})}
                                      date={formatDate}></PostMeta>
                        </div>
                    </div>
                    <div className="post-content">
                        <div className="entry-content">
                            {parse(postInfo.content || "")}
                        </div>
                        <div className="author">
                            <div className="author-image">
                                <img
                                    src={user.avatar}
                                    alt=""
                                />
                            </div>
                            <div className="author-content">
                                <h3 className="author-name">{user.fullname}</h3>
                                <p className="author-desc">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    Dignissimos non animi porro voluptates quibusdam optio nulla
                                    quis nihil ipsa error delectus temporibus nesciunt, nam
                                    officiis adipisci suscipit voluptate eum totam!
                                </p>
                            </div>
                        </div>
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
        </PostDetailsPageStyles>
    );
};

export default PostDetailsPage;