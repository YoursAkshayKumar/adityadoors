"use client";
import React, { useState } from "react";
import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import MeasurementTable from "../components/measurement/measurement-table";

const MeasurementsListPage = () => {
  const [search, setSearch] = useState("");

  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Measurement Inquiries" subtitle="Measurement Inquiries List" />
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search measurement inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div className="bg-white rounded-lg shadow">
          <MeasurementTable searchTerm={search} />
        </div>
      </div>
    </Wrapper>
  );
};

export default MeasurementsListPage;

