import { Router } from "express";
import multer from 'multer';
import cloudinary from "../config/cloudinaryConfig";
import * as avatarController from '../controllers/avatarController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('avatar'), avatarController.upload);

export default router;

