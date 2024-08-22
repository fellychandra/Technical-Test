import { Router } from 'express'
const router = Router();

import {
    getAllKaryawans,
    getKaryawan,
    createKaryawan,
    updateKaryawan,
    deleteKaryawan,
} from '../controllers/karyawanController.js';
import { authorizedPermissions } from '../middlewares/authMiddleware.js';


router.route('/').get(authorizedPermissions, getAllKaryawans).post(authorizedPermissions, createKaryawan);

router.route('/:id')
    .get(getKaryawan)
    .patch(updateKaryawan)
    .delete(authorizedPermissions, deleteKaryawan);

export default router;