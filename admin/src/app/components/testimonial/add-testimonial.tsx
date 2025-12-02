"use client";
import React from "react";
import FormFieldTwo from "../brand/form-field-two";
import useTestimonialSubmit from "@/hooks/useTestimonialSubmit";
import ReactSelect from "react-select";

const AddTestimonial = () => {
  const {
    register,
    handleSubmit,
    errors,
    status,
    setStatus,
    category,
    setCategory,
    setValue,
    handleSubmitTestimonial,
  } = useTestimonialSubmit();

  const statusOptions = [
    { value: "Show", label: "Show" },
    { value: "Hide", label: "Hide" },
  ];

  const ratingOptions = [
    { value: "1", label: "1 Star" },
    { value: "2", label: "2 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "5", label: "5 Stars" },
  ];

  const categoryOptions = [
    { value: 1, label: "Home Page" },
    { value: 2, label: "About Us" },
    { value: 3, label: "Both" },
  ];

  const handleChange = (value: string | number | undefined) => {
    setStatus(value as string);
  };

  const handleCategoryChange = (value: string | number | undefined) => {
    const numValue = typeof value === 'string' ? parseInt(value, 10) : (value || 1);
    setCategory([1, 2, 3].includes(numValue) ? numValue : 1);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitTestimonial)}>
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
              name="Role"
              isReq={true}
            />
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-0 text-base text-black mb-2">Quote/Testimonial</p>
            <textarea
              {...register("quote", { required: true })}
              name="quote"
              className="input w-full h-[200px] rounded-md border border-gray6 px-6 text-base text-black"
              placeholder="Enter the testimonial quote"
            />
            {errors.quote && (
              <span className="text-red-500 text-sm">Quote is required</span>
            )}
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <h4 className="text-[22px] mb-4">Settings</h4>
            <div className="mb-5">
              <p className="mb-0 text-base text-black mb-2">Rating</p>
              <ReactSelect
                options={ratingOptions}
                defaultValue={ratingOptions[4]}
                onChange={(selected) => {
                  setValue("rating", selected?.value || "5");
                }}
                className="react-select-input"
                classNamePrefix="react-select"
              />
            </div>
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
              <p className="mb-0 text-base text-black mb-2">Category/Type</p>
              <ReactSelect
                options={categoryOptions}
                defaultValue={categoryOptions[0]}
                onChange={(selected) => {
                  handleCategoryChange(selected?.value);
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
        </div>
      </div>

      <div className="flex justify-end gap-4 px-8">
        <button
          type="submit"
          className="tp-btn px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Testimonial
        </button>
      </div>
    </form>
  );
};

export default AddTestimonial;

