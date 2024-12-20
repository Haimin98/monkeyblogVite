import React, {useEffect} from 'react';
import DashboardHeading from "../dashboard/DashboardHeading.jsx";
import ImageUpload from "../../components/image/ImageUpload.jsx";
import Field from "../../components/field/Field.jsx";
import Label from "../../components/Label/Label.jsx";
import Input from "../../components/input/Input.jsx";
import FieldCheckboxes from "../../components/field/FieldCheckboxes.jsx";
import Radio from "../../components/checkbox/Radio.jsx";
import Button from "../../components/button/Button.jsx";
import {useForm} from "react-hook-form";
import {useSearchParams} from "react-router-dom";
import {db} from "../../firebase/firebase-config.jsx";
import {doc, getDoc, updateDoc} from "firebase/firestore"
import {toast} from "react-toastify";
import useFirebaseImage from "../../hooks/useFirebaseImage.jsx";
import Textarea from "../../components/textarea/Textarea.jsx";
import InputPasswordToggle from "../../components/input/InputPasswordToggle.jsx";


const UserUpdate = () => {
    const {control, handleSubmit, reset, watch, getValues, setValue, formState: {isSubmitting, isValid}} = useForm({
        mode: "onChange"
    })
    const handleUpdateUser = async (values) => {
        try {
            const colRef = doc(db, "users", userId);
            await updateDoc(colRef, {
                ...values,
                avatar: image,
            })
            toast.success("Update user successfully");
        } catch (e) {
            toast.error("Update user failed");
        }
    }
    const imageUrl = getValues("avatar");
    const imageNameTest = /%2F(\S+)\?/gm.exec(imageUrl);
    const image_name = imageNameTest ? imageNameTest[1] : "not found";

    // console.log(image_name);

    async function deleteAvatar() {
        const colRef = doc(db, "users", userId);
        await updateDoc(colRef, {
            avatar: "",
        })
    }

    const {
        image,
        setImage,
        progress,
        setProgress,
        handleDeleteImage,
        handleSelectImage,
    } = useFirebaseImage(setValue, getValues, image_name, deleteAvatar);
    const [params] = useSearchParams();
    const userId = params.get("id");
    const watchStatus = watch("status");
    const watchRole = watch("role");

    useEffect(() => {
        setImage(imageUrl);
    }, [imageUrl, setImage]);
    useEffect(() => {
        if (!userId) return null;

        async function fetchData() {
            if (!userId) return;
            const colRef = doc(db, "users", userId);
            const docData = await getDoc(colRef);
            reset(docData && docData.data());
            // console.log(docData.data())
        }

        fetchData();
    }, [userId, reset]);

    return (
        <div>
            <div>
                <DashboardHeading
                    title="Update user"
                    desc="Update user information"
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
                <form onSubmit={handleSubmit(handleUpdateUser)}>
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
                            <InputPasswordToggle
                                name="password"
                                placeholder="Enter your password"
                                control={control}
                                type="password"
                            ></InputPasswordToggle>
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
                    <div className="form-layout">
                        <Field>
                            <Label>Description</Label>
                            <Textarea name="description" control={control}></Textarea>
                        </Field>
                    </div>
                    <Button type="submit" kind="primary" moreClass="mx-auto max-w-[200px]" disabled={isSubmitting}
                            isLoading={isSubmitting}>
                        Update user
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default UserUpdate;