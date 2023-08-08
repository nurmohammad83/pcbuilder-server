import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendRespons';
import httpStatus from 'http-status';
import { UserService } from './user.service';
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
  IUser,
} from './user.interface';
import config from '../../../config';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUser(userData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await UserService.loginUser(loginData);

  const { refreshToken, ...others } = result;
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login successfully!',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await UserService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

export const addToWishList = async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.addToWishList(req.body, user);
  res.send({
    success: true,
    statusCode: 200,
    message: 'Added to wishlist',
    data: result,
  });
};

export const getWishList = async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getWishList(user);
  res.send({
    success: true,
    statusCode: 200,
    message: 'Wishlist retrieved successfully',
    data: result,
  });
};

// export const addToReadList = async (req: Request, res: Response) => {
//   const user = req.user;
//   const result = await UserService.addToReadList(req.body, user);
//   res.send({
//     success: true,
//     statusCode: 200,
//     message: 'Added to Reading list',
//     data: result,
//   });
// };

// export const getReadList = async (req: Request, res: Response) => {
//   const user = req.user;
//   const result = await UserService.getReadList(user);
//   res.send({
//     success: true,
//     statusCode: 200,
//     message: 'Read list retrieved successfully',
//     data: result,
//   });
// };

export const UserController = {
  createUser,
  loginUser,
  refreshToken,
  addToWishList,
  getWishList,
};
