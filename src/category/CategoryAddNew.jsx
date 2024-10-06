import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DashboardHeading from "../module/dashboard/DashboardHeading";
import Field from "../components/field/Field";
import Label from "../components/Label/Label";
import Input from "../components/input/Input";
import Radio from "../components/checkbox/Radio";
import Button from "../components/button/Button";
import FieldCheckboxes from "../components/field/FieldCheckboxes";
import slugify from "slugify";
import { db } from "../firebase/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
const CategoryAddNew = () => {
  useEffect(() => {
    document.title = "Add new category";
  });
  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: "approved",
      createAt: new Date(),
    },
  });
  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    const newValues = { ...values };
    newValues.slug = slugify(newValues.slug || newValues.name, {
      lower: true,
    });
    const colRef = collection(db, "categories");
    try {
      await addDoc(colRef, {
        ...newValues,
        createAt: serverTimestamp(),
      });
      toast.success("Create new category successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: "approved",
        createAt: new Date(),
      });
    }
  };
  const watchStatus = watch("status");
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
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
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === "approved"}
                value="approved"
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === "unapproved"}
                value="unapproved"
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          type={"submit"}
          moreClass="mx-auto mt-10 max-w-[250px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
