import { Router } from 'express'
const router = Router();

import {createAbsen} from '../controllers/absensiController.js'
import {} from '../controllers/izinController.js'
import {} from '../controllers/cutiController.js'


router.route('/absen').get().post();
router.route('/izin').get().post();
router.route('/cuti').get().post();

router.route('/absen/:id')
    .get()
    .patch()
    .delete();
router.route('/izin/:id')
    .get()
    .patch()
    .delete();
router.route('/cuti/:id')
    .get()
    .patch()
    .delete();

export default router;