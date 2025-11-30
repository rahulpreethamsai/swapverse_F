import { Router } from "express";
import { newSwapRequest, getUsersSwapsController,swapAccepted, swapCancelled, swapPickedUp, swapReturned, swapRaisedDispute, swapFinished } from "../controllers/swapController.js";
import { isAuth } from "../middlewares/validateToken.js";

const swapRouter = Router();

swapRouter.post('/', isAuth, newSwapRequest);
swapRouter.get('/my-swaps', isAuth, getUsersSwapsController);
swapRouter.post('/:id/accept', isAuth ,swapAccepted);
swapRouter.post('/:id/cancel', isAuth,swapCancelled);
swapRouter.post('/:id/confirmPickup', isAuth ,swapPickedUp);
swapRouter.post('/:id/confirmReturn', isAuth ,swapReturned);
swapRouter.post('/:id/raiseDispute', isAuth ,swapRaisedDispute);
swapRouter.post('/:id/finish', isAuth ,swapFinished);

export default swapRouter;