"use client";

import Form from "../ui/Form";
import Input from "../ui/Input";
import { useEdgeStore } from "@/lib/edgestore";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { SingleImageDropzone } from "../ui/SingleImageDrop";
import { userTypes } from "@/types/userTypes";
import { createPost } from "@/actions/blogActions";
import { z } from "zod";

import {
  Controller,
  SubmitHandler,
  UseFormGetValues,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput } from "../ui/FormInput";
import Loader from "../ui/Loader";
import { useRouter } from "next/navigation";
import RTE from "../ui/RTE";
import { HtmlEditor } from "./HtmlEditor";
// import { Loader, Loader2Icon } from "lucide-react";

export interface IFormInput {
  image: string;
  title: string;
  description: string;
  category: string;
  email: string;
  // onChange?: any;
}
const CreateForm = ({ user }: { user: userTypes }) => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const uploadImageHandler = async () => {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
      });
      setImagePath(res.url);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await uploadImageHandler();
      } catch (error) {
        console.log("error while uploading image", error);
      }
    })();
  }, [file]);

  // console.log("img path is", imagePath);
  // console.log("file is", file);

  const schema = Yup.object().shape({
    image: Yup.string().required().default(imagePath),
    title: Yup.string()
      .min(3, "title must be min 3 chars")
      .required("title is required"),
    description: Yup.string()
      .min(10, "description must be min 10 chars")
      .required("description is required"),
    category: Yup.string().label("category").required("category is required"),
    email: Yup.string().email().required("email is required"),
  });
  //  const { control } = useFormContext<IFormInput>();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });
  const {
    field: { onChange, value, ...field },
  } = useController({
    name: "description",
    control,
  });

  // const onSubmit = (data: any) => console.log(data);
  async function handleFormSubmit(data: IFormInput) {
    console.log("form data:", data);

    setLoading(true);
    if (!data.image) {
      data.image = imagePath;
    }
    const post = await createPost(data);
    if (post) {
      setLoading(false);
      console.log("post server data :", post);
      reset();
      setFile(undefined);
      router.push("/");
    }
  }

  return (
    <div className="mt-8 mx-auto w-full max-w-3xl px-4">
      <div className="bg-white py-8 shadow rounded-lg px-10">
        <h1 className="text-center text-2xl font-extrabold mb-10">
          Create a Post ✍️
        </h1>
        {!user ? (
          <h2 className="text-center text-xl font-extrabold uppercase">
            Please Sign up or Log in to create a post!
          </h2>
        ) : (
          <>
            <SingleImageDropzone
              onChange={(file) => {
                setFile(file);
              }}
              width={200}
              height={200}
              value={file}
            />
            <form
              // action={createPost}
              className="flex flex-col gap-5 mt-5"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <input
                id="image"
                {...register("image")}
                type="hidden"
                value={imagePath}
              />
              <FormInput
                name="title"
                register={register}
                id="title"
                // label="Title"
                // error={errors.title}
                type="text"
                placeholder="Enter Title"
              />
              {errors.title && (
                <span className="text-red-600"> {errors.title.message} </span>
              )}
              <Controller
                name="description"
                control={control}
                rules={{
                  required: true,
                  minLength: 10,
                  maxLength: 200,
                }}
                defaultValue="Write here.."
                render={({ field: { onChange, value } }) => (
                  <HtmlEditor field={field} onChange={onChange} value={value} />
                )}
              />

              {/* <textarea
                // name="description"
                {...register("description")}
                rows={10}
                placeholder="Write Here..."
                className="text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 border w-full border-gray-200 p-2 rounded-md py-1.5"
              ></textarea> */}
              {errors.description && (
                <span className="text-red-600">
                  {" "}
                  {errors.description.message}{" "}
                </span>
              )}
              <select
                // name="category"
                {...register("category")}
                className="text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6 border w-full border-gray-200 p-2 rounded-md py-1.5"
              >
                <option value="" disabled selected>
                  Choose Tag
                </option>
                <option value="Adventure">Adventure</option>
                <option value="Culture">Culture</option>
                <option value="Journey">Journey</option>
                <option value="Discovery">Discovery</option>
                <option value="Wanderlust">Wanderlust</option>
              </select>
              {errors.category && (
                <span className="text-red-600">
                  {" "}
                  {errors.category.message}{" "}
                </span>
              )}

              <input
                // name="email"
                {...register("email")}
                type="hidden"
                value={user?.email || ""}
              />
              <span className=" w-full  flex justify-center gap-6">
                <Button
                  type="submit"
                  text={loading ? "Creating Post..." : "Create"}
                  aria="create blog"
                />
                {loading && <Loader />}
              </span>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateForm;
