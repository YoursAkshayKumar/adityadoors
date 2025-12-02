"use client";

import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import AddFAQ from "../components/faq/add-faq";

const AddFAQPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="FAQs" subtitle="Add FAQ" />
        <AddFAQ />
      </div>
    </Wrapper>
  );
};

export default AddFAQPage;

