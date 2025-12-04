import { Router } from "express";
import { raiseDispute, resolveDispute, getAllDisputes } from "../controllers/disputeController.js";
import { isAuth } from "../middlewares/validateToken.js";
import { requireRole } from "../middlewares/roleCheck.js";
const disputeRouter = Router();
disputeRouter.post('/:swapId', isAuth, raiseDispute);
disputeRouter.get('/admin', isAuth, requireRole("admin"), getAllDisputes);
disputeRouter.post('/admin/:id/resolve', isAuth, requireRole("admin"), resolveDispute);
export default disputeRouter;
//# sourceMappingURL=disputeRoute.js.map