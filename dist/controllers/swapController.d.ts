import type { Response } from "express";
export declare function newSwapRequest(req: any, res: Response): Promise<void>;
export declare function getUsersSwapsController(req: any, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function swapAccepted(req: any, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function swapCancelled(req: any, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function swapPickedUp(req: any, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function swapReturned(req: any, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function swapRaisedDispute(req: any, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function swapFinished(req: any, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=swapController.d.ts.map