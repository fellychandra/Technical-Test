import axios from 'axios';
import { StatusCodes } from "http-status-codes";

export const getLaporanByKaryawan = async (req, res) => {

    try {
        const response = await axios.post(process.env.KEHADIRAN_URL + 'kehadiran/laporan', req.body, {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        res.status(StatusCodes.CREATED).json(response.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}