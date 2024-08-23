import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { NotFoundError, UnauthenticatedError } from '../utils/customErrors.js';
import { createJWT, verifyJWT } from '../utils/tokenUtils.js';
import crypto from 'crypto';
import { sendResetEmail } from '../utils/sendResetEmail.js';

export const register = async (req, res) => {
    try {
        const isFirtsAccount = await User.countDocuments() === 0
        if (isFirtsAccount) {
            req.body.role = 'Superuser';
        }

        const hashedPassword = await hashPassword(req.body.password);
        req.body.password = hashedPassword;
        const user = await User.create(req.body);
        res.status(StatusCodes.CREATED).json({ message: "User berhasil dibuat!", user });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        const isValidUser = user && (await comparePassword(
            req.body.password,
            user.password
        ))

        if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

        const token = createJWT({
            userId: user._id,
            nik: user.nik,
            role: user.role
        })

        // kalau mau dibuat kedalam cookie
        // const oneDay = 1000 * 60 * 60 * 24;
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     expires: new Date(Date.now() + oneDay),
        //     secure: process.env.NODE_ENV === 'development',
        // });

        res.status(StatusCodes.OK).json({ message: 'user logged in', token })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie('token', 'logout', {
            httpOnly: true,
            expires: new Date(Date.now()),
        });
        res.status(StatusCodes.OK).json({ message: 'user logged out!' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const verify = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] || req.body.token;

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid credentials' });
    }

    try {
        const decoded = verifyJWT(token);

        res.status(StatusCodes.OK).json({ valid: true, userId: decoded.userId, nik: decoded.nik, role: decoded.role });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ valid: false, message: err.message });
    }
};


export const requestResetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new NotFoundError('User not found');
        }

        const pin = Math.floor(100000 + Math.random() * 900000).toString();

        user.resetPasswordToken = pin;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        // Send PIN via email
        await sendResetEmail(user.email, pin);

        res.status(StatusCodes.OK).json({ message: 'Password reset email dikirim! Silakan Cek Email Anda!' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { password, pin } = req.body;

        const user = await User.findOne({
            resetPasswordToken: pin,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            throw new NotFoundError('Password reset pin is invalid or has expired');
        }

        const hashedPassword = await hashPassword(password);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(StatusCodes.CREATED).json({ message: 'Password has been reset' });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const removedUser = await User.findByIdAndDelete(req.params.id);
        res.status(StatusCodes.OK).json({ msg: 'User deleted', User: removedUser });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};


