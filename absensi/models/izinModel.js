import mongoose from 'mongoose';

const IzinSchema = new mongoose.Schema(
    {
        karyawanId: {
            type: String,
            required: true,
        },
        perusahaan: {
            type: String,
        },
        tanggalPengajuan: {
            type: Date,
            required: true,
            default: Date(),
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
            default: 'pending',
            required: true,
        },
        createdBy: String
    },
    { timestamps: true }
);

export default mongoose.model('Izin', IzinSchema);
