import { Router } from 'express';
import { detectCategory } from '../controllers/detectCategoryController';

const router = Router();

router.post('/', detectCategory)


export default router;