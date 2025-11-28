import { notifyError, notifySuccess } from "@/utils/toast";
import { useAddBlogMutation, useEditBlogMutation } from "@/redux/blog/blogApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import slugify from "slugify";

const useBlogSubmit = () => {
  const [image, setImage] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [seoKeywords, setSeoKeywords] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("Show");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();

  const [addBlog] = useAddBlogMutation();
  const [editBlog] = useEditBlogMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const handleSubmitBlog = async (data: any) => {
    try {
      const payload = {
        title: data?.title,
        slug: slugify(data?.title || "", { lower: true }),
        image,
        excerpt: data?.excerpt,
        content: data?.content,
        tags,
        status,
        metaTitle: data?.metatitle,
        metaKeywords: seoKeywords,
        metaDescription: data?.metadescription,
      };
      const res = await addBlog(payload);
      if ("error" in res && res.error) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Blog added successfully");
        setIsSubmitted(true);
        reset();
        setTags([]);
        setSeoKeywords([]);
        setImage("");
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  const handleSubmitEditBlog = async (data: any, id: string) => {
    try {
      const payload = {
        title: data?.title,
        slug: slugify(data?.title || "", { lower: true }),
        image,
        excerpt: data?.excerpt,
        content: data?.content,
        tags,
        status,
        metaTitle: data?.metatitle,
        metaKeywords: seoKeywords,
        metaDescription: data?.metadescription,
      };
      const res = await editBlog({ id, data: payload });
      if ("error" in res && res.error) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Blog update successfully");
        setIsSubmitted(true);
        router.push("/blogs-list");
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  return {
    register,
    handleSubmit,
    control,
    errors,
    image,
    setImage,
    tags,
    setTags,
    seoKeywords,
    setSeoKeywords,
    status,
    setStatus,
    isSubmitted,
    setIsSubmitted,
    setValue,
    handleSubmitBlog,
    handleSubmitEditBlog,
  };
};

export default useBlogSubmit;