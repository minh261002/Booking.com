import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { HotelType } from '../shared/types';
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

        const imageUrls = await uploadImages(imageFiles);

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

router.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId });
        res.json(hotels);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', verifyToken, async (req: Request, res: Response) => {
    const id = req.params.id.toString();
    try {
        const hotel = await Hotel.findById({
            _id: id,
            userId: req.userId
        });
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.json(hotel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', verifyToken, upload.array("imageFiles"), async (req: Request, res: Response) => {
    try {
        const updatedHotel = req.body;
        updatedHotel.lastUpdated = new Date();

        const hotel = await Hotel.findOneAndUpdate({
            _id: req.params.id,
            userId: req.userId
        }, updatedHotel, {
            new: true
        });

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(files);

        hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];
        await hotel.save();

        res.status(200).json(hotel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});;

export default router;

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromise = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = "data:" + image.mimetype + ";base64," + b64;

        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.secure_url;
    });

    const imageUrls = await Promise.all(uploadPromise);
    return imageUrls;
}
