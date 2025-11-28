"use client";
import React from "react";
import Image from "next/image";
import { useGetInquiryQuery, useUpdateInquiryMutation } from "@/redux/inquiry/inquiryApi";
import Loading from "../common/loading";
import ErrorMsg from "../common/error-msg";
import { Button } from "antd";
import { notifySuccess, notifyError } from "@/utils/toast";
import ReactSelect from "react-select";

const InquiryDetail = ({ id }: { id: string }) => {
  const { data: inquiry, isError, isLoading } = useGetInquiryQuery(id);
  const [updateInquiry] = useUpdateInquiryMutation();

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "contacted", label: "Contacted" },
    { value: "resolved", label: "Resolved" },
    { value: "closed", label: "Closed" },
  ];

  const handleStatusChange = async (selectedOption: any) => {
    try {
      await updateInquiry({
        id,
        data: { status: selectedOption.value },
      }).unwrap();
      notifySuccess("Status updated successfully");
    } catch (error: any) {
      notifyError(error?.data?.message || "Failed to update status");
    }
  };

  if (isLoading) {
    return <Loading loading={isLoading} spinner="bar" />;
  }

  if (isError || !inquiry) {
    return <ErrorMsg msg="Failed to load inquiry" />;
  }

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - User Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6">User Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-lg font-semibold">{inquiry.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg">{inquiry.email}</p>
            </div>
            {inquiry.phone && (
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-lg">{inquiry.phone}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-500">Inquiry Type</label>
              <p className="text-lg capitalize">{inquiry.inquiryType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <div className="mt-2">
                <ReactSelect
                  options={statusOptions}
                  value={statusOptions.find((opt) => opt.value === inquiry.status)}
                  onChange={handleStatusChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Product & Message */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Product Information</h2>
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Product Name</label>
              <p className="text-lg font-semibold">{inquiry.productName || inquiry.product?.name || "N/A"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Category</label>
              <p className="text-lg">{inquiry.productCategory || inquiry.product?.category || "N/A"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Price</label>
              <p className="text-lg">
                {inquiry.productPrice || inquiry.product?.price 
                  ? `₹${(inquiry.productPrice || inquiry.product?.price)?.toLocaleString()}` 
                  : "N/A"}
              </p>
            </div>
            {inquiry.product?.image && (
              <div>
                <label className="text-sm font-medium text-gray-500">Product Image</label>
                <div className="mt-2 relative w-32 h-32">
                  <Image
                    src={inquiry.product.image}
                    alt={inquiry.product.name || "Product"}
                    fill
                    className="object-cover rounded"
                    sizes="128px"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Message</h3>
            <div>
              <label className="text-sm font-medium text-gray-500">Subject</label>
              <p className="text-lg font-semibold mb-2">{inquiry.subject}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Message</label>
              <p className="text-lg whitespace-pre-wrap bg-gray-50 p-4 rounded mt-2">
                {inquiry.message}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t">
        <div className="flex justify-between text-sm text-gray-500">
          <div>
            <span className="font-medium">Created:</span>{" "}
            {new Date(inquiry.createdAt).toLocaleString()}
          </div>
          <div>
            <span className="font-medium">Updated:</span>{" "}
            {new Date(inquiry.updatedAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetail;

