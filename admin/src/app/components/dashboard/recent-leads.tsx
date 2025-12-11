"use client";
import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { useGetAllInquiriesQuery } from "@/redux/inquiry/inquiryApi";
import ErrorMsg from "../common/error-msg";
import usePagination from "@/hooks/use-pagination";
import Pagination from "../ui/Pagination";

const tableHead = [
  "Name",
  "Phone",
  "Email",
  "Subject",
  "Status",
  "Created",
];

const RecentLeads = () => {
  const { data, isError, isLoading } = useGetAllInquiriesQuery();
  const leads = data?.result || [];
  const paginationData = usePagination(leads, 5);
  const { currentItems, handlePageClick, pageCount } = paginationData;

  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }

  if (!isLoading && !isError) {
    content = (
      <>
        <table className="w-full text-base text-left text-gray-500">
          <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wide">
            <tr>
              {tableHead.map((item) => (
                <th key={item} className="px-3 py-3 font-semibold">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((lead) => (
              <tr key={lead._id} className="bg-white border-b border-gray6 last:border-0">
                <td className="px-3 py-3 font-semibold text-slate-700">{lead.name}</td>
                <td className="px-3 py-3">{lead.phone || "—"}</td>
                <td className="px-3 py-3">{lead.email || "—"}</td>
                <td className="px-3 py-3">{lead.subject || lead.inquiryType || "—"}</td>
                <td className="px-3 py-3">
                  <span
                    className={`text-[11px] px-3 py-1 rounded-md leading-none ${
                      lead.status === "pending"
                        ? "text-warning bg-warning/10"
                        : lead.status === "contacted"
                        ? "text-info bg-info/10"
                        : lead.status === "resolved"
                        ? "text-success bg-success/10"
                        : "text-slate-600 bg-slate-100"
                    } font-medium`}
                  >
                    {lead.status || "pending"}
                  </span>
                </td>
                <td className="px-3 py-3">
                  {lead.createdAt
                    ? dayjs(lead.createdAt).format("MMM D, YYYY h:mm A")
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 pt-6 border-t border-gray6">
          <div className="pagination flex flex-col justify-between sm:flex-row">
            <span className="flex items-center uppercase">
              Showing 1-{currentItems.length} of {leads.length}
            </span>
            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6 mb-6">
      <div className="bg-white p-8 col-span-12 xl:col-span-12 2xl:col-span-12 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium tracking-wide text-slate-700 text-lg mb-0 leading-none">
            Recent Leads
          </h3>
          <Link
            href="/inquiries"
            className="leading-none text-base text-info border-b border-info border-dotted capitalize font-medium hover:text-info/60 hover:border-info/60"
          >
            View All
          </Link>
        </div>

        <div className="overflow-scroll 2xl:overflow-visible">
          <div className="w-[900px] 2xl:w-full">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default RecentLeads;

