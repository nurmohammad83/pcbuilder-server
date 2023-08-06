import { Schema, model } from 'mongoose';
import { ProductModel, IProduct } from './product.interface';
const productSchema = new Schema<IProduct, ProductModel>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    individualRating: {
      type: Number,
      required: true,
    },
    averageRating: {
      type: Number,
      required: true,
    },
    keyFeatures: [
      {
        type: String,
      },
    ],
    reviews: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Products = model<IProduct, ProductModel>(
  'Products',
  productSchema
);
