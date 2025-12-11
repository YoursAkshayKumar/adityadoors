"use client";
import React from "react";
import { useEffect, useRef } from "react";
import useProductSubmit from "@/hooks/useProductSubmit";
import ErrorMsg from "../../common/error-msg";
import FormField from "../form-field";
import DescriptionTextarea from "../add-product/description-textarea";
import { useGetProductQuery } from "@/redux/product/productApi";
import ProductTypeBrand from "../add-product/product-type-brand";
import ProductVariants from "../add-product/product-variants";
import ProductImgUpload from "../add-product/product-img-upload";
import ProductCategory from "../../category/product-category";
import Features from "../add-product/features";
import Specifications, { SpecificationsRef } from "../add-product/specifications";

const EditProductSubmit = ({ id }: { id: string }) => {
  const { data: product, isError, isLoading } = useGetProductQuery(id);
  const specificationsRef = useRef<SpecificationsRef>(null);
  
  const {
    handleSubmit,
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
    handleEditProduct,
    features,
    setFeatures,
    specifications,
    setSpecifications,
  } = useProductSubmit();

  // Initialize all state when product loads
  useEffect(() => {
    if (product) {
      // Initialize image
      if (product.image) {
        setImg(product.image);
      }
      // Initialize related images
      if (product.relatedImages && product.relatedImages.length > 0) {
        setRelatedImages(product.relatedImages);
      }
      // Initialize colors
      if (product.colors && product.colors.length > 0) {
        setColors(product.colors);
      }
      // Initialize brand
      if (product.brand) {
        setBrand(product.brand);
      }
      // Initialize features
      if (product.features && Array.isArray(product.features)) {
        setFeatures(product.features);
      }
      // Initialize specifications
      if (product.specifications && Array.isArray(product.specifications)) {
        setSpecifications(product.specifications);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && product) {
    content = (
      <form onSubmit={(e) => {
        e.preventDefault();
        // Force add any pending specification before submission
        specificationsRef.current?.handleAddSpecification();
        handleSubmit((data) => handleEditProduct(data, id))(e);
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
                defaultValue={product.title}
              />
              <FormField
                title="slug"
                isRequired={false}
                placeHolder="Auto-generated from title (optional)"
                bottomTitle="Leave blank to auto-generate from title."
                defaultValue={product.slug}
                register={register}
                errors={errors}
              />
              <DescriptionTextarea
                register={register}
                errors={errors}
                defaultValue={product.description}
              />
            </div>

            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <h4 className="text-[18px] mb-4">Product Options</h4>

              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={Boolean(product.isOnSale)}
                    {...register("isOnSale")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-black">On Sale</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={Boolean(product.isPopular)}
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
              default_value={product.relatedImages}
            />
            {/* product variations end */}

            {/* Product Features */}
            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <h4 className="text-[22px] mb-4">Product Features</h4>
              <Features
                features={features}
                setFeatures={setFeatures}
                default_value={product.features}
              />
            </div>

            {/* Product Specifications */}
            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <h4 className="text-[22px] mb-4">Product Specifications</h4>
              <Specifications
                ref={specificationsRef}
                specifications={specifications}
                setSpecifications={setSpecifications}
                default_value={product.specifications}
              />
            </div>
          </div>

          {/* right side */}
          <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
            <ProductImgUpload
              imgUrl={img}
              setImgUrl={setImg}
              default_img={product.image}
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
                  default_value={
                    product.category && product.category.name && product.category.id
                      ? {
                          parent: product.category.name,
                          id: product.category.id,
                          children: product.children || "",
                        }
                      : undefined
                  }
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
  }

  return <>{content}</>;
};

export default EditProductSubmit;
