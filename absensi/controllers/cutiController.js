import { StatusCodes } from "http-status-codes";

import Cuti from '../models/cutiModel.js';


export const getCutiAllByKaryawan = async (req, res) => {
    let idKaryawan = {};
    if (req.user.role === 'Karyawan') {
        idKaryawan = { karyawanId: req.user.userId };
    }

    try {
        const cuti = await Cuti.find(idKaryawan);
        res.status(StatusCodes.OK).json({ cuti });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const createCuti = async (req, res) => {
    req.body.karyawanId = req.user.userId;
    try {
        const cuti = await Cuti.create(req.body);
        res.status(StatusCodes.CREATED).json({ message: "Cuti berhasil" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const getCuti = async (req, res) => {
    try {
        const cuti = await Cuti.findById(req.params.id);
        res.status(StatusCodes.OK).json({ cuti });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const updateCuti = async (req, res) => {
    const { tanggalMulai, tanggalAkhir, alasan } = req.body

    try {
        const updatedCuti = await Cuti.findByIdAndUpdate(req.params.id, { tanggalMulai, tanggalAkhir, alasan, alasan }, {
            new: true,
        });
        res.status(StatusCodes.OK).json({ msg: 'cuti modified', cuti: updatedCuti });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const approvalCuti = async (req, res) => {

    try {
        const updatedCuti = await Cuti.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(StatusCodes.OK).json({ msg: 'cuti modified', cuti: updatedCuti });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const deleteCuti = async (req, res) => {
    try {
        const removedCuti = await Cuti.findByIdAndDelete(req.params.id);
        res.status(StatusCodes.OK).json({ msg: 'Cuti deleted', cuti: removedCuti });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};