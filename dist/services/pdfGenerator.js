"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCertificatePDF = void 0;
const pdf_lib_1 = require("pdf-lib");
const generateCertificatePDF = (name, date) => __awaiter(void 0, void 0, void 0, function* () {
    const pdfDoc = yield pdf_lib_1.PDFDocument.create();
    const page = pdfDoc.addPage([1123, 794]); // A4 en horizontal
    // Agregar un fondo blanco
    const { width, height } = page.getSize();
    page.drawRectangle({
        x: 0,
        y: 0,
        width,
        height,
        color: (0, pdf_lib_1.rgb)(1, 1, 1), // Blanco
    });
    // Agregar texto al certificado
    page.drawText('Certificado de Participación', {
        x: 250,
        y: 700,
        size: 40,
        color: (0, pdf_lib_1.rgb)(0.2, 0.3, 0.5), // Azul
    });
    page.drawText(`Otorgado a: ${name}`, {
        x: 250,
        y: 650,
        size: 32,
        color: (0, pdf_lib_1.rgb)(0, 0, 0), // Negro
    });
    page.drawText(`Por su participación en el evento realizado el: ${date}`, {
        x: 250,
        y: 600,
        size: 20,
        color: (0, pdf_lib_1.rgb)(0.4, 0.4, 0.4), // Gris
    });
    // Guardar el PDF como un buffer
    const pdfBytes = yield pdfDoc.save();
    return Buffer.from(pdfBytes);
});
exports.generateCertificatePDF = generateCertificatePDF;
