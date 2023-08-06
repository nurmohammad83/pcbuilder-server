import { ICategory } from './categories.interface';
import { Categories } from './categories.model';

const createCategory = async (data: ICategory) => {
  const result = await Categories.create(data);
  return result;
};
const getCategories = async () => {
  const result = await Categories.find();
  return result;
};

export const CategoriesService = {
  getCategories,
  createCategory,
};
