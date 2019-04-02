import { Router } from 'express';
import AuthenticationPolicies from '../policies/AuthenticationPolicies';
import AuthController from '../controllers/AuthController';

const { localAuth } = AuthenticationPolicies;
console.log(localAuth);

const router = Router();

router
    .post('/', localAuth, AuthController.login);

export default router;
