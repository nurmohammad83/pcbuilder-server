import express from 'express';
import { ProductsController } from './product.controller';

const router = express.Router();

router.post('/create-product', ProductsController.createProduct);
router.delete('/:id', ProductsController.deleteProduct);
router.get('/:id', ProductsController.singleProduct);
router.get('/', ProductsController.getProducts);

export const ProductRoute = router;
