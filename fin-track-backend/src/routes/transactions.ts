import { Router } from 'express';
import * as transactionController from '../controllers/transactionController';
import { checkAuth } from '../middleware/auth';

const router = Router();

router.use(checkAuth);

router.get('/', transactionController.getAll);
router.post('/', transactionController.create);
router.put('/:id', transactionController.update);
router.delete('/:id', transactionController.remove);

export default router;