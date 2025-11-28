export interface IInquiry {
  _id: string;
  productName: string;
  productCategory?: string;
  productPrice?: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  // Backward compatibility - optional nested product
  product?: {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image?: string;
  };
}

export interface InquiryResponse {
  success: boolean;
  result: IInquiry[];
}

export interface IAddInquiry {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: string;
  productName: string;
  productCategory?: string;
  productPrice?: number;
  // Backward compatibility - optional nested product
  product?: {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image?: string;
  };
}

