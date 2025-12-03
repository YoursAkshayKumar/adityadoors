"use client";
import React, { useState } from "react";
import Pagination from "../ui/Pagination";
import ErrorMsg from "../common/error-msg";
import Loading from "../common/loading";
import { useGetAllMeasurementsQuery } from "@/redux/measurement/measurementApi";
import usePagination from "@/hooks/use-pagination";
import MeasurementEditDelete from "./measurement-edit-delete";
import MeasurementViewModal from "./measurement-view-modal";

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

const MeasurementTable = ({ cls, searchTerm }: { cls?: string; searchTerm?: string }) => {
  const { data: measurements, isError, isLoading } = useGetAllMeasurementsQuery();
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allItems = (measurements?.result || []) as any[];
  const filtered = searchTerm
    ? allItems.filter((it) => {
        if (!it) return false;
        const name = (it.name || "").toString().toLowerCase();
        const email = (it.email || "").toString().toLowerCase();
        const phone = (it.phone || "").toString().toLowerCase();
        const address = (it.address || "").toString().toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        return name.includes(searchLower) || email.includes(searchLower) || phone.includes(searchLower) || address.includes(searchLower);
      })
    : allItems;
  const paginationData = usePagination(filtered, 10);
  const { currentItems, handlePageClick, pageCount } = paginationData;

  const handleViewClick = (id: string) => {
    setSelectedMeasurementId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeasurementId(null);
  };

  let content = null;
  if (isLoading) {
    content = <Loading loading={isLoading} spinner="bar" />;
  }
  if (isError && !measurements) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isError && measurements) {
    if (filtered.length === 0) {
      content = (
        <div className="text-center py-8">
          <p className="text-gray-500">No measurement inquiries found</p>
        </div>
      );
    } else {
      content = (
        <>
          <div className="overflow-scroll 2xl:overflow-visible">
            <div className="w-[975px] 2xl:w-full">
              <table className="w-full text-base text-left text-gray-500">
                <thead>
                  <tr className="border-b border-gray6 text-tiny">
                    <th
                      scope="col"
                      className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
                    >
                      Name
                    </th>
                    <TableHead title="Email" />
                    <TableHead title="Phone" />
                    <TableHead title="Address" />
                    <TableHead title="Preferred Date" />
                    <TableHead title="Status" />
                    <TableHead title="Date" />
                    <TableHead title="Actions" />
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => {
                    if (!item || !item._id) return null;
                    return (
                      <tr key={item._id} className="bg-white border-b border-gray6 last:border-0">
                        <th
                          scope="row"
                          className="pr-8 py-5 whitespace-nowrap"
                        >
                          <a href="#" className="flex items-center space-x-5">
                            <span className="font-medium text-heading text-hover-primary transition">
                              {item.name}
                            </span>
                          </a>
                        </th>
                        <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                          {item.email}
                        </td>
                        <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                          {item.phone || "N/A"}
                        </td>
                        <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                          <div className="text-sm max-w-[200px] truncate" title={item.address || "N/A"}>
                            {item.address || "N/A"}
                          </div>
                        </td>
                        <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                          {item.preferredDate 
                            ? new Date(item.preferredDate).toLocaleDateString() 
                            : "N/A"}
                        </td>
                        <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                          <span className={`px-2 py-1 rounded text-xs ${
                            item.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            item.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                            item.status === "completed" ? "bg-green-100 text-green-800" :
                            item.status === "cancelled" ? "bg-red-100 text-red-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                          {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                        </td>
                        <td className="px-9 py-3 text-end">
                          <div className="flex items-center justify-end space-x-2">
                            <MeasurementEditDelete id={item._id} onViewClick={handleViewClick} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between items-center flex-wrap">
            <p className="mb-0 text-tiny">
              Showing 1-{currentItems.length} of {filtered.length}
            </p>
            {pageCount > 1 && (
              <div className="pagination py-3 flex justify-end items-center">
                <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
              </div>
            )}
          </div>
        </>
      );
    }
  }
  return (
    <div className={cls || "relative overflow-x-auto bg-white px-8 py-4 rounded-md"}>
      {content}
      <MeasurementViewModal
        measurementId={selectedMeasurementId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MeasurementTable;

