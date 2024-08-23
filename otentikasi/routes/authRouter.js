import { Router } from 'express';
import { register, login, logout, requestResetPassword, resetPassword, verify, deleteUser } from '../controllers/authController.js';
import { validateLoginInput, validateRegisterInput } from '../middlewares/validationMiddleware.js';
const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.post('/verify', verify);
router.get('/logout', logout);
router.delete('/:id', deleteUser);
router.post('/request-reset-password', requestResetPassword);
router.post('/reset-password', resetPassword);

export default router;