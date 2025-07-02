import { Router } from "express";
import * as userController from '../controllers/userController'

const router = Router();

router.post('/', userController.create);
router.patch('/:uid', userController.update);
router.put('/:uid', userController.getOne);

export default router;