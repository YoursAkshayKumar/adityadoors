"use client";
import React, { useEffect } from "react";
import FormFieldTwo from "../brand/form-field-two";
import useCarouselSubmit from "@/hooks/useCarouselSubmit";
import { useGetCarouselQuery } from "@/redux/carousel/carouselApi";
import Loading from "../common/loading";
import ErrorMsg from "../common/error-msg";
import ReactSelect from "react-select";
import useUploadImage from "@/hooks/useUploadImg";

const EditCarousel = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    errors,
    status,
    setStatus,
    setValue,
    handleSubmitEditCarousel,
    img,
    setImg,
    backgroundImg,
    setBackgroundImg,
  } = useCarouselSubmit();

  const { data: carousel, isError, isLoading } = useGetCarouselQuery(id);

  const {
    handleImageUpload: handleMainImageUpload,
    uploadData: mainUploadData,
    isError: mainIsError,
    isLoading: mainIsLoading,
  } = useUploadImage();

  const {
    handleImageUpload: handleBgImageUpload,
    uploadData: bgUploadData,
    isError: bgIsError,
    isLoading: bgIsLoading,
  } = useUploadImage();

  useEffect(() => {
    if (carousel) {
      setValue("title", carousel.title);
      setValue("subtitle", carousel.subtitle);
      setValue("description", carousel.description);
      setValue("order", carousel.order?.toString() || "0");
      setValue("link", carousel.link || "");
      setValue("buttonText", carousel.buttonText || "READ MORE");
      setStatus(carousel.status);
      setImg(carousel.image);
      setBackgroundImg(carousel.backgroundImage || carousel.image);
    }
  }, [carousel, setValue, setStatus, setImg, setBackgroundImg]);

  useEffect(() => {
    if (mainUploadData && !mainIsError) {
      setImg(mainUploadData.data.url);
    }
  }, [mainUploadData, mainIsError, setImg]);

  useEffect(() => {
    if (bgUploadData && !bgIsError) {
      setBackgroundImg(bgUploadData.data.url);
    }
  }, [bgUploadData, bgIsError, setBackgroundImg]);

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const handleChange = (value: string | undefined) => {
    setStatus((value || "active") as "active" | "inactive");
  };

  let content = null;
  if (isLoading) content = <Loading loading={isLoading} spinner="bar" />;
  if (!carousel && isError)
    content = <ErrorMsg msg="There was an error" />;
  if (carousel && !isError) {
    content = (
      <form
        onSubmit={handleSubmit((data) => handleSubmitEditCarousel(data, id))}
      >
        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
            <div className="mb-6 bg-white px-8 py-8 rounded-md">
              <h4 className="text-[22px] mb-4">Carousel Information</h4>
              <FormFieldTwo
                register={register}
                errors={errors}
                name="Title"
                isReq={true}
                default_val={carousel.title}
              />
              <FormFieldTwo
                register={register}
                errors={errors}
                name="Subtitle"
                isReq={true}
                default_val={carousel.subtitle}
              />
              <div className="mb-5">
                <p className="mb-0 text-base text-black mb-2">Description</p>
                <textarea
                  {...register("description", { required: true })}
                  name="description"
                  className="input w-full h-[150px] rounded-md border border-gray6 px-6 text-base text-black"
                  placeholder="Enter carousel description"
                  defaultValue={carousel.description}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    Description is required
                  </span>
                )}
              </div>
              <FormFieldTwo
                register={register}
                errors={errors}
                name="Link"
                isReq={false}
                default_val={carousel.link || ""}
              />
              <FormFieldTwo
                register={register}
                errors={errors}
                name="Button Text"
                isReq={false}
                default_val={carousel.buttonText || "READ MORE"}
              />
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <h4 className="text-[22px] mb-4">Settings</h4>
              <div className="mb-5">
                <p className="mb-0 text-base text-black mb-2">Status</p>
                <ReactSelect
                  options={statusOptions}
                  defaultValue={
                    statusOptions.find((opt) => opt.value === carousel.status) ||
                    statusOptions[0]
                  }
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
                  default_val={carousel.order?.toString() || "0"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-12 md:col-span-6">
            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <p className="text-base text-black mb-2 font-semibold">Main Image</p>
              <p className="text-sm text-gray-600 mb-4">
                Recommended size: <span className="font-semibold">800x600px</span> or <span className="font-semibold">1200x900px</span>
                <br />
                Format: JPG, PNG, WebP
              </p>
              <div className="text-center flex items-center justify-center mb-4">
                {mainIsLoading ? (
                  <div className="text-center py-8">Uploading...</div>
                ) : mainUploadData && !mainIsError ? (
                  <div className="relative">
                    <img
                      src={mainUploadData.data.url}
                      alt="Main carousel image"
                      className="max-w-full h-auto max-h-[300px] rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setImg("")}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : img ? (
                  <div className="relative">
                    <img
                      src={img}
                      alt="Main carousel image"
                      className="max-w-full h-auto max-h-[300px] rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setImg("")}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>No image uploaded</p>
                  </div>
                )}
              </div>
              <input
                onChange={handleMainImageUpload}
                type="file"
                name="image"
                id="carousel_img"
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="carousel_img"
                className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
              >
                {mainIsLoading ? "Uploading..." : "Upload Main Image"}
              </label>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <p className="text-base text-black mb-2 font-semibold">Background Image (Optional)</p>
              <p className="text-sm text-gray-600 mb-4">
                Recommended size: <span className="font-semibold">1920x1080px</span> or <span className="font-semibold">1920x800px</span>
                <br />
                Format: JPG, PNG, WebP
              </p>
              <div className="text-center flex items-center justify-center mb-4">
                {bgIsLoading ? (
                  <div className="text-center py-8">Uploading...</div>
                ) : bgUploadData && !bgIsError ? (
                  <div className="relative">
                    <img
                      src={bgUploadData.data.url}
                      alt="Background carousel image"
                      className="max-w-full h-auto max-h-[300px] rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setBackgroundImg("")}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : backgroundImg ? (
                  <div className="relative">
                    <img
                      src={backgroundImg}
                      alt="Background carousel image"
                      className="max-w-full h-auto max-h-[300px] rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => setBackgroundImg("")}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>No image uploaded</p>
                  </div>
                )}
              </div>
              <input
                onChange={handleBgImageUpload}
                type="file"
                name="backgroundImage"
                id="carousel_bg_img"
                accept="image/*"
                className="hidden"
              />
              <label
                htmlFor="carousel_bg_img"
                className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
              >
                {bgIsLoading
                  ? "Uploading..."
                  : "Upload Background Image (Optional)"}
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 px-8">
          <button
            type="submit"
            className="tp-btn px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Carousel
          </button>
        </div>
      </form>
    );
  }

  return <div>{content}</div>;
};

export default EditCarousel;

