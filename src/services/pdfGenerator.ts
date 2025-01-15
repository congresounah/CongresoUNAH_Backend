import { PDFDocument, rgb } from 'pdf-lib';

export const generateCertificatePDF = async (name: string, date: string): Promise<Buffer> => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([1123, 794]); // A4 en horizontal

    // Agregar un fondo blanco
    const { width, height } = page.getSize();
    page.drawRectangle({
        x: 0,
        y: 0,
        width,
        height,
        color: rgb(1, 1, 1), // Blanco
    });

    // Agregar texto al certificado
    page.drawText('Certificado de Participación', {
        x: 250,
        y: 700,
        size: 40,
        color: rgb(0.2, 0.3, 0.5), // Azul
    });

    page.drawText(`Otorgado a: ${name}`, {
        x: 250,
        y: 650,
        size: 32,
        color: rgb(0, 0, 0), // Negro
    });

    page.drawText(`Por su participación en el evento realizado el: ${date}`, {
        x: 250,
        y: 600,
        size: 20,
        color: rgb(0.4, 0.4, 0.4), // Gris
    });

    // Guardar el PDF como un buffer
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
};