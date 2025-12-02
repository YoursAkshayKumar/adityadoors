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
import Tags from "../add-product/tags";
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
    tags,
    setTags,
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
      // Initialize tags
      if (product.tags && product.tags.length > 0) {
        setTags(product.tags);
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
              <DescriptionTextarea
                register={register}
                errors={errors}
                defaultValue={product.description}
              />
            </div>

            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6">
                <FormField
                  title="price"
                  isRequired={true}
                  placeHolder="Product price"
                  bottomTitle="Set the base price of product."
                  type="number"
                  defaultValue={product.price}
                  register={register}
                  errors={errors}
                />
                <FormField
                  title="sku"
                  isRequired={true}
                  placeHolder="SKU"
                  bottomTitle="Enter the product SKU."
                  defaultValue={product.sku}
                  register={register}
                  errors={errors}
                />
                <FormField
                  title="quantity"
                  isRequired={true}
                  placeHolder="Quantity"
                  bottomTitle="Enter the product quantity."
                  type="number"
                  defaultValue={product.quantity}
                  register={register}
                  errors={errors}
                />
                <FormField
                  title="discount"
                  type="number"
                  isRequired={false}
                  placeHolder="Discount"
                  bottomTitle="Set the Discount Percentage."
                  defaultValue={product.discount}
                  register={register}
                  errors={errors}
                />
              </div>
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
                <Tags
                  tags={tags}
                  setTags={setTags}
                  default_value={product.tags}
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
