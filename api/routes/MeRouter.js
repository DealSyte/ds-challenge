import { Router } from 'express';
import ClaimController from '../controllers/ClaimController';

const router = Router();

router
    .get('/claims', ClaimController.getMyClaim);

export default router;
