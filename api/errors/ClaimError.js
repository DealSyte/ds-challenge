module.exports = {
    AlreadyTakenClaim: {
        description: 'This claim already has been taken for another attendant.',
        status: 422,
    },
    NotAssignedClaim: {
        description: 'This claim does not belong to you.',
        status: 403,
    },
    ClaimNotFound: {
        description: 'The Claim has not been found.',
        status: 404,
    },
};
