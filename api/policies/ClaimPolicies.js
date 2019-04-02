import R from 'ramda';

class ClaimPolicies {
    isMyClaim(type) {
        const getType = thisType => (thisType === 'claimer' ? 'claimerId' : 'attendantId');
        
        const isClaimMiddleware = async (req, res, next) => {
            const { user: { id: userId } } = req;
            const { claimId } = req.params;
            let query = { id: claimId };
            if (Array.isArray(type)) {
                query = R.compose(
                    R.merge(query),
                    // eslint-disable-next-line no-underscore-dangle
                    R.assoc('$or', R.__, {}),
                    R.map(thisType => ({ [getType(thisType)]: userId })),
                )(type);
            } else {
                query = R.merge(query, { [getType(type)]: userId });
            }
            const claim = await Claim.findOne({ where: query });
            if (!claim) {
                next(new ClaimError('NotAssignedClaim', 'This claim does not belong to you.'));
            }
            return next();
        };
        return isClaimMiddleware;
    }
}
const policy = new ClaimPolicies();
module.exports = policy;
