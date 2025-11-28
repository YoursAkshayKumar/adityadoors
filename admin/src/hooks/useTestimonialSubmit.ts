import { notifyError, notifySuccess } from "@/utils/toast";
import { useAddTestimonialMutation, useEditTestimonialMutation } from "@/redux/testimonial/testimonialApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const useTestimonialSubmit = () => {
  const [status, setStatus] = useState<string>("Show");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();

  const [addTestimonial] = useAddTestimonialMutation();
  const [editTestimonial] = useEditTestimonialMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const handleSubmitTestimonial = async (data: any) => {
    try {
      const payload = {
        name: data?.name,
        role: data?.role,
        quote: data?.quote,
        rating: Number(data?.rating) || 5,
        status,
        order: Number(data?.order) || 0,
      };
      const res = await addTestimonial(payload);
      if ("error" in res && res.error) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Testimonial added successfully");
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  const handleSubmitEditTestimonial = async (data: any, id: string) => {
    try {
      const payload = {
        name: data?.name,
        role: data?.role,
        quote: data?.quote,
        rating: Number(data?.rating) || 5,
        status,
        order: Number(data?.order) || 0,
      };
      const res = await editTestimonial({ id, data: payload });
      if ("error" in res && res.error) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Testimonial updated successfully");
        setIsSubmitted(true);
        router.push("/testimonials-list");
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    status,
    setStatus,
    isSubmitted,
    setIsSubmitted,
    setValue,
    handleSubmitTestimonial,
    handleSubmitEditTestimonial,
  };
};

export default useTestimonialSubmit;

