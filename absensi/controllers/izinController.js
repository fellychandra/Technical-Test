import { StatusCodes } from "http-status-codes";

import Izin from '../models/izinModel.js';


export const getIzinAllByKaryawan = async (req, res) => {
    let idKaryawan = {};
    if (req.user.role === 'Karyawan') {
        idKaryawan = { karyawanId: req.user.userId };
    }
    try {
        const izin = await Izin.find(idKaryawan);
        res.status(StatusCodes.OK).json({ izin });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const createIzin = async (req, res) => {
    req.body.karyawanId = req.user.userId;
    try {
        const izin = await Izin.create(req.body);
        res.status(StatusCodes.CREATED).json({ message: "Izin berhasil" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const getIzin = async (req, res) => {
    try {
        const izin = await Izin.findById(req.params.id);
        res.status(StatusCodes.OK).json({ izin });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const updateIzin = async (req, res) => {
    const { tanggalMulai, tanggalAkhir, alasan } = req.body
    try {
        const updatedIzin = await Izin.findByIdAndUpdate(req.params.id, { tanggalMulai, tanggalAkhir, alasan, alasan }, {
            new: true,
        });
        res.status(StatusCodes.OK).json({ msg: 'izin modified', izin: updatedIzin });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const approvalIzin = async (req, res) => {
    try {
        const updatedIzin = await Izin.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(StatusCodes.OK).json({ msg: 'izin modified', izin: updatedIzin });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const deleteIzin = async (req, res) => {
    try {
        const removedIzin = await Izin.findByIdAndDelete(req.params.id);
        res.status(StatusCodes.OK).json({ msg: 'Izin deleted', izin: removedIzin });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};