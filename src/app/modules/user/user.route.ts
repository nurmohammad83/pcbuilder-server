import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post('/create-user', UserController.createUser);
router.post('/login', UserController.loginUser);

router.post('/add-wishlist', auth(), UserController.addToWishList);
router.get('/wishlist', auth(), UserController.getWishList);

// router.post('/add-readinglist', auth(), UserController.addToReadList);
// router.get('/readinglist', auth(), UserController.getReadList);
router.post('/refresh-token', UserController.refreshToken);

export const UserRoute = router;
