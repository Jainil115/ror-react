import React from 'react';
import jsPDF from 'jspdf';

const Pdf = () => {
  const handleGeneratePDF = () => {
    // Create new jsPDF instance
    const doc = new jsPDF();

    // Add content to PDF
    doc.text('Hello, this is a PDF generated using jsPDF!', 10, 10);

    // Save the PDF
    doc.save('example.pdf');
  };

  return (
    <div>
      <h1>Generate PDF Example</h1>
      <button onClick={handleGeneratePDF}>Generate PDF</button>
    </div>
  );
};

export default Pdf;
