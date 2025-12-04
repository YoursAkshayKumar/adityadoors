"use client";

import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import CarouselTable from "../components/carousel/carousel-table";
import Link from "next/link";

const CarouselsListPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <div className="flex justify-between items-center mb-6">
          <Breadcrumb title="Carousels" subtitle="Carousels List" />
          <Link
            href="/add-carousel"
            className="tp-btn px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Carousel
          </Link>
        </div>
        <CarouselTable />
      </div>
    </Wrapper>
  );
};

export default CarouselsListPage;

