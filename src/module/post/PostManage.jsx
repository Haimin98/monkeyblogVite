import React, {useEffect, useState} from "react";
import Table from "../../components/table/Table";
import {collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, startAfter, where} from "firebase/firestore";
import {db} from "../../firebase/firebase-config.jsx";
import Button from "../../components/button/Button.jsx";
import {useNavigate} from "react-router-dom";
import ActionView from "../../components/action/ActionView.jsx";
import ActionEdit from "../../components/action/ActionEdit.jsx";
import ActionDelete from "../../components/action/ActionDelete.jsx";
import Swal from "sweetalert2";
import LabelStatus from "../../components/Label/LabelStatus.jsx";
import {debounce} from "lodash";

const PostManage = () => {
    const [postList, setPostList] = useState([]);
    const [filter, setFilter] = useState("");
    const [lastDoc, setLastDoc] = useState();
    const [total, setTotal] = useState(0);
    const [postCount, setPostCount] = useState(0);
    const POST_PER_PAGE = 3;
    const navigate = useNavigate();
//* load more
    const handleLoadMoreCategory = async () => {
        const nextRef = query(
            collection(db, "posts"),
            startAfter(lastDoc),
            limit(POST_PER_PAGE)
        );
        onSnapshot(nextRef, (snapshot) => {
            let results = [];
            setPostCount(Number(snapshot.size));
            snapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setPostList(results);
        });
        const documentSnapshots = await getDocs(nextRef);
        const lastVisible =
            documentSnapshots.docs[documentSnapshots.docs.length - 1];
        setLastDoc(lastVisible);
    };

    //* search post
    const handleSearchPost = debounce((e) => {
        setFilter(e.target.value);
    }, 250)
    useEffect(() => {
        async function getData() {
            const colRel = collection(db, "posts");
            const newRef = filter
                ? query(
                    colRel,
                    where("title", ">=", filter),
                    where("title", "<=", filter + "utf8")
                )
                : query(colRel, limit(POST_PER_PAGE));
            const documentSnapshots = await getDocs(newRef);
            const lastVisible =
                documentSnapshots.docs[documentSnapshots.docs.length - 1];
            setLastDoc(lastVisible);
            onSnapshot(colRel, (snapshot) => {
                setTotal(Number(snapshot.size));
            });
            onSnapshot(newRef, (snapshot) => {
                let results = [];
                setPostCount(Number(snapshot.size));
                snapshot.forEach((doc) => {
                    results.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setPostList(results);
            });
        }

        getData();
    }, [filter])

    //* function deletePost
    const handleDeletePost = async (postId) => {
        const colRel = doc(db, "posts", postId);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteDoc(colRel);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your post has been deleted.",
                    icon: "success",
                });
            }
        });
    }
    //* render status
    const renderPostStatus = (status) => {
        switch (status) {
            case "approved":
                return <LabelStatus type={"success"}>Approved</LabelStatus>
            case "pending":
                return <LabelStatus type={"warning"}>Pending</LabelStatus>
            case "reject":
                return <LabelStatus type={"danger"}>Rejected</LabelStatus>
            default:
                break;
        }
    }
    return (
        <div>
            <h1 className="dashboard-heading">Manage post</h1>
            <div className="flex justify-end mb-10">
                <div className="w-full max-w-[300px]">
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 border-solid rounded-lg"
                        placeholder="Search post..."
                        onChange={handleSearchPost}
                    />
                </div>
            </div>
            <Table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Post</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {postList.length > 0 && postList.map((post) => {
                    //*time
                    const date = new Date(post?.createAt?.seconds * 1000);
                    const formatDate = new Date(date).toLocaleDateString("vi-VN");
                    return (

                        <tr key={post.id}>

                            <td title={post.id}>{post.id.slice(0, 5) + "..."}</td>
                            <td>
                                <div className="flex items-center gap-x-3">
                                    <img
                                        src={post?.image}
                                        alt=""
                                        className="w-[66px] h-[55px] rounded object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold max-w-[300px] whitespace-pre-wrap">{post?.title}</h3>
                                        <time className="text-sm text-gray-500">
                                            Date : {formatDate}
                                        </time>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="text-gray-500">{post?.category?.name}</span>
                            </td>
                            <td>
                                <span className="text-gray-500">{post?.user?.fullname}</span>
                            </td>
                            <td>{renderPostStatus(post.status)}</td>
                            <td>
                                <div className="flex items-center text-gray-500 gap-x-3">
                                    <ActionView onClick={() => navigate(`/${post.slug}`)}></ActionView>
                                    <ActionEdit onClick={() => {
                                        navigate(`/manage/update-post?id=${post.id}`)
                                    }}></ActionEdit>
                                    <ActionDelete onClick={() => handleDeletePost(post.id)}></ActionDelete>
                                </div>
                            </td>
                        </tr>

                    )
                })}

                </tbody>
            </Table>
            <div className="mt-10">
                {total > postCount && (
                    <Button
                        kind="primary"
                        moreClass="w-full max-w-[200px] mx-auto"
                        onClick={handleLoadMoreCategory}
                    >
                        Load More
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PostManage;
