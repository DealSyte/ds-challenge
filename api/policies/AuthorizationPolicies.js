import R from 'ramda';

class AuthorizationPolicies {
    isRol(roles = []) {
        const rolesArray = Array.isArray(roles) ? roles : [roles];
        // eslint-disable-next-line no-underscore-dangle
        const isInsideRolesArray = R.any(R.contains(R.__, rolesArray));
        const isRolMiddleware = async (req, res, next) => {
            let { user: { rol } } = req;
            rol = [rol];
            if (!isInsideRolesArray(rol)) {
                next(new AuthorizationError('UnauthorizedRol', 'Invalid Rol for this action'));
            }
            return next();
        };
        return isRolMiddleware;
    }
}
const policy = new AuthorizationPolicies();
module.exports = policy;
