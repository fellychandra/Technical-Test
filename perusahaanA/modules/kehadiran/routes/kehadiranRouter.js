import { Router } from 'express'
const router = Router();

import { createAbsen, getAllAbsen } from '../controllers/absensiController.js'
import { approvalIzin, createIzin, deleteIzin, getAllIzin, getAllIzinAdmin, getIzin, updateIzin } from '../controllers/izinController.js'
import { approvalCuti, createCuti, deleteCuti, getAllCuti, getAllCutiAdmin, getCuti, updateCuti } from '../controllers/cutiController.js'


router.route('/absen').get(getAllAbsen).post(createAbsen);
router.route('/izin').get(getAllIzin).post(createIzin);
router.route('/cuti').get(getAllCuti).post(createCuti);

router.route('/cuti/approval').get(getAllCutiAdmin);
router.route('/izin/approval').get(getAllIzinAdmin);

router.route('/izin/:id')
    .get(getIzin)
    .patch(updateIzin)
    .delete(deleteIzin);
router.route('/cuti/:id')
    .get(getCuti)
    .patch(updateCuti)
    .delete(deleteCuti);
    
router.route('/cuti/approval/:id').patch(approvalCuti);
router.route('/izin/approval/:id').patch(approvalIzin);

export default router;