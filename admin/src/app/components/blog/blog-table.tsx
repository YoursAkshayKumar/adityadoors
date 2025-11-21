"use client";
import React from "react";
import Pagination from "../ui/Pagination";
import ErrorMsg from "../common/error-msg";
import Loading from "../common/loading";
import { useGetAllBlogsQuery } from "@/redux/blog/blogApi";
import usePagination from "@/hooks/use-pagination";
import BlogEditDelete from "./blog-edit-delete";

function TableHead({ title }: { title: string }) {
  return (
    <th
      scope="col"
      className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
    >
      {title}
    </th>
  );
}

const BlogTable = ({ cls }: { cls?: string }) => {
  const { data: blogs, isError, isLoading } = useGetAllBlogsQuery();
  const paginationData = usePagination(blogs?.result || [], 5);
  const { currentItems, handlePageClick, pageCount } = paginationData;

  let content = null;
  if (isLoading) {
    content = <Loading loading={isLoading} spinner="bar" />;
  }
  if (isError && !blogs) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isError && blogs) {
    content = (
      <>
        <table className="w-full text-base text-left text-gray-500">
          <thead className="bg-white">
            <tr className="border-b border-gray6 text-tiny">
              <th
                scope="col"
                className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
              >
                Title
              </th>
              <TableHead title="Status" />
              <TableHead title="Updated" />
              <TableHead title="Actions" />
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item._id} className="bg-white border-b border-gray6">
                <th
                  scope="row"
                  className="px-6 py-4 font-normal text-gray-900 whitespace-nowrap"
                >
                  <a className="flex items-center space-x-3">
                    <span className="font-medium text-heading text-hover-primary transition">
                      {item.title}
                    </span>
                  </a>
                </th>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  {item.status}
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  {new Date(item.updatedAt || Date.now()).toLocaleDateString()}
                </td>
                <td className="px-9 py-3 text-end">
                  <div className="flex items-center justify-end space-x-2">
                    <BlogEditDelete id={item._id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center flex-wrap">
          <p className="mb-0 text-tiny">
            Showing 1-{currentItems.length} of {blogs?.result.length}
          </p>
          <div className="pagination py-3 flex justify-end items-center">
            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={`relative overflow-x-auto bg-white px-8 py-4 rounded-md ${cls || ""}`}>
      <div className="overflow-scroll 2xl:overflow-visible">{content}</div>
    </div>
  );
};

export default BlogTable;