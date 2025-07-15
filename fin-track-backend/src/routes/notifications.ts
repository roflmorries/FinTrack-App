import { Router } from "express";
import * as notificationController from '../controllers/notificationController';
import { checkAuth } from "../middleware/auth";

const router = Router();

router.use(checkAuth);

router.get('/', notificationController.getAll);
router.post('/', notificationController.create);
router.patch('/:id', notificationController.markAsRead);
router.delete('/:id', notificationController.remove);

export default router;