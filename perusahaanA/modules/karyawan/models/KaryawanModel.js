import mongoose from 'mongoose';

const KaryawanSchema = new mongoose.Schema(
    {
        nik: {
            type: String,
            unique: true,
            required: true,
        },
        nip: {
            type: String,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        tempatLahir: String,
        tanggalLahir: {
            type: Date,
            required: true,
            validate: {
                validator: function (v) {
                    return v <= new Date();
                },
                message: 'Tanggal lahir tidak valid!'
            }
        },
        jenisKelamin: {
            type: String,
            enum: ['Laki-laki', 'Perempuan'],
        },
        noHp: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^\d{10,15}$/.test(v);
                },
                message: 'Nomor HP tidak valid!'
            }
        },
        userId: {
            type: String,
            required: false,
            unique: true,
        },
        createdBy: String
    },
    { timestamps: true }
);

export default mongoose.model('Karyawan', KaryawanSchema);
