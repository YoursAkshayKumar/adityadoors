"use client";
import React from "react";
import { Close } from "@/svg";
import { useGetMeasurementQuery } from "@/redux/measurement/measurementApi";
import Loading from "../common/loading";
import ErrorMsg from "../common/error-msg";

interface MeasurementViewModalProps {
  measurementId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const MeasurementViewModal = ({ measurementId, isOpen, onClose }: MeasurementViewModalProps) => {
  const { data: measurement, isError, isLoading } = useGetMeasurementQuery(measurementId || "", {
    skip: !measurementId || !isOpen || measurementId === "",
  });

  if (!isOpen || !measurementId) return null;

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
            <h2 className="text-2xl font-bold text-gray-900">Measurement Inquiry Details</h2>
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
                <ErrorMsg msg="Failed to load measurement details" />
              </div>
            )}

            {!isLoading && !isError && measurement && (
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                      <p className="text-lg font-semibold text-gray-900">{measurement.name || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                      <p className="text-lg text-gray-900">{measurement.email || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Phone</label>
                      <p className="text-lg text-gray-900">{measurement.phone || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>
                      <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                        measurement.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        measurement.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                        measurement.status === "completed" ? "bg-green-100 text-green-800" :
                        measurement.status === "cancelled" ? "bg-red-100 text-red-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {measurement.status || "N/A"}
                      </span>
                    </div>
                    {measurement.address && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-700 block mb-1">Address</label>
                        <p className="text-lg text-gray-900">{measurement.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Appointment Details */}
                {(measurement.preferredDate || measurement.preferredTime) && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Appointment Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {measurement.preferredDate && (
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">Preferred Date</label>
                          <p className="text-lg text-gray-900">
                            {new Date(measurement.preferredDate).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      {measurement.preferredTime && (
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">Preferred Time</label>
                          <p className="text-lg text-gray-900">{measurement.preferredTime}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-500">
                    <div>
                      <span className="font-medium text-gray-700">Created:</span>{" "}
                      {measurement.createdAt ? new Date(measurement.createdAt).toLocaleString() : "N/A"}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Updated:</span>{" "}
                      {measurement.updatedAt ? new Date(measurement.updatedAt).toLocaleString() : "N/A"}
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

export default MeasurementViewModal;

