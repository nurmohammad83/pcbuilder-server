import { Model, Types } from 'mongoose';

export type ICategory = {
  name: string;
  image: string;
  product?: Types.ObjectId;
};

export type CategoryModel = Model<ICategory, Record<string, unknown>>;
