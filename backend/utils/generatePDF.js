const PDFDocument = require('pdfkit');

const generatePDF = (contacts) => {
  const doc = new PDFDocument();
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  contacts.forEach((contact, index) => {
    doc.text(`Contact ${index + 1}`);
    doc.text(`Name: ${contact.name}`);
    doc.text(`Email: ${contact.email}`);
    doc.text(`Message: ${contact.message}`);
    doc.text(`Date: ${contact.createdAt}`);
    doc.moveDown();
  });

  doc.end();
  return Buffer.concat(buffers);
};

module.exports = { generatePDF };