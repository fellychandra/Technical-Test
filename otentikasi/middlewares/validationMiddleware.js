import { body, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../utils/customErrors.js';
import { param } from 'express-validator';
import User from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg)

                if (errorMessages[0].startsWith('no job')) {
                    throw new NotFoundError(errorMessages)
                }
                if (errorMessages[0].startsWith('no authrized')) {
                    throw new BadRequestError(errorMessages);
                }
                throw new BadRequestError(errorMessages)
            }
            next()
        },]
}


export const validateRegisterInput = withValidationErrors([
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .custom(async (username) => {
            const user = await User.findOne({ username });
            if (user) {
                throw new BadRequestError('username already exists');
            }
        }),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new BadRequestError('email already exists');
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long'),
]);


export const validateLoginInput = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format'),
    body('password').notEmpty().withMessage('password is required'),
]);
