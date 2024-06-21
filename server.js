const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { email, message } = req.body;

    // Configura il trasportatore di nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Puoi usare un altro servizio di email
        auth: {
            user: 'your-email@gmail.com', // Il tuo indirizzo email
            pass: 'your-email-password' // La tua password email
        }
    });

    let mailOptions = {
        from: email,
        to: 'example@example.com', // Indirizzo email del destinatario
        subject: 'Richiesta di contatto',
        text: message
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email inviata: ' + info.response);
        res.status(200).send('Email inviata: ' + info.response);
    } catch (error) {
        console.error('Errore durante l\'invio dell\'email:', error);
        res.status(500).send('Errore durante l\'invio dell\'email.');
    }
});

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});
