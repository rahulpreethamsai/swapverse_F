import { Router } from "express";
import { getItemsController, getItemIdController, postItemsController, putItemIdController, deleteItemIdController, getMyItemsController } from "../controllers/itemController.js";
import { isAuth } from "../middlewares/validateToken.js";
import { requireRole } from "../middlewares/roleCheck.js";
const itemsRouter = Router();
itemsRouter.get('/', isAuth, getItemsController);
itemsRouter.get('/my-items', isAuth, getMyItemsController);
itemsRouter.post('/', isAuth, postItemsController);
itemsRouter.get('/:id', isAuth, getItemIdController);
itemsRouter.put('/:id', isAuth, putItemIdController);
itemsRouter.delete('/:id', isAuth, deleteItemIdController);
export default itemsRouter;
//# sourceMappingURL=itemsRoute.js.map