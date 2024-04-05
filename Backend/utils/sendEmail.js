const nodeMailer = require('nodemailer');
const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST, // simple mail tranfer protocol
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    })
    const mailOptions = {
        from: "",
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    // options apn ne pass kiye hue hai user controller me jaake dekh le
    await transporter.sendMail(mailOptions)
}
module.exports = sendEmail;
// agar stating me mail na kaaye toh 
// my account pe jaanna
// security me jaake less secure app access ko on kar dena
// uske baad mail aayega