import { UnauthenticatedError, UnauthorizedError, BadRequestError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";


export const authenticateUser = async (req, res, next) => {
    const { token } = req.cookies || req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        throw new UnauthenticatedError('authentication invalid');
    }

    try {
        const { userId, role } = verifyJWT(token);
        req.user = { userId, role, testUser };
        next();
    } catch (error) {

    }
}

export const authorizedPermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to access this route')
        }
        next();
    }
}
