import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import ApiError from '../../Errors/ApiError';
import config from '../../config';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  let verbifiedUser: JwtPayload | null = null;
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    verbifiedUser = jwt.verify(
      token,
      config.jwt.secret_token as Secret
    ) as JwtPayload;
    if (!verbifiedUser) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Token');
    }
    req.user = verbifiedUser;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
