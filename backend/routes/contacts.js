const express = require('express');
const Contact = require('../models/Contact.js');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

router.post('/userContacts', async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();

        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.USER_EMAIL,
        //         pass: process.env.USER_PASSWORD,
        //     },
        // });

        // const mailObj = {
        //     from: process.env.USER_EMAIL,
        //     to: process.env.RECEIVE_EMAIL,
        //     subject: `Contact form submission from ${name}`,
        //     text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
        // };

        // await transporter.sendMail(mailObj);

        res.status(200).json({ message: "Message sent successfully" });
    } catch (err) {
        // console.error("Error while sending mail", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

module.exports = router;
