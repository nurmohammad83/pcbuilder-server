import express from 'express';
import { CategoriesController } from './categories.controller';

const router = express.Router();

router.post('/create-category', CategoriesController.createCategory);
router.get('/', CategoriesController.getCategories);

export const CategoriesRouter = router;
