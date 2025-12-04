export interface ICarousel {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  backgroundImage?: string;
  order: number;
  status: "active" | "inactive";
  link?: string;
  buttonText?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CarouselResponse {
  success: boolean;
  result: ICarousel[];
}

export interface IAddCarousel {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  backgroundImage?: string;
  order?: number;
  status?: "active" | "inactive";
  link?: string;
  buttonText?: string;
}

