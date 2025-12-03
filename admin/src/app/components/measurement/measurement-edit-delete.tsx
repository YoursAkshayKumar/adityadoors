"use client";
import Swal from "sweetalert2";
import React from "react";
import { Delete, View } from "@/svg";
import { notifyError } from "@/utils/toast";
import DeleteTooltip from "../tooltip/delete-tooltip";
import ViewTooltip from "../tooltip/view-tooltip";
import { useDeleteMeasurementMutation } from "@/redux/measurement/measurementApi";

interface MeasurementEditDeleteProps {
  id: string;
  onViewClick: (id: string) => void;
}

const MeasurementEditDelete = ({ id, onViewClick }: MeasurementEditDeleteProps) => {
  const [deleteMeasurement] = useDeleteMeasurementMutation();
  const [showDelete, setShowDelete] = React.useState<boolean>(false);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteMeasurement(id).unwrap();
        Swal.fire("Deleted!", "Measurement inquiry has been deleted.", "success");
      } catch (error: any) {
        notifyError(error?.data?.message || "Failed to delete measurement inquiry");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-end space-x-2">
        <ViewTooltip>
          <button 
            onClick={() => onViewClick(id)}
            className="text-gray-500 hover:text-blue-500 transition-colors"
          >
            <View />
          </button>
        </ViewTooltip>
        <div className="relative">
          <button
            onClick={handleDelete}
            onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <Delete />
          </button>
          <DeleteTooltip showDelete={showDelete} />
        </div>
      </div>
    </>
  );
};

export default MeasurementEditDelete;

