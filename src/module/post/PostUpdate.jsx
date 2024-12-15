import React, {useEffect, useRef, useState} from 'react';
import DashboardHeading from "../dashboard/DashboardHeading.jsx";
import {useForm} from "react-hook-form";
import Field from "../../components/field/Field.jsx";
import Label from "../../components/Label/Label.jsx";
import Input from "../../components/input/Input.jsx";
import ImageUpload from "../../components/image/ImageUpload.jsx";
import {Dropdown} from "../../components/dropdown";
import Toggle from "../../components/toggle/Toggle.jsx";
import Radio from "../../components/checkbox/Radio.jsx";
import Button from "../../components/button/Button.jsx";
import useFirebaseImage from "../../hooks/useFirebaseImage.jsx";
import {useSearchParams} from "react-router-dom";
import {collection, doc, getDoc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "../../firebase/firebase-config.jsx";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {toast} from "react-toastify";


const PostUpdate = () => {
    const [params] = useSearchParams();
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState("");
    const [content, setContent] = useState("");
    const postId = params.get("id");

    const {
        handleSubmit, control, setValue, watch, reset, getValues, formState: {
            isValid, isSubmitting
        }
    } = useForm({
        mode: "onChange",
    })
    const watchHot = watch("hot");
    const watchStatus = watch("status");


    //* react-quill-upload
    const modules = {
        toolbar: {
            container: [
                [{header: "1"}, {header: "2"}, {font: []}],
                [{size: []}],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    {list: "ordered"},
                    {list: "bullet"},
                    {indent: "-1"},
                    {indent: "+1"},
                ],
                ["link", "image", "video"],
                ["code-block"],
                ["clean"],
            ],
        },
    }


    //*getCategories
    useEffect(() => {
        async function getCategoryPostData() {
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

        getCategoryPostData();
    }, []);
    //*getData
    useEffect(() => {
        async function fetchData() {
            if (!postId) return null;
            const docRef = doc(db, "posts", postId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.data()) {
                // console.log(docSnapshot.data())
                reset(docSnapshot.data());
                setSelectCategory(docSnapshot.data()?.category || "");
                setContent(docSnapshot.data()?.content || "");
            }
        }

        fetchData();
    }, [postId, reset])

    //*getImage

    const imageUrl = getValues("image");
    const imageName = getValues("image_name");
    const {
        image,
        setImage,
        progress,
        setProgress,
        handleDeleteImage,
        handleSelectImage,
    } = useFirebaseImage(setValue, getValues, imageName, deleteImagePost);


    async function deleteImagePost() {
        const colRef = doc(db, "posts", userId);
        await updateDoc(colRef, {
            image: "",
            image_name: "",
        })
    }

    useEffect(() => {
        setImage(imageUrl);
    }, [imageUrl, setImage]);

    //*selectCategory
    const handleClickOption = async (item) => {
        const colRef = doc(db, "categories", item.id);
        const docData = await getDoc(colRef);
        // console.log(docData.data())
        setValue("category", {
            id: docData.id,
            ...docData.data(),
        })
        setSelectCategory(item);
    };
    //*UpdatePost
    const updatePostHandler = async (values) => {
        if (!isValid) return;
        const docRef = doc(db, "posts", postId);
        await updateDoc(docRef, {
            ...values,
            content,
        });
        toast.success("Post successfully updated");
    }


    if (!postId) return null;
    return (
        <>
            <DashboardHeading title="Update post" desc="Edit post"></DashboardHeading>
            <form onSubmit={handleSubmit(updatePostHandler)}>
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
                            <span
                                className="inline-block p-3 text-sm font-medium rounded bg-gradient-to-r from-primary to-secondary">
                          {selectCategory?.name}
                        </span>
                        )}
                    </Field>
                </div>
                <div className="mb-10">
                    <Field>
                        <Label>Content</Label>
                        <div className={"w-full entry-content"}>
                            <ReactQuill modules={modules} theme="snow"
                                        value={content}

                                        onChange={setContent}/>
                        </div>
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
                    isLoading={isSubmitting}
                    disabled={isSubmitting}

                >
                    Update post
                </Button>
            </form>
        </>
    );
};

export default PostUpdate;