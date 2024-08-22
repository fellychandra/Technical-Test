import mongoose from 'mongoose';

const IzinSchema = new mongoose.Schema(
    {
        karyawanId: {
            type: String,
            unique: true,
            required: true,
        },
        tanggal: {
            type: Date,
            required: true,
        },
        tanggalMulai: {
            type: Date,
            required: true,
        },
        tanggalAkhir: {
            type: Date,
            required: true,
        },
        alasan: {
            type: String,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            required: true,
        },
        createdBy: String
    },
    { timestamps: true }
);

export default mongoose.model('Izin', IzinSchema);
