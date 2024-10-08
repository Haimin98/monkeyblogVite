import React, { useEffect, useState } from "react";
import Table from "../components/table/Table";
import DashboardHeading from "../module/dashboard/DashboardHeading";
import LabelStatus from "../components/Label/LabelStatus";
import ActionEdit from "../components/action/ActionEdit";
import ActionDelete from "../components/action/ActionDelete";
import ActionView from "../components/action/ActionView";
import { db } from "../firebase/firebase-config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRel = collection(db, "categories");
    onSnapshot(colRel, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategoryList(results);
    });
  }, []);
  // console.log(categoryList);
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
    </div>
  );
};

export default CategoryManage;
