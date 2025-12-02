export interface IFAQ {
  _id: string;
  question: string;
  answer: string;
  status: string;
  order?: number;
}

export interface FAQResponse {
  success: boolean;
  result: IFAQ[];
}

export interface IAddFAQ {
  question: string;
  answer: string;
  status?: string;
  order?: number;
}

