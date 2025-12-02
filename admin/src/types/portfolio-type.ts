export interface IPortfolio {
  _id: string;
  name: string;
  number: string;
  image: string;
  description: string;
  status: string;
  order?: number;
}

export interface PortfolioResponse {
  success: boolean;
  result: IPortfolio[];
}

export interface IAddPortfolio {
  name: string;
  number: string;
  image: string;
  description: string;
  status?: string;
  order?: number;
}

