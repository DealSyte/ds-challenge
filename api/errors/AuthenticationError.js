module.exports = {
    MissingFields: {
        description: 'Invalid apikey.',
        status: 401,
    },
    InsufficientPrivileges: {
        description: 'Does not have the necessary privileges to perform this operation.',
        status: 403,
    },
    InvalidCredentials: {
        description: 'The credentials are invalids.',
        status: 401,
    },
    InvalidAccessToken: {
        description: 'You have provided an invalid token.',
        status: 401,
    },
    InvalidExternalAccessToken: {
        description: 'You have provided an invalid external token.',
        status: 401,
    },
    InvalidProfile: {
        description: 'Invalid profile from Google.',
        status: 401,
    },
    MissingToken: {
        description: 'You haven\'t provided an access token.',
        status: 401,
    },
    MissingCredentials: {
        description: 'You haven\'t provided all the needed credentials (Email and Password).',
        status: 401,
    },
};
