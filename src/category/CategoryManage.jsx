import React, { useEffect, useRef, useState } from "react";
import Table from "../components/table/Table";
import DashboardHeading from "../module/dashboard/DashboardHeading";
import LabelStatus from "../components/Label/LabelStatus";
import ActionEdit from "../components/action/ActionEdit";
import ActionDelete from "../components/action/ActionDelete";
import ActionView from "../components/action/ActionView";
import { db } from "../firebase/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  getDocs,
  startAfter,
  query,
  where,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import Button from "../components/button/Button";

const CATEGORY_PER_PAGE = 3;

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [categoryCount, setCategoryCount] = useState(0);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  //*load more category
  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, "categories"),
      startAfter(lastDoc),
      limit(CATEGORY_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      setCategoryCount(Number(snapshot.size));
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList(results);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  //*filter
  useEffect(() => {
    async function getData() {
      const colRel = collection(db, "categories");
      const newRef = filter
        ? query(
            colRel,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRel, limit(CATEGORY_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDoc(lastVisible);
      onSnapshot(colRel, (snapshot) => {
        setTotal(Number(snapshot.size));
      });
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        setCategoryCount(Number(snapshot.size));
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategoryList(results);
      });
    }
    getData();
  }, [filter]);
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  //*delete category
  const handleDeleteCategory = async (docId) => {
    const colRel = doc(db, "categories", docId);
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
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div>
      <DashboardHeading
        title="Categories"
        desc="Manage your category"
      ></DashboardHeading>

      <div className="flex justify-end mb-10">
        <input
          type="text"
          className="w-full p-4 border border-gray-400 rounded-lg outline-none"
          placeholder="Search category"
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td className="italic text-gray-600">{category.slug}</td>
                <td>
                  {category.status === "approved" && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {category.status === "unapproved" && (
                    <LabelStatus type="danger">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionEdit></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(category.id)}
                    ></ActionDelete>
                    <ActionView
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }
                    ></ActionView>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > categoryList.length && (
        <div className="mt-10">
          <Button
            kind="primary"
            moreClass="w-full max-w-[200px] mx-auto"
            onClick={handleLoadMoreCategory}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryManage;
