import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendRespons';
import httpStatus from 'http-status';
import { ProductsService } from './product.service';
import pick from '../../../shared/pick';
import { productFilterableFields } from './product.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { IProduct } from './product.interface';
export type IReview = {
  reviews: string[];
};

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body;
  const user = req.user;
  productData.userEmail = user?.userEmail;
  const result = await ProductsService.createProduct(productData);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully!',
    data: result,
  });
});

const singleProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductsService.singleProduct(id);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully!',
    data: result,
  });
});
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProductsService.deleteProduct(id);
  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete  successfully!',
    data: result,
  });
});

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields);
  const paginationOption = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ]);
  const result = await ProductsService.getProducts(filters, paginationOption);
  sendResponse<IGenericResponse<IProduct[]>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully!',
    data: result,
  });
});
// const editBook = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { ...editData } = req.body;
//   const user = req.user;
//   const result = await ProductsService.editBook(id, editData, user);
//   sendResponse<IBook>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Books edit successfully!',
//     data: result,
//   });
// });

// const getReview = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await ProductsService.getReview(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Review retrieved successfully!',
//     data: result,
//   });
// });
// const deleteBook = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const user = req.user;
//   const result = await ProductsService.deleteBook(id, user);
//   sendResponse<IBook>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Books delete successfully!',
//     data: result,
//   });
// });

// const addReview = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { review } = req.body;
//   const result = await ProductsService.addReview(id, review);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'review added  successfully!',
//     data: result,
//   });
// });

export const ProductsController = {
  createProduct,
  singleProduct,
  getProducts,
  deleteProduct,
};
