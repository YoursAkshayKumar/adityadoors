"use client";

import { use } from "react";
import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import EditFAQ from "../../components/faq/edit-faq";

const EditFAQPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="FAQs" subtitle="Edit FAQ" />
        <EditFAQ id={id} />
      </div>
    </Wrapper>
  );
};

export default EditFAQPage;

