import { notifyError, notifySuccess } from "@/utils/toast";
import { useAddPortfolioMutation, useEditPortfolioMutation } from "@/redux/portfolio/portfolioApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const usePortfolioSubmit = () => {
  const [status, setStatus] = useState<string>("Show");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();

  const [addPortfolio] = useAddPortfolioMutation();
  const [editPortfolio] = useEditPortfolioMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const handleSubmitPortfolio = async (data: any) => {
    try {
      const payload = {
        name: data?.name,
        number: data?.number,
        image: data?.image,
        description: data?.description,
        status,
        order: Number(data?.order) || 0,
      };
      const res = await addPortfolio(payload);
      if ("error" in res && res.error) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Portfolio added successfully");
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  const handleSubmitEditPortfolio = async (data: any, id: string) => {
    try {
      const payload = {
        name: data?.name,
        number: data?.number,
        image: data?.image,
        description: data?.description,
        status,
        order: Number(data?.order) || 0,
      };
      const res = await editPortfolio({ id, data: payload });
      if ("error" in res && res.error) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Portfolio updated successfully");
        setIsSubmitted(true);
        router.push("/portfolios-list");
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
    handleSubmitPortfolio,
    handleSubmitEditPortfolio,
  };
};

export default usePortfolioSubmit;

