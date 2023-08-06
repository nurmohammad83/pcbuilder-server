import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { ICategory } from './categories.interface';
import sendResponse from '../../../shared/sendRespons';
import { CategoriesService } from './categories.serveice';
import { Request, Response } from 'express';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { ...categoryData } = req.body;
  const result = await CategoriesService.createCategory(categoryData);
  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category create successfully!',
    data: result,
  });
});
const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoriesService.getCategories();
  sendResponse<ICategory[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully!',
    data: result,
  });
});

export const CategoriesController = {
  getCategories,
  createCategory,
};
