"use client";
import React from "react";
import Pagination from "../ui/Pagination";
import ErrorMsg from "../common/error-msg";
import Loading from "../common/loading";
import { useGetAllCarouselsQuery } from "@/redux/carousel/carouselApi";
import usePagination from "@/hooks/use-pagination";
import CarouselEditDelete from "./carousel-edit-delete";

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

const CarouselTable = ({
  cls,
  searchTerm,
}: {
  cls?: string;
  searchTerm?: string;
}) => {
  const { data: carousels, isError, isLoading } = useGetAllCarouselsQuery();
  const allItems = (carousels?.result || []) as any[];
  const filtered = searchTerm
    ? allItems.filter(
        (it) =>
          (it.title || "")
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (it.subtitle || "")
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    : allItems;
  const paginationData = usePagination(filtered, 10);
  const { currentItems, handlePageClick, pageCount } = paginationData;

  let content = null;
  if (isLoading) {
    content = <Loading loading={isLoading} spinner="bar" />;
  }
  if (isError && !carousels) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isError && carousels) {
    if (filtered.length === 0) {
      content = (
        <div className="text-center py-8">
          <p className="text-gray-500">No carousels found</p>
        </div>
      );
    } else {
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
                <TableHead title="Subtitle" />
                <TableHead title="Order" />
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
                    {item.subtitle}
                  </td>
                  <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                    {item.order || 0}
                  </td>
                  <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                    <span
                      className={`px-2 py-1 rounded ${
                        item.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                    {new Date(item.updatedAt || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="px-9 py-3 text-end">
                    <div className="flex items-center justify-end space-x-2">
                      <CarouselEditDelete id={item._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pageCount > 1 && (
            <div className="flex justify-end mt-4">
              <Pagination
                handlePageClick={handlePageClick}
                pageCount={pageCount}
              />
            </div>
          )}
        </>
      );
    }
  }

  return <div className={cls}>{content}</div>;
};

export default CarouselTable;

