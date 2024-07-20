import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { HotelType } from '../models/Hotel';
import Hotel from '../models/Hotel';
import verifyToken from '../middlewares/auth';
import { body } from 'express-validator';

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

router.post('/', verifyToken, [
    body('name').notEmpty().isString().withMessage('Name is required'),
    body('city').notEmpty().isString().withMessage('City is required'),
    body('country').notEmpty().isString().withMessage('Country is required'),
    body('description').notEmpty().isString().withMessage('Description is required'),
    body('type').notEmpty().isString().withMessage('Type is required'),
    body('adultCount').notEmpty().isNumeric().withMessage('Adult count is required'),
    body('childCount').notEmpty().isNumeric().withMessage('Child count is required'),
    body('factilities').isArray().withMessage('Facilities is required'),
    body('pricePerNight').notEmpty().isNumeric().withMessage('Price per night is required'),
], upload.array("imageFiles", 6), async (req: Request, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        const uploadPromise = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString('base64');
            let dataURI = "data:" + image.mimetype + ";base64," + b64;

            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.secure_url;
        });

        const imageUrls = await Promise.all(uploadPromise);

        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        const hotel = new Hotel(newHotel);
        await hotel.save();

        return res.status(201).json(hotel);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;