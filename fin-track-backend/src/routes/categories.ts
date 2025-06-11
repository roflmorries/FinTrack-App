import { Router } from 'express';
import * as categoryController from '../controllers/categoryController'

const router = Router();

router.get('/', categoryController.getAll);
router.post('/', categoryController.create);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.remove)

export default router;