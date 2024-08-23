import nodemailer from 'nodemailer';

export const sendResetEmail = async (email, pin) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tumbal3014@gmail.com',
            pass: 'oufo rput cvqv ayun',
        },
    });

    const mailOptions = {
        to: email,
        from: 'passwordreset@yourdomain.com',
        subject: 'Password Reset',
        html: `
        <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please fill this pin to reset your password:</p>
        <h1>${pin}</h1>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
};