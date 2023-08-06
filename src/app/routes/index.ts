import express from 'express';
import { UserRoute } from '../modules/user/user.route';
import { ProductRoute } from '../modules/products/product.route';
import { CategoriesRouter } from '../modules/categories/categories.route';
const router = express.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/products',
    route: ProductRoute,
  },
  {
    path: '/categories',
    route: CategoriesRouter,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
