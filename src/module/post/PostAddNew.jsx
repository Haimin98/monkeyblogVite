import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import Field from "../../components/field/Field";
import Label from "../../components/Label/Label";
import Input from "../../components/input/Input";
import Radio from "../../components/checkbox/Radio";
import Button from "../../components/button/Button";
import Dropdown from "../../components/dropdown/Dropdown";
import Option from "../../components/dropdown/Option";
import Search from "../../components/dropdown/Search";
import ImageUpload from "../../components/image/ImageUpload";
Dropdown.Option = Option;
Dropdown.Search = Search;

const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: "pending",
      category: "",
    },
  });
  const watchStatus = watch("status");
  const watchCategory = watch("category");
  // console.log("PostAddNew ~ watchCategory", watchCategory);
  const addPostHandler = async (values) => {
    //*upload slug using slugify
    values.slug = slugify(values.slug || values.title, { lower: true });
    console.log(values);
    //*upload image
    // handleUploadImage(values.image);
  };
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");

  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progressPercent, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        console.log("Upload is " + progressPercent + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing");
        }
      },
      (error) => {
        console.log("error");
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };
  const onSelectImage = (e) => {
    // e.preventDefault();
    // console.log(e.target.files);
    const file = e.target.files[0];
    // console.log(file?.name);
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };
  //delete image
  const handleDeleteImage = () => {
    const storage = getStorage();
    const imageRef = ref(storage, "images/" + getValues("image_name"));
    deleteObject(imageRef)
      .then(() => {
        console.log("delete image successfully");
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        console.log("Can't delete image", error);
      });
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
              onChange={onSelectImage}
              handleDeleteImage={handleDeleteImage}
              progress={progress}
              image={image}
            ></ImageUpload>
            {/* <input type="file" name="image" onChange={onSelectImage} /> */}
            {/* <Input
              control={control}
              type="file"
              name="image"
              // accept="image/*"
              onChange={handleUploadImage}
            ></Input> */}
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
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Option>Knowledge</Dropdown.Option>
              <Dropdown.Option>Blockchain</Dropdown.Option>
              <Dropdown.Option>Setup</Dropdown.Option>
              <Dropdown.Option>Nature</Dropdown.Option>
              <Dropdown.Option>Developer</Dropdown.Option>
            </Dropdown>
          </Field>
          <Field></Field>
        </div>
        <Button type="submit" moreClass="mx-auto max-w-[250px]">
          Add new post
        </Button>
      </form>
    </div>
  );
};

export default PostAddNew;
