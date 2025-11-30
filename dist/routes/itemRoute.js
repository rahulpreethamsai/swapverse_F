import { Router } from "express";
import { getItemsController, getItemIdController, postItemsController, putItemIdController, deleteItemIdController, getMyItemsController } from "../controllers/itemController.js";
import { isAuth } from "../middlewares/validateToken.js";
const itemRouter = Router();
itemRouter.get('/', isAuth, getItemsController);
itemRouter.get('/my-items', isAuth, getMyItemsController);
itemRouter.post('/', isAuth, postItemsController);
itemRouter.get('/:id', isAuth, getItemIdController);
itemRouter.put('/:id', isAuth, putItemIdController);
itemRouter.delete('/:id', isAuth, deleteItemIdController);
export default itemRouter;
//# sourceMappingURL=itemRoute.js.map