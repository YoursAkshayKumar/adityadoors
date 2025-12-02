"use client";

import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import AddPortfolio from "../components/portfolio/add-portfolio";

const AddPortfolioPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Portfolio" subtitle="Add Portfolio" />
        <AddPortfolio />
      </div>
    </Wrapper>
  );
};

export default AddPortfolioPage;

