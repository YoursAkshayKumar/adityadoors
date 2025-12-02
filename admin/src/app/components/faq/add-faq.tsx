"use client";
import React from "react";
import FormFieldTwo from "../brand/form-field-two";
import useFAQSubmit from "@/hooks/useFAQSubmit";
import ReactSelect from "react-select";

const AddFAQ = () => {
  const {
    register,
    handleSubmit,
    errors,
    status,
    setStatus,
    setValue,
    handleSubmitFAQ,
  } = useFAQSubmit();

  const statusOptions = [
    { value: "Show", label: "Show" },
    { value: "Hide", label: "Hide" },
  ];

  const handleChange = (value: string | number | undefined) => {
    setStatus(value as string);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitFAQ)}>
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            <h4 className="text-[22px] mb-4">General Information</h4>
            <FormFieldTwo
              register={register}
              errors={errors}
              name="Question"
              isReq={true}
            />
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-0 text-base text-black mb-2">Answer</p>
            <textarea
              {...register("answer", { required: true })}
              name="answer"
              className="input w-full h-[200px] rounded-md border border-gray6 px-6 text-base text-black"
              placeholder="Enter the answer"
            />
            {errors.answer && (
              <span className="text-red-500 text-sm">Answer is required</span>
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
        </div>
      </div>

      <div className="flex justify-end gap-4 px-8">
        <button
          type="submit"
          className="tp-btn px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add FAQ
        </button>
      </div>
    </form>
  );
};

export default AddFAQ;

