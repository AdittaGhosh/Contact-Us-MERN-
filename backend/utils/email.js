const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactEmail = async (contact) => {
  const doc = new PDFDocument();
  const pdfPath = `./contact_${contact._id}.pdf`;
  doc.pipe(fs.createWriteStream(pdfPath));
  doc.text(`Name: ${contact.name}`);
  doc.text(`Email: ${contact.email}`);
  doc.text(`Message: ${contact.message}`);
  doc.text(`Date: ${contact.createdAt}`);
  doc.end();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'md@nusaiba.com.bd',
    subject: 'New Contact Submission',
    text: 'A new contact form submission has been received.',
    attachments: [{ filename: `contact_${contact._id}.pdf`, path: pdfPath }],
  };

  await transporter.sendMail(mailOptions);
  fs.unlinkSync(pdfPath);
};

module.exports = { sendContactEmail };