export interface ITestimonial {
  _id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image?: string;
  status: string;
  order?: number;
  category?: number; // 1 = Home Page, 2 = About Us, 3 = Both
}

export interface TestimonialResponse {
  success: boolean;
  result: ITestimonial[];
}

export interface IAddTestimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  image?: string;
  status?: string;
  order?: number;
  category?: number; // 1 = Home Page, 2 = About Us, 3 = Both
}

