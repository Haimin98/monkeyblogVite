// eslint-disable-next-line no-unused-vars
import React from "react";
import {useForm} from "react-hook-form";
import DashboardHeading from "../dashboard/DashboardHeading";
import Field from "../../components/field/Field";
import Label from "../../components/Label/Label";
import Input from "../../components/input/Input";
import Radio from "../../components/checkbox/Radio";
import Button from "../../components/button/Button";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import ImageUpload from "../../components/image/ImageUpload";
import useFirebaseImage from "../../hooks/useFirebaseImage.jsx";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../firebase/firebase-config.jsx";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import slugify from "slugify";
import {toast} from "react-toastify";

const UserAddNew = () => {
    const {control, handleSubmit, setValue, watch, getValues, reset, formState: {isValid, isSubmitting}} = useForm({
        mode: "onChange",
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            username: "",
            avatar: "",
            status: "ACTIVE",
            role: "USER",
            createAt: new Date(),
        }
    });
    const handleCreateUser = async (values) => {
        if (!isValid) return;
        try {
            await createUserWithEmailAndPassword(auth, values.email, values.password);
            await addDoc(collection(db, "users"), {
                fullname: values.fullname,
                email: values.email,
                password: values.password,
                username: slugify(values.fullname || values.username, {lower: true, replacement: " ", trim: true}),
                avatar: image,
                status: values.status,
                role: values.role,
                createAt: serverTimestamp(),
            })
            toast.success(`Create user ${values.fullname} success!`);
            reset(
                {
                    fullname: "",
                    email: "",
                    password: "",
                    username: "",
                    avatar: "",
                    status: "ACTIVE",
                    role: "USER",
                    createAt: new Date(),
                })
            setImage("");
            setProgress(0);
        } catch (error) {
            console.log(error);
            toast.error("Create user fail! Please try again!");
        }

    }
    const watchStatus = watch("status");
    const watchRole = watch("role")
    //* add user avatar
    const {
        image,
        setImage,
        progress,
        setProgress,
        handleDeleteImage,
        handleSelectImage,
    } = useFirebaseImage(setValue, getValues);
    return (
        <div>
            <DashboardHeading
                title="New user"
                desc="Add new user to system"
            ></DashboardHeading>
            <div className="w-[200px] h-[200px] rounded-full mx-auto">
                <ImageUpload
                    className="!rounded-full h-full"
                    image={image}
                    onChange={handleSelectImage}
                    handleDeleteImage={handleDeleteImage}
                    progress={progress}>
                </ImageUpload>
            </div>
            <form onSubmit={handleSubmit(handleCreateUser)}>
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
                        <Label>Password</Label>
                        <Input
                            name="password"
                            placeholder="Enter your password"
                            control={control}
                            type="password"
                        ></Input>
                    </Field>
                </div>
                <div className="form-layout">
                    <Field>
                        <Label>Status</Label>
                        <FieldCheckboxes>
                            <Radio name="status" control={control} checked={watchStatus === "ACTIVE"}
                                   value="ACTIVE">
                                Active
                            </Radio>
                            <Radio name="status" control={control} checked={watchStatus === "PENDING"}
                                   value="PENDING">
                                Pending
                            </Radio>
                            <Radio name="status" control={control} checked={watchStatus === "BAN"}
                                   value="BAN">
                                Banned
                            </Radio>
                        </FieldCheckboxes>
                    </Field>
                    <Field>
                        <Label>Role</Label>
                        <FieldCheckboxes>
                            <Radio name="role" control={control} checked={watchRole === "ADMIN"}
                                   value="ADMIN">
                                Admin
                            </Radio>
                            <Radio name="role" control={control} checked={watchRole === "MOD"}
                                   value="MOD">
                                Moderator
                            </Radio>
                            <Radio name="role" control={control} checked={watchRole === "USER"}
                                   value="USER">
                                User
                            </Radio>
                        </FieldCheckboxes>
                    </Field>
                </div>
                <Button type="submit" kind="primary" moreClass="mx-auto max-w-[200px]" disabled={isSubmitting}
                        isLoading={isSubmitting}>
                    Add new user
                </Button>
            </form>
        </div>
    );
};

export default UserAddNew;
