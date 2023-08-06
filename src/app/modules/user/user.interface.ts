/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  name: string;
  email: string;
  password: string;
  wishlist?: [];
  readinglist?: [];
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  email: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IUserModel = {
  isUserExist(email: string): Promise<Pick<IUser, 'email' | 'password'>>;
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type IUserModel = Model<IUser, Record<string, unknown>>;
