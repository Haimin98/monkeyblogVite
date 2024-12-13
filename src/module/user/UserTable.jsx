// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import Table from "../../components/table/Table";
import {collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../firebase/firebase-config";
import ActionEdit from "../../components/action/ActionEdit";
import {useNavigate} from "react-router-dom";
import LabelStatus from "../../components/Label/LabelStatus";
import ActionDelete from "../../components/action/ActionDelete.jsx";
import Swal from "sweetalert2";
import {deleteUser} from "firebase/auth"

const UserTable = ({filter = ""}) => {
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [lastDoc, setLastDoc] = useState();
    const [total, setTotal] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const USER_PER_PAGE = 3;
    //* search user
    useEffect(() => {
        async function getData() {
            const colRel = collection(db, "users");
            const newRef = filter
                ? query(
                    colRel,
                    where("fullname", ">=", filter),
                    where("fullname", "<=", filter + "utf8")
                )
                : query(colRel, limit(USER_PER_PAGE));
            const documentSnapshots = await getDocs(newRef);
            const lastVisible =
                documentSnapshots.docs[documentSnapshots.docs.length - 1];
            setLastDoc(lastVisible);
            onSnapshot(colRel, (snapshot) => {
                setTotal(Number(snapshot.size));
            });
            onSnapshot(newRef, (snapshot) => {
                let results = [];
                setUserCount(Number(snapshot.size));
                snapshot.forEach((doc) => {
                    results.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setUserList(results);
            });
        }

        getData();
    }, [filter])
    const renderLabelStatus = (status) => {
        switch (status) {
            case "ACTIVE":
                return <LabelStatus type="success">Active</LabelStatus>;
            case "PENDING":
                return <LabelStatus type="default">Pending</LabelStatus>;
            case "BAN":
                return <LabelStatus type="warning">Banned</LabelStatus>;
            default:
                break;
        }
    };
    useEffect(() => {
        const colRel = collection(db, "users");
        onSnapshot(colRel, (snapshot) => {
            const results = [];
            snapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                });
                setUserList(results);
            });
        });
    }, []);

    const handleDeleteUser = async (user) => {
        const colRef = doc(db, "users", user.id);
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
                await deleteDoc(colRef);
                await deleteUser(user);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
            }
        });

    }
    const renderUserItem = (user) => (
        <tr key={user.id}>
            <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
            <td className="whitespace-normal">
                <div className="flex items-center gap-x-3 ">
                    <img
                        src={user?.avatar}
                        alt=""
                        className="flex-shrink-0 object-cover w-12 h-12 rounded-md"
                    />
                    <div className="flex-1">
                        <h3>{user.fullname}</h3>
                        <time className="text-sm text-gray-400">
                            {new Date(user?.createAt?.seconds * 1000).toLocaleDateString(
                                "vi-VI"
                            )}
                        </time>
                    </div>
                </div>
            </td>
            <td>{user?.username}</td>
            <td>{user.email}</td>
            <td>{renderLabelStatus(user?.status)}</td>
            <td>{user.role}</td>
            <td>
                <div className="flex items-center gap-x-3">
                    <ActionEdit onClick={() => {
                        navigate(`/manage/update-user?id=${user.id}`)
                    }}></ActionEdit>
                    {/* <ActionDelete
            onClick={() => handleDeleteCategory(user.id)}
          ></ActionDelete> */}
                    <ActionDelete onClick={() => handleDeleteUser(user)}></ActionDelete>
                </div>
            </td>
        </tr>
    );
    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Info</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {userList.length > 0 && userList.map((user) => renderUserItem(user))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserTable;
