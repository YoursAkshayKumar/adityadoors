import { notifyError, notifySuccess } from "@/utils/toast";
import {
  useAddCarouselMutation,
  useEditCarouselMutation,
} from "@/redux/carousel/carouselApi";
import { IAddCarousel } from "@/types/carousel-type";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const useCarouselSubmit = () => {
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [img, setImg] = useState<string>("");
  const [backgroundImg, setBackgroundImg] = useState<string>("");
  const router = useRouter();

  const [addCarousel] = useAddCarouselMutation();
  const [editCarousel] = useEditCarouselMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const handleSubmitCarousel = async (data: any) => {
    try {
      if (!img) {
        return notifyError("Carousel image is required");
      }
      const payload: IAddCarousel = {
        title: data?.title,
        subtitle: data?.subtitle,
        description: data?.description,
        image: img,
        backgroundImage: backgroundImg || img,
        status: status,
        order: Number(data?.order) || 0,
        link: data?.link || "",
        buttonText: data?.buttonText || "READ MORE",
      };
      const res = await addCarousel(payload);
      if ("error" in res && res.error) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Carousel added successfully");
        setIsSubmitted(true);
        reset();
        setImg("");
        setBackgroundImg("");
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  const handleSubmitEditCarousel = async (data: any, id: string) => {
    try {
      if (!img) {
        return notifyError("Carousel image is required");
      }
      const payload: Partial<IAddCarousel> = {
        title: data?.title,
        subtitle: data?.subtitle,
        description: data?.description,
        image: img,
        backgroundImage: backgroundImg || img,
        status: status,
        order: Number(data?.order) || 0,
        link: data?.link || "",
        buttonText: data?.buttonText || "READ MORE",
      };
      const res = await editCarousel({ id, data: payload });
      if ("error" in res && res.error) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Carousel updated successfully");
        setIsSubmitted(true);
        router.push("/carousels-list");
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
    handleSubmitCarousel,
    handleSubmitEditCarousel,
    img,
    setImg,
    backgroundImg,
    setBackgroundImg,
  };
};

export default useCarouselSubmit;

