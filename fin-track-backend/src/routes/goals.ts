import { Router } from 'express';
import * as goalController from '../controllers/goalController'
import { checkAuth } from '../middleware/auth';

const router = Router();

router.use(checkAuth)

router.get('/', goalController.getAll);
router.post('/', goalController.create);
router.put('/:id', goalController.update);
router.delete('/:id', goalController.remove);

export default router;