"use client";
import React from "react";
import GlobalImgUpload from "../category/global-img-upload";
import FormFieldTwo from "../brand/form-field-two";
import Tags from "../products/add-product/tags";
import RichTextEditor from "./rich-text-editor";
import useBlogSubmit from "@/hooks/useBlogSubmit";
import ErrorMsg from "../common/error-msg";

const AddBlog = () => {
  const {
    register,
    handleSubmit,
    errors,
    control,
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
    handleSubmitBlog,
  } = useBlogSubmit();

  const handleChange = (value: string | number | undefined) => {
    setStatus(value as string);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitBlog)}>
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            <h4 className="text-[22px]">General</h4>
            <FormFieldTwo
              register={register}
              errors={errors}
              name="Title"
              isReq={true}
            />
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-0 text-base text-black">Excerpt</p>
            <textarea
              {...register("excerpt")}
              name="excerpt"
              className="input w-full h-[140px] rounded-md border border-gray6 px-6 text-base text-black"
              placeholder="Short summary for the blog"
            />
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-0 text-base text-black mb-4">
              Content <span className="text-red">*</span>
            </p>
            <RichTextEditor
              control={control}
              name="content"
              errors={errors}
              placeholder="Write your blog content"
              required={true}
            />
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <h4 className="text-[22px]">SEO</h4>
            <FormFieldTwo
              register={register}
              errors={errors}
              name="MetaTitle"
              isReq={true}
            />
            <div className="mb-5">
              <p className="mb-0 text-base text-black">Meta Description</p>
              <textarea
                {...register("metadescription", { required: "Meta description is required!" })}
                name="metadescription"
                className="input w-full h-[140px] rounded-md border border-gray6 px-6 text-base text-black"
                placeholder="Short description for SEO"
              />
              <ErrorMsg msg={(errors?.metadescription?.message as string) || ""} />
            </div>
            <div className="mb-5">
              <p className="mb-0 text-base text-black">Meta Keywords</p>
              <Tags tags={seoKeywords} setTags={setSeoKeywords} />
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
          <div className="bg-white px-8 py-8 rounded-md mb-6 text-center">
            <p className="text-base text-black mb-4">Upload Image</p>
            <GlobalImgUpload
              isSubmitted={isSubmitted}
              setImage={setImage}
              image={image}
              setIsSubmitted={setIsSubmitted}
            />
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-5 text-base text-black">Tags</p>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
              <Tags tags={tags} setTags={setTags} />
            </div>
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-5 text-base text-black">Status</p>
            <select
              onChange={(e) => handleChange(e.target.value)}
              className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
              defaultValue={status}
            >
              <option value="Show">Show</option>
              <option value="Hide">Hide</option>
            </select>
          </div>
        </div>
      </div>
      <button className="tp-btn px-5 py-2 mt-5" type="submit">Submit Blog</button>
    </form>
  );
};

export default AddBlog;