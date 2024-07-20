import express, { Request, Response } from 'express';
import User from '../models/user';
const router = express.Router();
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

router.post('/register', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty()
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() });

    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User(req.body);
        await user.save();

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000 // 1 day in milliseconds
        });

        return res.status(200).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error(error); // Log lỗi để debug
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
