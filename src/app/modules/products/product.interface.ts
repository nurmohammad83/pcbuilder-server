import { Model } from 'mongoose';

export type IProduct = {
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  status: boolean;
  individualRating: number;
  averageRating: number;
  keyFeatures?: string[];
  reviews?: string[];
};

export type IProductsFilter = {
  searchTerm?: string;
  name?: string;
  price?: number;
  category?: string;
};

export type ProductModel = Model<IProduct, Record<string, unknown>>;
