import { Schema, model } from 'mongoose';
import { CategoryModel, ICategory } from './categories.interface';

const categorySchema = new Schema<ICategory, CategoryModel>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const Categories = model<ICategory, CategoryModel>(
  'Categories',
  categorySchema
);
