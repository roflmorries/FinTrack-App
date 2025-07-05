import { Router } from 'express';
import * as categoryController from '../controllers/categoryController'
import { checkAuth } from '../middleware/auth';

const router = Router();

router.use(checkAuth)

router.get('/', categoryController.getAll);
router.post('/', categoryController.create);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.remove)

export default router;