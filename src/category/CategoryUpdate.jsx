import React, { useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/auth-context";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/Label/Label";
import Radio from "../components/checkbox/Radio";
import Button from "../components/button/Button";
import { db } from "../firebase/firebase-config";
import DashboardHeading from "../module/dashboard/DashboardHeading";
import { userRole } from "../utils/constants";
const CategoryUpdate = () => {
  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  if (!categoryId) return null;
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);
  const watchStatus = watch("status");
  const { userInfo } = useAuth();

  const handleUpdateCategory = async (values) => {
    // if (userInfo?.role !== userRole.ADMIN) {
    //   Swal.fire("Failed", "You have no right to do this action", "warning");
    //   return;
    // }
    const colRef = doc(db, "categories", categoryId);
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: values.status,
    });
    toast.success("Update category successfully!");
    navigate("/manage/category");
  };
  if (!categoryId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id: ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={watchStatus === "approved"}
                value={"approved"}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === "unapproved"}
                value={"unapproved"}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          kind="primary"
          moreClass="mx-auto max-w-[200px]"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
