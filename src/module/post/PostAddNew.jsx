import React, { useEffect, useState } from "react";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import Toggle from "../../components/toggle/Toggle";
import slugify from "slugify";
import Radio from "../../components/checkbox/Radio";
import Label from "../../components/Label/Label";
import Input from "../../components/input/Input";
import Field from "../../components/field/Field";
import Button from "../../components/button/Button";
import ImageUpload from "../../components/image/ImageUpload";
import { useForm } from "react-hook-form";
import { Dropdown } from "../../components/dropdown";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";

const PostAddNew = () => {
  //*title
  useEffect(() => {
    document.title = "Monkey Blogging - Add new post";
  });
  const { userInfo } = useAuth();
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: "approved",
      categoryId: "",
      hot: false,
      image: "",
    },
  });
  const {
    image,
    setImage,
    progress,
    setProgress,
    handleDeleteImage,
    handleSelectImage,
  } = useFirebaseImage(setValue, getValues);
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const addPostHandler = async (values) => {
    try {
      //*upload slug using slugify
      values.slug = slugify(values.slug || values.title, { lower: true });
      values.status = values.status;
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...values,
        image,
        userId: userInfo.uid,
        createAt: serverTimestamp(),
      });
      setLoading(true);
      toast.success("Create new post successfully");
      console.log(values);
      reset({
        title: "",
        slug: "",
        status: "approved",
        categoryId: "",
        hot: false,
        image: "",
      });
      setLoading(false);
      setSelectCategory(null);
      setImage("");
      setProgress(0);
    } catch (err) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //*get category
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", "approved"));
      const querySnapshot = await getDocs(q);
      let results = [];
      querySnapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(results);
    }
    getData();
  }, []);
  const handleClickOption = (item) => {
    setValue("categoryId", item.id);
    setSelectCategory(item);
  };
  return (
    <div className="mb-24 post-add-new">
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 text-sm font-medium rounded bg-gradient-to-r from-primary to-secondary">
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Feature Post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={watchStatus === "approved"}
                onClick={() => setValue("status", "approved")}
                value="approved"
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === "pending"}
                onClick={() => setValue("status", "pending")}
                value="pending"
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === "reject"}
                onClick={() => setValue("status", "reject")}
                value="reject"
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          moreClass="mx-auto max-w-[250px]"
          isLoading={loading}
          disabled={loading}
        >
          Add new post
        </Button>
      </form>
    </div>
  );
};

export default PostAddNew;
