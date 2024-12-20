import React, {useEffect, useState} from 'react';
import Heading from "../../components/layout/Heading.jsx";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../firebase/firebase-config.jsx";
import PostItem from "./PostItem.jsx";


const PostRelated = ({categoryId = ""}) => {
    const [post, setPost] = useState([]);
    useEffect(() => {
        const docRef = query(collection(db, "posts"), where("categoryId", "==", categoryId));
        onSnapshot(docRef, snapshot => {
            const results = [];
            snapshot.forEach(doc => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                })
            })
            setPost(results);
        });
    }, [categoryId])
    console.log(post);
    if (!categoryId || post.length <= 0) return null;

    return (
        <div className="post-related">
            <Heading>Bài viết liên quan</Heading>
            <div className="grid-layout grid-layout--primary">
                {post.length > 0 && post.map((item) => (
                    <PostItem key={item.id} data={item}></PostItem>
                ))}
            </div>
        </div>
    );
};

export default PostRelated;