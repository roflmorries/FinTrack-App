import { Router } from "express";
import * as aiAssistantController from '../controllers/aiAssistantController'

const router = Router();

router.post('/', aiAssistantController.askAssistant)

export default router;