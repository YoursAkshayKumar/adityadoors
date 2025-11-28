"use client";
import React from "react";
import { Close } from "@/svg";
import { useGetInquiryQuery } from "@/redux/inquiry/inquiryApi";
import Loading from "../common/loading";
import ErrorMsg from "../common/error-msg";
import { IInquiry } from "@/types/inquiry-type";

interface InquiryViewModalProps {
  inquiryId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const InquiryViewModal = ({ inquiryId, isOpen, onClose }: InquiryViewModalProps) => {
  const { data: inquiry, isError, isLoading } = useGetInquiryQuery(inquiryId || "", {
    skip: !inquiryId || !isOpen || inquiryId === "",
  });

  if (!isOpen || !inquiryId) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300 text-gray-700 hover:text-gray-900"
          >
            <Close />
          </button>

          {/* Header */}
          <div className="bg-gray-50 border-b border-gray-200 p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold text-gray-900">Inquiry Details</h2>
          </div>

          {/* Content */}
          <div className="p-6">
            {isLoading && (
              <div className="py-8">
                <Loading loading={isLoading} spinner="bar" />
              </div>
            )}

            {isError && (
              <div className="py-8">
                <ErrorMsg msg="Failed to load inquiry details" />
              </div>
            )}

            {!isLoading && !isError && inquiry && (
              <div className="space-y-6">
                {/* User Information */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">User Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                      <p className="text-lg font-semibold text-gray-900">{inquiry.name || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                      <p className="text-lg text-gray-900">{inquiry.email || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Phone</label>
                      <p className="text-lg text-gray-900">{inquiry.phone || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Inquiry Type</label>
                      <p className="text-lg capitalize text-gray-900">{inquiry.inquiryType || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>
                      <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                        inquiry.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        inquiry.status === "contacted" ? "bg-blue-100 text-blue-800" :
                        inquiry.status === "resolved" ? "bg-green-100 text-green-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {inquiry.status || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Information */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Product Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Product Name</label>
                      <p className="text-lg font-semibold text-gray-900">
                        {inquiry.productName || inquiry.product?.name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
                      <p className="text-lg text-gray-900">
                        {inquiry.productCategory || inquiry.product?.category || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Price</label>
                      <p className="text-lg text-gray-900">
                        {inquiry.productPrice || inquiry.product?.price 
                          ? `₹${(inquiry.productPrice || inquiry.product?.price)?.toLocaleString()}` 
                          : "N/A"}
                      </p>
                    </div>
                    {inquiry.product?.image && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Product Image</label>
                        <img
                          src={inquiry.product.image}
                          alt={inquiry.productName || inquiry.product?.name || "Product"}
                          className="mt-2 w-32 h-32 object-cover rounded border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Message</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Subject</label>
                      <p className="text-lg font-semibold text-gray-900">{inquiry.subject || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                          {inquiry.message || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-500">
                    <div>
                      <span className="font-medium text-gray-700">Created:</span>{" "}
                      {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : "N/A"}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Updated:</span>{" "}
                      {inquiry.updatedAt ? new Date(inquiry.updatedAt).toLocaleString() : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors duration-300 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryViewModal;

