import { notifyError, notifySuccess } from "@/utils/toast";
import { useAddFAQMutation, useEditFAQMutation } from "@/redux/faq/faqApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const useFAQSubmit = () => {
  const [status, setStatus] = useState<string>("Show");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();

  const [addFAQ] = useAddFAQMutation();
  const [editFAQ] = useEditFAQMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const handleSubmitFAQ = async (data: any) => {
    try {
      const payload = {
        question: data?.question,
        answer: data?.answer,
        status,
        order: Number(data?.order) || 0,
      };
      const res = await addFAQ(payload);
      if ("error" in res && res.error) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("FAQ added successfully");
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  const handleSubmitEditFAQ = async (data: any, id: string) => {
    try {
      const payload = {
        question: data?.question,
        answer: data?.answer,
        status,
        order: Number(data?.order) || 0,
      };
      const res = await editFAQ({ id, data: payload });
      if ("error" in res && res.error) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("FAQ updated successfully");
        setIsSubmitted(true);
        router.push("/faqs-list");
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
    handleSubmitFAQ,
    handleSubmitEditFAQ,
  };
};

export default useFAQSubmit;

