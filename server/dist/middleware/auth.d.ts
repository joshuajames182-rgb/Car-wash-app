import { Request, Response, NextFunction } from 'express';
export interface AuthUser {
    userId: string;
    role: 'CUSTOMER' | 'WASHER' | 'ADMIN';
}
declare global {
    namespace Express {
        interface Request {
            auth?: AuthUser;
        }
    }
}
export declare function requireAuth(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map