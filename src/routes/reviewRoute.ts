import { Router } from "express";
import { createReview, getUserReviews } from "../controllers/reviewController.js";
import { isAuth } from "../middlewares/validateToken.js";

const reviewRouter = Router();

reviewRouter.get('/:id', isAuth ,getUserReviews);
reviewRouter.post('/', isAuth , createReview);

export default reviewRouter;