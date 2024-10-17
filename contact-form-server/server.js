const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// تنظیمات SMTP برای ارسال ایمیل
const transporter = nodemailer.createTransport({
  service: 'gmail', // اگر از سرویس ایمیل دیگری استفاده می‌کنید، می‌توانید این را تغییر دهید
  auth: {
    user: 'your-email@gmail.com', // ایمیل خودتان
    pass: 'your-email-password', // پسورد ایمیل خودتان
  },
});

// Endpoint برای دریافت اطلاعات فرم و ارسال ایمیل
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'hello@mahdiroozbahani.com', // ایمیل مقصد
    subject: `New Contact Form Submission from ${name}`,
    text: `You have a new message from ${name} (${email}):\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

// اجرای سرور روی پورت 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
