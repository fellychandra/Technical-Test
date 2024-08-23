import { Router } from 'express'
const router = Router();

import { createAbsen, deleteAbsen, getAbsen, getAbsenAllByKaryawan } from '../controllers/absensiController.js'
import { approvalIzin, createIzin, deleteIzin, getIzin, getIzinAllByKaryawan, updateIzin } from '../controllers/izinController.js'
import { approvalCuti, createCuti, deleteCuti, getCuti, getCutiAllByKaryawan, updateCuti } from '../controllers/cutiController.js'
import { authorizedPermissions } from '../middlewares/authMiddleware.js';
import { getLaporanByKaryawan } from '../controllers/laporanController.js';


router.route('/absen').get(getAbsenAllByKaryawan).post(createAbsen);
router.route('/izin').get(getIzinAllByKaryawan).post(createIzin);
router.route('/cuti').get(getCutiAllByKaryawan).post(createCuti);

router.route('/laporan').post(authorizedPermissions, getLaporanByKaryawan)

router.route('/cuti/approval').get(authorizedPermissions, getCutiAllByKaryawan)
router.route('/izin/approval').get(authorizedPermissions, getIzinAllByKaryawan)


router.route('/absen/:id')
    .get(getAbsen)
    .delete(deleteAbsen);

router.route('/izin/:id')
    .get(getIzin)
    .patch(updateIzin)
    .delete(deleteIzin);

router.route('/cuti/:id')
    .get(getCuti)
    .patch(updateCuti)
    .delete(deleteCuti);

router.route('/cuti/approval/:id').patch(authorizedPermissions, approvalCuti)
router.route('/izin/approval/:id').patch(authorizedPermissions, approvalIzin)



export default router;