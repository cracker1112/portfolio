const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
  }
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_APP_PASS }
    });
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      subject: `Portfolio: ${subject || 'New Message'} — from ${name}`,
      html: `<h3>New message from your portfolio</h3>
             <p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Subject:</b> ${subject}</p>
             <p><b>Message:</b><br>${message}</p>`
    });
    res.json({ success: true, message: 'Message sent! I will get back to you soon.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send. Please try again.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Portfolio backend running on port ${PORT}`));
