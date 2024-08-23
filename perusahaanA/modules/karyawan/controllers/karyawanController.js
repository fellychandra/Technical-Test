import { StatusCodes } from 'http-status-codes';
import Karyawan from '../models/KaryawanModel.js';
import mongoose from 'mongoose';
import axios from 'axios';

export const getAllKaryawans = async (req, res) => {
    const { search, sort } = req.query;

    const queryObject = {};

    if (search) {
        queryObject.$or = [
            { name: { $regex: search, $options: 'i' } },
        ];
    }

    const sortOptions = {
        'a-z': '-name',
        'z-a': 'name',
        'newest': '-createdAt',
        'oldest': 'createdAt'
    };
    const sortKey = sortOptions[sort] || sortOptions.newest;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const karyawans = await Karyawan.find(queryObject)
            .sort(sortKey)
            .skip(skip)
            .limit(limit);

        const totalKaryawans = await Karyawan.countDocuments(queryObject);
        const numOfPages = Math.ceil(totalKaryawans / limit);

        res.status(StatusCodes.OK).json({ totalKaryawans, numOfPages, currentPage: page, karyawans });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};


export const createKaryawan = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const { nik, nip, name, tempatLahir, tanggalLahir, noHp, createdBy, username, email, password = 'tampanbanget' } = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

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

export const getKaryawan = async (req, res) => {
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
        const karyawan = await Karyawan.findById(req.params.id);
        const user = await axios.delete(process.env.AUTENTIKASI_URL + `auth/${karyawan.userId}`);
        const removedKaryawan = await Karyawan.findByIdAndDelete(req.params.id);
        res.status(StatusCodes.OK).json({ msg: 'karyawan deleted', karyawan: removedKaryawan });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
