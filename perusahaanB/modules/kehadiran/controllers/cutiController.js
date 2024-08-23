import axios from 'axios';
import { StatusCodes } from 'http-status-codes';


export const getAllCuti = async (req, res) => {

    try {
        const response = await axios.get(process.env.KEHADIRAN_URL + 'kehadiran/cuti', {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const getAllCutiAdmin = async (req, res) => {
    try {
        
        const response = await axios.get(process.env.KEHADIRAN_URL + `kehadiran/cuti/approval`, {
            headers: {
                'Authorization': req.headers.authorization,
                'X-Perusahaan': process.env.PERUSAHAAN
            }
        });
        res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const getCuti = async (req, res) => {

    try {
        const response = await axios.get(process.env.KEHADIRAN_URL + `kehadiran/cuti/${req.params.id}`, {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const createCuti = async (req, res) => {
    const { tanggalMulai, tanggalAkhir, alasan, status } = req.body

    try {
        const response = await axios.post(process.env.KEHADIRAN_URL + 'kehadiran/cuti', {
            perusahaan: process.env.PERUSAHAAN,
            tanggalMulai,
            tanggalAkhir,
            alasan,
            status,
            createdBy: req.user.userId
        }, {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const updateCuti = async (req, res) => {
    const { tanggalMulai, tanggalAkhir, alasan } = req.body

    console.log(req.params.id);

    try {
        const response = await axios.patch(process.env.KEHADIRAN_URL + `kehadiran/cuti/${req.params.id}`, {
            tanggalMulai,
            tanggalAkhir,
            alasan,
        }, {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const approvalCuti = async (req, res) => {
    try {
        const response = await axios.patch(process.env.KEHADIRAN_URL + `kehadiran/cuti/approval/${req.params.id}`, req.body, {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const deleteCuti = async (req, res) => {
    try {
        const response = await axios.delete(process.env.KEHADIRAN_URL + `kehadiran/cuti/${req.params.id}`, {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};