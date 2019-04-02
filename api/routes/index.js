import { Router } from 'express';
import ClaimRouter from './ClaimRouter';
import AuthRouter from './AuthRouter';
import MeRouter from './MeRouter';
import AuthenticationPolicies from '../policies/AuthenticationPolicies';

const { jwt: isAuth } = AuthenticationPolicies;

const router = Router();

router
    .use('/v1/claims', isAuth, ClaimRouter)
    .use('/v1/me', isAuth, MeRouter)
    // .use('/v1/base', isAuth, BaseRouter)
    .use('/v1/auth', AuthRouter);


export default router;
