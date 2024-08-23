import mongoose from 'mongoose';

const AbsensiSchema = new mongoose.Schema(
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
