import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./validateToken.js";
export declare function requireRole(role: string): (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=roleCheck.d.ts.map