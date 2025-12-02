"use client";

import { use } from "react";
import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import EditPortfolio from "../../components/portfolio/edit-portfolio";

const EditPortfolioPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Portfolio" subtitle="Edit Portfolio" />
        <EditPortfolio id={id} />
      </div>
    </Wrapper>
  );
};

export default EditPortfolioPage;

