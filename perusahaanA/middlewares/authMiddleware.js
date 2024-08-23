import { StatusCodes } from "http-status-codes";
import axios from "axios";


export const authenticateUser = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Token tidak ditemukan!' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const response = await axios.post(process.env.AUTENTIKASI_URL + 'auth/verify', { token });

        if (response.data.valid) {
            req.user = response.data;

            next();
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
        }
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authentication failed' });
    }
}

export const authorizedPermissions = (req, res, next) => {
    if (req.user && req.user.role === "Superuser") {
        next();
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authentication failed. Unauthorized access.' });
    }
};


