import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import Field from "../../components/field/Field";
import Label from "../../components/Label/Label";
import Input from "../../components/input/Input";
import Radio from "../../components/checkbox/Radio";
import Button from "../../components/button/Button";
import { Dropdown } from "../../components/dropdown";
import ImageUpload from "../../components/image/ImageUpload";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import Toggle from "../../components/toggle/Toggle";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: "approved",
      categoryId: "",
      hot: false,
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const [categories, setCategories] = useState([]);
  const addPostHandler = async (values) => {
    //*upload slug using slugify
    values.slug = slugify(values.slug || values.title, { lower: true });
    values.status = values.status;
    console.log(values);
    //*upload image
    // handleUploadImage(values.image);
  };
  const { image, progress, handleDeleteImage, handleSelectImage } =
    useFirebaseImage(setValue, getValues);
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
          <Field>
            <Label>Author</Label>
            <Input
              control={control}
              placeholder="Find the author"
              name="author"
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
                      onClick={() => setValue("categoryId", item.id)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
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
        <Button type="submit" moreClass="mx-auto max-w-[250px]">
          Add new post
        </Button>
      </form>
    </div>
  );
};

export default PostAddNew;
