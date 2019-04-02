import { Router } from 'express';
import ClaimController from '../controllers/ClaimController';
import RecordController from '../controllers/RecordController';
import StoryController from '../controllers/StoryController';
import AuthorizationPolicies from '../policies/AuthorizationPolicies';
import ClaimPolicies from '../policies/ClaimPolicies';

const { isRol } = AuthorizationPolicies;
const { isMyClaim } = ClaimPolicies;

const isAdmin = isRol('admin');
const isUser = isRol('user');
const isMyClaimLikeAttendant = isMyClaim('attendant');
const isMyClaimLikeClaimer = isMyClaim('claimer');
const isMyClaimLikeBoth = isMyClaim(['claimer', 'attendant']);

const router = Router();
router
    .post('/', isUser, errorWrap(ClaimController.create))
    .get('/', isAdmin, errorWrap(ClaimController.getAll))
    .get('/:claimId', errorWrap(ClaimController.getById))
    .put('/:claimId/assign', isAdmin, errorWrap(ClaimController.assign))
    .put('/:claimId/close', isAdmin, isMyClaimLikeAttendant, errorWrap(ClaimController.close))
    .delete('/:claimId', isUser, isMyClaimLikeClaimer, errorWrap(ClaimController.remove));

router
    .get('/:claimId/records', isMyClaimLikeBoth, errorWrap(RecordController.get));

router
    .post('/:claimId/records/:recordId/story', isMyClaimLikeBoth, errorWrap(StoryController.create))
    .put('/:claimId/records/:recordId/story/:storyId', isMyClaimLikeBoth, errorWrap(StoryController.reply));

export default router;
