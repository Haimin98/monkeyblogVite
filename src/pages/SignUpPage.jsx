import React, { useEffect } from "react";
import Label from "../components/Label/Label";
import Input from "../components/input/Input";
import { useForm } from "react-hook-form";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import Field from "../components/field/Field";
import Button from "../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import slugify from "slugify";
const schema = yup.object({
  fullName: yup.string().required("Please enter your full name"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("Email invalid"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "Your password must be at least 8 characters"),
  phone: yup.string().required("Please enter your phone number"),
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    // console.log(values);
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullName,
      photoURL:
        "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    });
    //* set data to firestore
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullName,
      email: values.email,
      password: values.password,
      username: slugify(values.fullName, { lower: true }),
      avatar:
        "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "ACTIVE",
      role: "USER",
      phone: values.phone,
      createAt: serverTimestamp(),
    });
    toast.success("Register successfully");
    navigate("/");
  };
  useEffect(() => {
    document.title = "Register Page";
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  return (
    <AuthenticationPage>
      <form
        className="max-w-[700px] mx-auto my-0 "
        onSubmit={handleSubmit(handleSignUp)}
      >
        <Field>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            control={control}
            type="text"
            name="fullName"
            placeholder="Enter your full name"
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            control={control}
            type="text"
            name="email"
            placeholder="Enter your email"
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="phone">Phone</Label>
          <Input
            control={control}
            type="text"
            name="phone"
            placeholder="Enter your phone number"
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>

        <div className="mb-5">
          Already have an account?{" "}
          <NavLink
            className="inline-block ml-2 cursor-pointer text-primary"
            to={"/sign-in"}
          >
            Sign In
          </NavLink>
        </div>
        <Button
          type={"submit"}
          kind={"primary"}
          style={{ maxWidth: 300, margin: "0 auto" }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
