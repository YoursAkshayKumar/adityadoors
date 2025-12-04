"use client";

import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import AddCarousel from "../components/carousel/add-carousel";

const AddCarouselPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Carousels" subtitle="Add Carousel" />
        <AddCarousel />
      </div>
    </Wrapper>
  );
};

export default AddCarouselPage;

