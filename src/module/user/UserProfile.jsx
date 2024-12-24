import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DashboardHeading from "../dashboard/DashboardHeading";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import ImageUpload from "../../components/image/ImageUpload";
import Input from "../../components/input/Input";
import Label from "../../components/Label/Label";
import { useAuth } from "../../contexts/auth-context";
import InputPasswordToggle from "../../components/input/InputPasswordToggle";

import { db } from "../../firebase/firebase-config";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import Textarea from "../../components/textarea/Textarea";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  username: yup.string().required("Please enter your username"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("Email invalid"),
  phone: yup.string().required("Please enter your phone number"),
  description: yup.string(),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters")
    .nullable(),
});

const UserProfile = () => {
  const { userInfo } = useAuth();
  const [userId, setUserId] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const imageUrl = getValues("avatar");
  const imageNameTest = /%2F(\S+)\?/gm.exec(imageUrl);
  const image_name = imageNameTest ? imageNameTest[1] : "not found";

  const { image, setImage, progress, handleDeleteImage, handleSelectImage } =
    useFirebaseImage(setValue, getValues, image_name, deleteAvatar);

  async function deleteAvatar() {
    const colRef = doc(db, "users", "email");
    await updateDoc(colRef, {
      avatar: "",
    });
    toast.success("Delete avatar successfully");
  }
  //* get image data
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  //*get id and data current user
  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserId(doc.id);
        reset(doc.data()); //reset form
      });
    }
    fetchData();
  }, [userInfo.email, reset]);

  //* show error
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  //* update profile
  const handleUpdateProfile = async (values) => {
    try {
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      toast.success("Update profile successfully");
    } catch (error) {
      console.log(error);
      toast.error("Update profile failed");
    }
  };

  return (
    <div>
      <DashboardHeading
        title={`Update Profile ${userInfo.fullname}`}
        desc="Update your profile information"
      ></DashboardHeading>
      <div className="w-[200px] h-[200px] rounded-full mx-auto">
        <ImageUpload
          className="!rounded-full h-full"
          image={image}
          onChange={handleSelectImage}
          handleDeleteImage={handleDeleteImage}
          progress={progress}
        ></ImageUpload>
      </div>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Phone</Label>
            <Input
              name="phone"
              placeholder="Enter your phone number"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputPasswordToggle
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></InputPasswordToggle>
          </Field>
        </div>
        <div className="form-layout-textarea">
          <Field>
            <Label>Description</Label>
            <Textarea name="description" control={control}></Textarea>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          moreClass="mx-auto max-w-[200px]"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
