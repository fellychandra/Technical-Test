import { StatusCodes } from "http-status-codes";

import Absen from '../models/absensiModel.js';
import Cuti from '../models/cutiModel.js';
import Izin from '../models/izinModel.js';
// export const getLaporanByKaryawan = async (req, res) => {
//     const { pegawaiId, startDate, endDate } = req.body;
//     try {
//         const absen = await Absen.find({
//             karyawanId: pegawaiId,
//             tanggal: { $gte: new Date(startDate), $lte: new Date(endDate) }
//         });

//         const izin = await Izin.find({
//             karyawanId: pegawaiId,
//             $or: [
//                 {
//                     tanggalMulai: { $gte: new Date(startDate), $lte: new Date(endDate) }
//                 },
//                 {
//                     tanggalAkhir: { $gte: new Date(startDate), $lte: new Date(endDate) }
//                 },
//                 {
//                     $and: [
//                         { tanggalMulai: { $lte: new Date(startDate) } },
//                         { tanggalAkhir: { $gte: new Date(endDate) } }
//                     ]
//                 }
//             ]
//         });

//         let jumlahIzin = 0;

//         izin.forEach(item => {
//             const tanggalMulai = item.tanggalMulai < new Date(startDate) ? new Date(startDate) : item.tanggalMulai;
//             const tanggalAkhir = item.tanggalAkhir > new Date(endDate) ? new Date(endDate) : item.tanggalAkhir;

//             const diffTime = Math.abs(tanggalAkhir - tanggalMulai);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 

//             jumlahIzin += diffDays;
//         });

//         const cuti = await Cuti.find({
//             karyawanId: pegawaiId,
//             $or: [
//                 {
//                     tanggalMulai: { $gte: new Date(startDate), $lte: new Date(endDate) }
//                 },
//                 {
//                     tanggalAkhir: { $gte: new Date(startDate), $lte: new Date(endDate) }
//                 },
//                 {
//                     $and: [
//                         { tanggalMulai: { $lte: new Date(startDate) } },
//                         { tanggalAkhir: { $gte: new Date(endDate) } }
//                     ]
//                 }
//             ]
//         });


//         let jumlahCuti = 0;

//         cuti.forEach(item => {
//             const tanggalMulai = item.tanggalMulai < new Date(startDate) ? new Date(startDate) : item.tanggalMulai;
//             const tanggalAkhir = item.tanggalAkhir > new Date(endDate) ? new Date(endDate) : item.tanggalAkhir;

//             const diffTime = Math.abs(tanggalAkhir - tanggalMulai);
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 

//             jumlahCuti += diffDays;
//         });


//         const jumlahTelat = absen.filter(absensi => absensi.status === 'telat').length;
//         const jumlahTidakMasuk = absen.filter(absensi => absensi.status === 'tidak hadir').length;

//         res.status(StatusCodes.OK).json({ jumlahTelat, jumlahTidakMasuk, jumlahIzin, jumlahCuti });
//     } catch (error) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
//     }
// }

export const getLaporanByKaryawan = async (req, res) => {
    const { pegawaiId, startDate, endDate } = req.body;
    try {
        const absen = await Absen.find({
            karyawanId: pegawaiId,
            tanggal: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });
        const izin = await Izin.find({
            karyawanId: pegawaiId,
            tanggalMulai: { $gte: new Date(startDate), $lte: new Date(endDate) },
            tanggalAkhir: { $gte: new Date(startDate), $lte: new Date(endDate) }

        });
        const cuti = await Cuti.find({
            karyawanId: pegawaiId,
            tanggalMulai: { $gte: new Date(startDate), $lte: new Date(endDate) },
            tanggalAkhir: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });

        const jumlahTelat = absen.filter(absensi => absensi.status === 'telat').length;
        const jumlahTidakMasuk = absen.filter(absensi => absensi.status === 'tidak hadir').length;

        const jumlahIzin = izin.length;
        const jumlahCuti = {
            cuti: cuti.length,
            data: cuti.map(item => ({
                tanggalPengajuan: item.tanggalPengajuan,
                tanggalMulai: item.tanggalMulai,
                tanggalAkhir: item.tanggalAkhir,
                status: item.status
            }))
        };

        res.status(StatusCodes.OK).json({ jumlahTelat, jumlahTidakMasuk, jumlahIzin, jumlahCuti });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}