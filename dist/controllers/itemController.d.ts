import type { Request, Response } from "express";
export declare function getItemsController(req: Request, res: Response): Promise<void>;
export declare function getItemIdController(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getMyItemsController(req: any, res: Response): Promise<void>;
export declare function postItemsController(req: any, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function putItemIdController(req: any, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteItemIdController(req: any, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=itemController.d.ts.map