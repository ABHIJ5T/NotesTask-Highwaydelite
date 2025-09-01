import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthedRequest extends Request {
    user?: { userId: string; email: string };
}

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined.");
    }
    return secret;
};

export default function auth(req: AuthedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const secret = getJwtSecret();
        const decoded = jwt.verify(token, secret) as any;
        req.user = { userId: decoded.userId, email: decoded.email };
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}
