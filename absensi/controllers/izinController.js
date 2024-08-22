import { StatusCodes } from "http-status-codes";

import Absen from '../models/absensiModel.js';

export const createAbsen = async (req, res) => {
    req.body.karyawanId = req.user.userId;
    try {
        const absen = await Absen.create(req.body);
        res.status(StatusCodes.CREATED).json({ message: "absen berhasil" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const getAbsen = async (req, res) => {
    try {
        const absen = await Absen.findById(req.params.id);
        res.status(StatusCodes.OK).json({ absen });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const updateAbsen = async (req, res) => {
    try {
        const updatedAbsen = await Absen.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(StatusCodes.OK).json({ msg: 'Absen modified', absen: updatedAbsen });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const deleteAbsen = async (req, res) => {
    try {
        const removedAbsen = await Absen.findByIdAndDelete(req.params.id);
        res.status(StatusCodes.OK).json({ msg: 'Absen deleted', absen: removedAbsen });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

import Izin from '../models/izinModel.js';

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