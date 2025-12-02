"use client";
import React, { useState, useEffect } from "react";
import FormFieldTwo from "../brand/form-field-two";
import usePortfolioSubmit from "@/hooks/usePortfolioSubmit";
import { useGetPortfolioQuery } from "@/redux/portfolio/portfolioApi";
import Loading from "../common/loading";
import ErrorMsg from "../common/error-msg";
import ReactSelect from "react-select";
import useUploadImage from "@/hooks/useUploadImg";
import Image from "next/image";

const EditPortfolio = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    errors,
    status,
    setStatus,
    setValue,
    handleSubmitEditPortfolio,
  } = usePortfolioSubmit();

  const { data: portfolio, isError, isLoading } = useGetPortfolioQuery(id);
  const [imgUrl, setImgUrl] = useState<string>("");
  const { handleImageUpload, uploadData, isLoading: imageLoading } = useUploadImage();

  useEffect(() => {
    if (portfolio) {
      setValue("name", portfolio.name);
      setValue("number", portfolio.number);
      setValue("description", portfolio.description);
      setValue("order", portfolio.order?.toString() || "0");
      setValue("image", portfolio.image);
      setStatus(portfolio.status);
      setImgUrl(portfolio.image);
    }
  }, [portfolio, setValue, setStatus]);

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

  let content = null;
  if (isLoading) content = <Loading loading={isLoading} spinner="bar" />;
  if (!portfolio && isError) content = <ErrorMsg msg="There was an error" />;
  if (portfolio && !isError) {
    content = (
      <form onSubmit={handleSubmit((data) => handleSubmitEditPortfolio(data, id))}>
        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
            <div className="mb-6 bg-white px-8 py-8 rounded-md">
              <h4 className="text-[22px] mb-4">General Information</h4>
              <FormFieldTwo
                register={register}
                errors={errors}
                name="Name"
                isReq={true}
                default_val={portfolio.name}
              />
              <FormFieldTwo
                register={register}
                errors={errors}
                name="Number"
                isReq={true}
                default_val={portfolio.number}
              />
            </div>

            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <p className="mb-0 text-base text-black mb-2">Description</p>
              <textarea
                {...register("description", { required: true })}
                name="description"
                className="input w-full h-[200px] rounded-md border border-gray6 px-6 text-base text-black"
                placeholder="Enter the portfolio description"
                defaultValue={portfolio.description}
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
                  defaultValue={statusOptions.find(opt => opt.value === portfolio.status) || statusOptions[0]}
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
                  default_val={portfolio.order?.toString() || "0"}
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
            Update Portfolio
          </button>
        </div>
      </form>
    );
  }

  return <div>{content}</div>;
};

export default EditPortfolio;

