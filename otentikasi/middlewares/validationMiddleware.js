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
    body('name').notEmpty().withMessage('name is required'),
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


// export const validateUpdateUserInput = withValidationErrors([
//     body('name').notEmpty().withMessage('name is required'),
//     body('email')
//         .notEmpty()
//         .withMessage('email is required')
//         .isEmail()
//         .withMessage('invalid email format')
//         .custom(async (email, { req }) => {
//             const user = await User.findOne({ email });
//             if (user && user._id.toString() !== req.user.userId) {
//                 throw new BadRequestError('email already exists');
//             }
//         }),
//     body('location').notEmpty().withMessage('location is required'),
//     body('lastName').notEmpty().withMessage('last name is required'),

// ])