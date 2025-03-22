const PDFDocument = require('pdfkit');

const generatePDF = (contacts) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });
    doc.on('error', (err) => reject(err));

    doc.fontSize(16).text('CyberCraft Bangladesh - Contact Submissions', { align: 'center' });
    doc.moveDown();

    contacts.forEach((contact, index) => {
      doc.fontSize(12).text(`Contact ${index + 1}`, { underline: true });
      doc.fontSize(10)
        .text(`Name: ${contact.name}`)
        .text(`Email: ${contact.email}`)
        .text(`Message: ${contact.message}`)
        .text(`Date: ${new Date(contact.createdAt).toLocaleDateString()}`)
        .text(`Status: ${contact.status || 'unread'}`);
      doc.moveDown();
    });

    doc.end();
  });
};

module.exports = { generatePDF };
