"use client";
import React, { useEffect } from "react";
import GlobalImgUpload from "../category/global-img-upload";
import FormFieldTwo from "../brand/form-field-two";
import Tags from "../products/add-product/tags";
import useBlogSubmit from "@/hooks/useBlogSubmit";
import { useGetBlogQuery } from "@/redux/blog/blogApi";
import Loading from "../common/loading";
import ErrorMsg from "../common/error-msg";

const EditBlog = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    errors,
    image,
    setImage,
    isSubmitted,
    setIsSubmitted,
    tags,
    setTags,
    seoKeywords,
    setSeoKeywords,
    status,
    setStatus,
    setValue,
    handleSubmitEditBlog,
  } = useBlogSubmit();

  const { data: blog, isError, isLoading } = useGetBlogQuery(id);

  useEffect(() => {
    if (blog) {
      if (blog.metaTitle) setValue("metatitle", blog.metaTitle);
      if (blog.metaDescription) setValue("metadescription", blog.metaDescription);
      if (blog.metaKeywords && Array.isArray(blog.metaKeywords)) {
        setSeoKeywords(blog.metaKeywords);
      }
    }
  }, [blog, setValue, setSeoKeywords]);

  const handleChange = (value: string | number | undefined) => {
    setStatus(value as string);
  };

  let content = null;
  if (isLoading) content = <Loading loading={isLoading} spinner="bar" />;
  if (!blog && isError) content = <ErrorMsg msg="There was an error" />;
  if (blog && !isError) {
    content = (
      <form onSubmit={handleSubmit((data) => handleSubmitEditBlog(data, id))}>
        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
            <div className="mb-6 bg-white px-8 py-8 rounded-md">
              <h4 className="text-[22px]">General</h4>
              <FormFieldTwo
                register={register}
                errors={errors}
                name="Title"
                isReq={true}
                default_val={blog.title}
              />
            </div>

            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <p className="mb-0 text-base text-black">Excerpt</p>
              <textarea
                {...register("excerpt")}
                name="excerpt"
                className="input w-full h-[140px] rounded-md border border-gray6 px-6 text-base text-black"
                placeholder="Short summary for the blog"
                defaultValue={blog.excerpt}
              />
            </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-0 text-base text-black">Content</p>
            <textarea
              {...register("content", { required: true })}
              name="content"
              className="input w-full h-[300px] rounded-md border border-gray6 px-6 text-base text-black"
              placeholder="Write your blog content"
              defaultValue={blog.content}
            />
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <h4 className="text-[22px]">SEO</h4>
            <FormFieldTwo
              register={register}
              errors={errors}
              name="MetaTitle"
              isReq={true}
              default_val={blog.metaTitle}
            />
            <div className="mb-5">
              <p className="mb-0 text-base text-black">Meta Description</p>
              <textarea
                {...register("metadescription", { required: true })}
                name="metadescription"
                className="input w-full h-[140px] rounded-md border border-gray6 px-6 text-base text-black"
                placeholder="Short description for SEO"
                defaultValue={blog.metaDescription}
              />
            </div>
            <div className="mb-5">
              <p className="mb-0 text-base text-black">Meta Keywords</p>
              <Tags tags={seoKeywords} setTags={setSeoKeywords} default_value={blog.metaKeywords} />
            </div>
          </div>
        </div>

          <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
            <div className="bg-white px-8 py-8 rounded-md mb-6 text-center">
              <p className="text-base text-black mb-4">Upload Image</p>
              <GlobalImgUpload
                isSubmitted={isSubmitted}
                setImage={setImage}
                default_img={blog.image}
                setIsSubmitted={setIsSubmitted}
              />
            </div>

            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <p className="mb-5 text-base text-black">Tags</p>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
                <Tags tags={tags} setTags={setTags} default_value={blog.tags} />
              </div>
            </div>

            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <p className="mb-5 text-base text-black">Status</p>
              <select
                onChange={(e) => handleChange(e.target.value)}
                className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
                defaultValue={blog.status}
              >
                <option value="Show">Show</option>
                <option value="Hide">Hide</option>
              </select>
            </div>
          </div>
        </div>
        <button className="tp-btn px-5 py-2 mt-5" type="submit">Update Blog</button>
      </form>
    );
  }

  return content;
};

export default EditBlog;