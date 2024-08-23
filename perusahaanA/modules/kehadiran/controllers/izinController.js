import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

export const getAllIzin = async (req, res) => {

    try {
        const response = await axios.get(process.env.KEHADIRAN_URL + 'kehadiran/izin', {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
export const getIzin = async (req, res) => {

    try {
        const response = await axios.get(process.env.KEHADIRAN_URL + `kehadiran/izin/${req.params.id}`, {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const createIzin = async (req, res) => {
    const { tanggalMulai, tanggalAkhir, alasan, status } = req.body

    try {
        const response = await axios.post(process.env.KEHADIRAN_URL + 'kehadiran/izin', {
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

export const updateIzin = async (req, res) => {
    const { tanggalMulai, tanggalAkhir, alasan } = req.body

    console.log(req.params.id);

    try {
        const response = await axios.patch(process.env.KEHADIRAN_URL + `kehadiran/izin/${req.params.id}`, {
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

export const deleteIzin = async (req, res) => {
    try {
        const response = await axios.delete(process.env.KEHADIRAN_URL + `kehadiran/izin/${req.params.id}`, {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const approvalIzin = async (req, res) => {
    try {
        const response = await axios.patch(process.env.KEHADIRAN_URL + `kehadiran/izin/approval/${req.params.id}`, req.body, {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const getAllIzinAdmin = async (req, res) => {
    try {
        const response = await axios.get(process.env.KEHADIRAN_URL + 'kehadiran/izin/approval', {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};