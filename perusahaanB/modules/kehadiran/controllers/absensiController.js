import Absen from '../models/absensiModel.js';
import Cuti from '../models/cutiModel.js';
import Izin from '../models/izinModel.js';

export const createAbsen = async (req, res) => {

    try {
        const user = await axios.post(process.env.AUTENTIKASI_URL + 'auth/register', { username, email, password });
        const karyawan = await Karyawan.create({ nik, nip, name, tempatLahir, tanggalLahir, noHp, userId: user.data.user._id, createdBy });

        await session.commitTransaction();
        session.endSession();
        res.status(StatusCodes.CREATED).json({ message: "karyawan created" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const getAbsen = async (req, res) => {
    try {
        const karyawan = await Karyawan.findById(req.params.id);
        res.status(StatusCodes.OK).json({ karyawan });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const updateKaryawan = async (req, res) => {
    try {
        const updatedKaryawan = await Karyawan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(StatusCodes.OK).json({ msg: 'karyawan modified', karyawan: updatedKaryawan });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const deleteKaryawan = async (req, res) => {
    try {
        const removedKaryawan = await Karyawan.findByIdAndDelete(req.params.id);
        res.status(StatusCodes.OK).json({ msg: 'karyawan deleted', karyawan: removedKaryawan });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};