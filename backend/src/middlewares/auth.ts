import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['auth_token'];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET as string);
        req.userId = (decode as JwtPayload).userId;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default verifyToken;