"use client";
import React, { useState, useEffect } from "react";
import FormFieldTwo from "../brand/form-field-two";
import usePortfolioSubmit from "@/hooks/usePortfolioSubmit";
import ReactSelect from "react-select";
import useUploadImage from "@/hooks/useUploadImg";
import Image from "next/image";
import Loading from "../common/loading";

const AddPortfolio = () => {
  const {
    register,
    handleSubmit,
    errors,
    status,
    setStatus,
    setValue,
    handleSubmitPortfolio,
  } = usePortfolioSubmit();

  const [imgUrl, setImgUrl] = useState<string>("");
  const { handleImageUpload, uploadData, isLoading: imageLoading } = useUploadImage();

  useEffect(() => {
    if (uploadData && uploadData.data?.url) {
      setImgUrl(uploadData.data.url);
      setValue("image", uploadData.data.url);
    }
  }, [uploadData, setValue]);

  const statusOptions = [
    { value: "Show", label: "Show" },
    { value: "Hide", label: "Hide" },
  ];

  const handleChange = (value: string | number | undefined) => {
    setStatus(value as string);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitPortfolio)}>
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            <h4 className="text-[22px] mb-4">General Information</h4>
            <FormFieldTwo
              register={register}
              errors={errors}
              name="Name"
              isReq={true}
            />
            <FormFieldTwo
              register={register}
              errors={errors}
              name="Number"
              isReq={true}
            />
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-0 text-base text-black mb-2">Description</p>
            <textarea
              {...register("description", { required: true })}
              name="description"
              className="input w-full h-[200px] rounded-md border border-gray6 px-6 text-base text-black"
              placeholder="Enter the portfolio description"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">Description is required</span>
            )}
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <h4 className="text-[22px] mb-4">Settings</h4>
            <div className="mb-5">
              <p className="mb-0 text-base text-black mb-2">Status</p>
              <ReactSelect
                options={statusOptions}
                defaultValue={statusOptions[0]}
                onChange={(selected) => {
                  handleChange(selected?.value);
                }}
                className="react-select-input"
                classNamePrefix="react-select"
              />
            </div>
            <div className="mb-5">
              <FormFieldTwo
                register={register}
                errors={errors}
                name="Order"
                isReq={false}
                type="number"
              />
            </div>
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6 text-center">
            <p className="text-base text-black mb-4">Upload Image</p>
            <div className="text-center flex items-center justify-center mb-4">
              {imageLoading ? (
                <Loading loading={imageLoading} spinner="fade" />
              ) : imgUrl ? (
                <div className="relative">
                  <Image
                    src={imgUrl}
                    alt="Portfolio"
                    width={200}
                    height={200}
                    className="rounded-md border border-gray6"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 border-2 border-dashed border-gray6 rounded-md flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            <input
              type="hidden"
              {...register("image", { required: true })}
              value={imgUrl}
            />
            <div>
              <input
                onChange={handleImageUpload}
                type="file"
                name="image"
                id="portfolio_img"
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="portfolio_img"
                className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
              >
                Upload Image
              </label>
            </div>
            {errors.image && (
              <span className="text-red-500 text-sm mt-2 block">Image is required</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 px-8">
        <button
          type="submit"
          className="tp-btn px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Portfolio
        </button>
      </div>
    </form>
  );
};

export default AddPortfolio;

