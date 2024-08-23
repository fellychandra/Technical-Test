import { StatusCodes } from "http-status-codes";

import Absen from '../models/absensiModel.js';

export const getAbsenAllByKaryawan = async (req, res) => {    
    try {
        const absen = await Absen.find({ karyawanId: req.user.userId });
        res.status(StatusCodes.OK).json({ absen });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

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
        const absen = await Absen.find({ karyawanId: req.params.id });
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