import { Router } from 'express'
const router = Router();

import { createAbsen, getAllAbsen } from '../controllers/absensiController.js'
import { createIzin, deleteIzin, getAllIzin, getIzin, updateIzin } from '../controllers/izinController.js'
import { approvalCuti, createCuti, deleteCuti, getAllCuti, getCuti, updateCuti } from '../controllers/cutiController.js'


router.route('/absen').get(getAllAbsen).post(createAbsen);
router.route('/izin').get(getAllIzin).post(createIzin);
router.route('/cuti').get(getAllCuti).post(createCuti);

router.route('/izin/:id')
    .get(getIzin)
    .patch(updateIzin)
    .delete(deleteIzin);
router.route('/cuti/:id')
    .get(getCuti)
    .patch(updateCuti)
    .delete(deleteCuti);
router.route('/cuti/approval/:id').patch(approvalCuti);

export default router;