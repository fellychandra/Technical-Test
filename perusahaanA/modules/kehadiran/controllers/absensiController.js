import axios from 'axios';
import { StatusCodes } from 'http-status-codes';


export const getAllAbsen = async (req, res) => {
    try {
        const response = await axios.get(process.env.KEHADIRAN_URL + 'kehadiran/absen', {
            headers: {
                'Authorization': req.headers.authorization
            }
        });
        res.status(StatusCodes.OK).json(response.data);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const createAbsen = async (req, res) => {

    try {
        const response = await axios.post(process.env.KEHADIRAN_URL + 'kehadiran/absen', {
            status: req.body.status,
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
