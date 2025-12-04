"use client";

import { use } from "react";
import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import EditCarousel from "../../components/carousel/edit-carousel";

const EditCarouselPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Carousels" subtitle="Edit Carousel" />
        <EditCarousel id={id} />
      </div>
    </Wrapper>
  );
};

export default EditCarouselPage;

