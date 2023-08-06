import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import IPaginationOption from '../../../interfaces/pagination';
import { IProduct, IProductsFilter } from './product.interface';
import { IGenericResponse } from '../../../interfaces/common';
import { Products } from './product.model';
import { productSearchableFields } from './product.constants';

const createProduct = async (productData: IProduct): Promise<IProduct> => {
  const result = await Products.create(productData);
  return result;
};
const getProducts = async (
  filters: IProductsFilter,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<IProduct[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { limit, skip, sortBy, sortOrder, page } =
    paginationHelper.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: productSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Products.find(whereCondition)
    .sort(sortConditions)
    .skip(skip);

  const total = await Products.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const singleProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Products.findById(id);
  return result;
};
const deleteProduct = async (id: string): Promise<IProduct | null> => {
  const result = await Products.findByIdAndDelete(id);
  return result;
};

// const editBook = async (
//   id: string,
//   editData: IBook,
//   user: JwtPayload | null
// ): Promise<IBook | null> => {
//   const isBookExist = await Books.findOne({ _id: id });
//   if (!isBookExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found');
//   }

//   if (isBookExist.userEmail !== user?.userEmail) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
//   }
//   const result = await Books.findByIdAndUpdate({ _id: id }, editData, {
//     new: true,
//   });
//   return result;
// };

// const deleteBook = async (
//   id: string,
//   user: JwtPayload | null
// ): Promise<IBook | null> => {
//   const isBookExist = await Books.findOne({ _id: id });
//   if (!isBookExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Book Not Found');
//   }

//   if (isBookExist.userEmail !== user?.userEmail) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
//   }
//   const result = await Books.findByIdAndDelete(id);
//   return result;
// };

// const getReview = async (id: string) => {
//   const result = await Books.findOne({ _id: id }, { _id: 0, reviews: 1 });
//   return result;
// };
// const addReview = async (id: string, review: IReview) => {
//   const result = await Books.findOneAndUpdate(
//     { _id: id },
//     { $push: { reviews: review } }
//   );
//   return result;
// };

export const ProductsService = {
  createProduct,
  getProducts,
  singleProduct,
  deleteProduct,
};
