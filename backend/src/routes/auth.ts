import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
const router = express.Router();
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../middlewares/auth';

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 })
], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({
            userId: user._id
        },
            process.env.JWT_SECRET as string, {
            expiresIn: '1d'
        });

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000
        });

        res.status(200).json({ userId: user._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/validate-token', verifyToken, async (req: Request, res: Response) => {
    res.status(200).json({ userId: req.userId });
});

router.post('/logout', verifyToken, async (req: Request, res: Response) => {
    res.cookie('auth_token', '', {
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged out' });
});

export default router;