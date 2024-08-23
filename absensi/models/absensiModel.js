import mongoose from 'mongoose';

const AbsensiSchema = new mongoose.Schema(
    {
        karyawanId: {
            type: String,
            required: true,
        },
        perusahaan: {
            type: String,
        },
        jam: {
            type: String,
            required: true,
            default: function () {
                const now = new Date();
                return now.toTimeString().split(' ')[0];
            },
        },
        tanggal: {
            type: Date,
            required: true,
            default: Date(),
        },
        status: {
            type: String,
            enum: ['hadir', 'telat', 'tidak hadir'],
            required: true,
        },
        createdBy: String
    },
    { timestamps: true }
);

export default mongoose.model('Absensi', AbsensiSchema);
