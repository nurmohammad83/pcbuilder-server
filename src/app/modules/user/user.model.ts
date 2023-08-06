import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from './user.interface';
import bcrypt from 'bcrypt';
const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    wishlist: {
      type: Array,
    },
    readinglist: {
      type: Array,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'name' | 'email' | 'password'> | null> {
  return await User.findOne({ email }, { email: 1, password: 1 }).lean();
};

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
});

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

export const User = model<IUser, IUserModel>('User', userSchema);
