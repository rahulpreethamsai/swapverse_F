import { Router } from "express";
import { registerController, loginController, profileController } from "../controllers/userController.js";
import { isAuth } from "../middlewares/validateToken.js";

const authRouter = Router();

authRouter.post('/register',registerController);
authRouter.post('/login', loginController);

authRouter.get('/me', isAuth , profileController);

export default authRouter;