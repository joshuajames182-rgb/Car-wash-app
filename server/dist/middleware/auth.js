import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
export function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header)
        return res.status(401).json({ error: 'Missing auth header' });
    const token = header.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change');
        req.auth = decoded;
        next();
    }
    catch (e) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
//# sourceMappingURL=auth.js.map