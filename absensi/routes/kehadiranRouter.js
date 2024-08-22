import { Router } from 'express'
const router = Router();

import { createAbsen } from '../controllers/absensiController.js'
import { createIzin, getIzin, updateIzin } from '../controllers/izinController.js'
import { createCuti, getCuti, updateCuti } from '../controllers/cutiController.js'


router.route('/absen').post(createAbsen);
router.route('/izin').post(createIzin);
router.route('/cuti').post(createCuti);

router.route('/absen/:id')
    .get()
    .patch()
    .delete();

router.route('/izin/:id')
    .get(getIzin)
    .patch(updateIzin)
    .delete();

router.route('/cuti/:id')
    .get(getCuti)
    .patch(updateCuti)
    .delete();

export default router;