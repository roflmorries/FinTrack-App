import { Router } from "express";
import * as userController from '../controllers/userController'
import { checkAuth } from "../middleware/auth";

const router = Router();

router.use(checkAuth);

router.post('/', userController.create);
router.patch('/:uid', userController.update);
router.get('/:uid', userController.getOne);

export default router;