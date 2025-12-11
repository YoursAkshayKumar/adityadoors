"use client";
import React, { useRef } from "react";
import useProductSubmit from "@/hooks/useProductSubmit";
import DescriptionTextarea from "./description-textarea";
import OfferDatePicker from "./offer-date-picker";
import ProductTypeBrand from "./product-type-brand";
import AdditionalInformation from "./additional-information";
import ProductVariants from "./product-variants";
import ProductImgUpload from "./product-img-upload";
import ProductCategory from "../../category/product-category";
import FormField from "../form-field";
import Colors from "./colors";
import Features from "./features";
import Specifications, { SpecificationsRef } from "./specifications";

const ProductSubmit = () => {
  const specificationsRef = useRef<SpecificationsRef>(null);
  
  const {
    handleSubmit,
    handleSubmitProduct,
    register,
    errors,
    control,
    setCategory,
    setParent,
    setChildren,
    setImg,
    img,
    setBrand,
    isSubmitted,
    relatedImages,
    setRelatedImages,
    setColors,
    colors,
    features,
    setFeatures,
    specifications,
    setSpecifications,
  } = useProductSubmit();

  console.log("related image", relatedImages);
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // Force add any pending specification before submission
      specificationsRef.current?.handleAddSpecification();
      handleSubmit(handleSubmitProduct)(e);
    }}>
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* left side */}
        <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            <h4 className="text-[22px]">General</h4>
            <FormField
              title="title"
              isRequired={true}
              placeHolder="Product Title"
              register={register}
              errors={errors}
            />
            <FormField
              title="slug"
              isRequired={false}
              placeHolder="Auto-generated from title (optional)"
              bottomTitle="Leave blank to auto-generate from title."
              register={register}
              errors={errors}
            />
            <DescriptionTextarea register={register} errors={errors} />
          </div>

           <div className="bg-white px-8 py-8 rounded-md mb-6">
              <h4 className="text-[18px] mb-4">Product Options</h4>

              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("isOnSale")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-black">On Sale</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("isPopular")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-black">Popular Product</span>
                </label>
              </div>
            </div>

          {/* product variations start */}
          <ProductVariants
            isSubmitted={isSubmitted}
            setImageURLs={setRelatedImages}
            relatedImages={relatedImages}
          />
          {/* product variations end */}

          {/* Product Features */}
          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <h4 className="text-[22px] mb-4">Product Features</h4>
            <Features features={features} setFeatures={setFeatures} />
          </div>

          {/* Product Specifications */}
          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <h4 className="text-[22px] mb-4">Product Specifications</h4>
            <Specifications
              ref={specificationsRef}
              specifications={specifications}
              setSpecifications={setSpecifications}
            />
          </div>
        </div>

        {/* right side */}
        <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
          <ProductImgUpload
            imgUrl={img}
            setImgUrl={setImg}
            isSubmitted={isSubmitted}
          />

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-5 text-base text-black">Product Category</p>
            {/* category start */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
              <ProductCategory
                setCategory={setCategory}
                setParent={setParent}
                setChildren={setChildren}
              />
            </div>
          </div>

        </div>
      </div>
      <button className="tp-btn px-5 py-2 mt-5" type="submit">
        Submit Product
      </button>
    </form>
  );
};

export default ProductSubmit;
