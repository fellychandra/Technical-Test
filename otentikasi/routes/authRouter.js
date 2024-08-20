import { Router } from 'express';
import { register, login, logout, requestResetPassword, resetPassword, verify } from '../controllers/authController.js';
import { validateLoginInput, validateRegisterInput } from '../middlewares/validationMiddleware.js';
const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.post('/verify', verify);
router.get('/logout', logout);
router.post('/request-reset-password', requestResetPassword);
router.post('/reset-password/:token', resetPassword);

export default router;