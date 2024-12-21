import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Heading from "../components/layout/Heading";
import PostItem from "../module/post/PostItem";

const CategoryPage = () => {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    //*get category by slug
    async function fetchData() {
      const colRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug)
      );
      onSnapshot(colRef, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(result);
        console.log(posts);
      });
    }
    fetchData();
  }, [params.slug]);
  if (posts.length < 0) return null;
  return (
    <Layout>
      <div className="container">
        <div className="pt-20"></div>
        <Heading>Post in {params.slug}</Heading>
        <div className="grid grid-cols-3 gap-10">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
