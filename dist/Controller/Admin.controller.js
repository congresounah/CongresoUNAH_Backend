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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvioCorreos = exports.CarnetAlumnos = exports.ExcelAlumnos = exports.downloadCertificate = exports.sendOneCertificate = exports.sendCertificates = exports.GetUsuariosAptosCertificados = exports.enviar_correo_organizador = exports.GetUserByID = exports.ActualizarUsuario = exports.BuscarUsuario = exports.ValidarUsuario = exports.GetUsuariosValidaciones = void 0;
const Admin_model_1 = require("../models/Admin.model");
const emailservice_1 = require("../services/emailservice");
const pdfGenerator_1 = require("../services/pdfGenerator");
const email_validator_1 = __importDefault(require("email-validator"));
const qrcode_1 = __importDefault(require("qrcode"));
const exceljs_1 = __importDefault(require("exceljs"));
const axios_1 = __importDefault(require("axios"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const GetUsuariosValidaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { estado } = req.body;
    try {
        const resultado = yield Admin_model_1.Admin.GetUsuariosValidaciones(estado);
        res.status(200).json({
            message: 'Usuarios encontrados',
            resultado,
        });
    }
    catch (error) {
        console.error('Error con fetch', error);
        res.status(500).json({ error: 'Hubo un problema buscar los usuarios' });
    }
});
exports.GetUsuariosValidaciones = GetUsuariosValidaciones;
const ValidarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { nuevo_estado } = req.body;
    10;
    try {
        const uniqueUrl = `https://congresoinnovacionunah2025.com/colaborador/informacion/${id_usuario}`;
        const qrCode = yield qrcode_1.default.toDataURL(uniqueUrl);
        const resultado = yield Admin_model_1.Admin.ValidarUsuarios(Number(id_usuario), nuevo_estado, qrCode);
        console.log("La el qr del usuario es: ", uniqueUrl);
        console.log(qrCode);
        res.status(200).json({
            message: 'Estado actualizado con exito ',
            resultado,
        });
    }
    catch (error) {
        console.error('Error con la actualizacion del usuario', error);
        res.status(500).json({ error: 'Hubo un problema al actualizar el usuario' });
    }
});
exports.ValidarUsuario = ValidarUsuario;
const BuscarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { busqueda } = req.body;
    try {
        const resultado = yield Admin_model_1.Admin.BuscarUsuario(busqueda);
        res.status(200).json({
            message: 'Exito al encontrar el usuario',
            resultado,
        });
    }
    catch (error) {
        console.error('Error con la busqueda del usuario', error);
        res.status(500).json({ error: 'Hubo un problema al buscar el usuario' });
    }
});
exports.BuscarUsuario = BuscarUsuario;
const ActualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario } = req.params;
    const { nombres, apellidos, dni, correo, contrasena } = req.body;
    try {
        const resultado = yield Admin_model_1.Admin.UpdateUser(Number(id_usuario), nombres, apellidos, dni, correo, contrasena);
        res.status(200).json({
            message: 'Usuario actualizado con exito',
            resultado,
        });
    }
    catch (error) {
        console.error('Error al actualizar el usuario', error);
        res.status(500).json({ error: 'Hubo un problema al al actualizar el usuario' });
    }
});
exports.ActualizarUsuario = ActualizarUsuario;
const GetUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_user } = req.params;
    try {
        const resultado = yield Admin_model_1.Admin.GetUserByID(Number(id_user));
        res.status(200).json({
            message: 'Usuario encontrado con exito',
            resultado,
        });
        resultado.forEach(element => {
            element.correo;
            element.nombres;
            element.apellidos;
        });
    }
    catch (error) {
        console.error('Error con fetch', error);
        res.status(500).json({ error: 'Hubo un problema buscar el user' });
    }
});
exports.GetUserByID = GetUserByID;
const enviar_correo_organizador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, correo } = req.body;
    try {
        if (!email_validator_1.default.validate(correo)) {
            return res.status(400).json({ message: 'Correo electrónico inválido.' });
        }
        const codigo_verificacion = Math.floor(100000 + Math.random() * 900000).toString();
        const id_tipo_verificacion = 3;
        yield Admin_model_1.Admin.usuario_organizador(id_usuario, codigo_verificacion, id_tipo_verificacion);
        yield (0, emailservice_1.sendVerificationEmail)(correo, codigo_verificacion);
        return res.status(200).json({ message: 'El código de verificación para convertirse en usuario Organizador a sido enviado correctamente.' });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        else {
            return res.status(500).json({ message: 'Error desconocido.' });
        }
    }
});
exports.enviar_correo_organizador = enviar_correo_organizador;
const GetUsuariosAptosCertificados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield Admin_model_1.Admin.UsuariosCertificados();
        res.status(200).json({
            message: 'Usuarios encontrados',
            resultado,
        });
    }
    catch (error) {
        console.error('Error con fetch', error);
        res.status(500).json({ error: 'Hubo un problema buscar los usuarios' });
    }
});
exports.GetUsuariosAptosCertificados = GetUsuariosAptosCertificados;
const sendCertificates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield Admin_model_1.Admin.UsuariosCertificados();
        if (!resultado || resultado.length === 0) {
            res.status(404).json({ message: 'No se encontraron usuarios para el estado proporcionado' });
            return;
        }
        const emailsSent = [];
        yield Promise.all(resultado.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const email = user.correo;
            const fullName = user.nombre_completo;
            const date = new Date().toLocaleDateString();
            const pdfBuffer = yield (0, pdfGenerator_1.generateCertificatePDF)(fullName, date);
            yield (0, emailservice_1.sendAllCertificates)(email, fullName, pdfBuffer);
            emailsSent.push(email);
        })));
        res.status(200).json({ message: 'Certificados enviados con éxito', emailsSent });
    }
    catch (error) {
        console.error('Error enviando certificados:', error);
        res.status(500).json({ message: 'Hubo un error al enviar los certificados' });
    }
});
exports.sendCertificates = sendCertificates;
const sendOneCertificate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_user } = req.params;
    try {
        const resultado = yield Admin_model_1.Admin.Participante_certificado_por_id(Number(id_user));
        if (!resultado || resultado.length === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        const user = resultado[0];
        const email = user.correo;
        const fullName = user.nombre_completo;
        const date = new Date().toLocaleDateString();
        const pdfBuffer = yield (0, pdfGenerator_1.generateCertificatePDF)(fullName, date);
        yield (0, emailservice_1.sendAllCertificates)(email, fullName, pdfBuffer);
        res.status(200).json({ message: 'Certificado enviado con éxito', email });
    }
    catch (error) {
        console.error('Error enviando el certificado:', error);
        res.status(500).json({ message: 'Hubo un error al enviar el certificado' });
    }
});
exports.sendOneCertificate = sendOneCertificate;
const downloadCertificate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_user } = req.params;
    try {
        const resultado = yield Admin_model_1.Admin.Participante_certificado_por_id(Number(id_user));
        if (!resultado || resultado.length === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        const user = resultado[0];
        const fullName = user.nombre_completo;
        const date = new Date().toLocaleDateString();
        const pdfBuffer = yield (0, pdfGenerator_1.generateCertificatePDF)(fullName, date);
        const encodedFileName = encodeURIComponent(`certificado_${fullName}.pdf`);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodedFileName}`);
        res.send(pdfBuffer);
    }
    catch (error) {
        console.error('Error generando el certificado:', error);
        res.status(500).json({ message: 'Hubo un error al generar el certificado' });
    }
});
exports.downloadCertificate = downloadCertificate;
const ExcelAlumnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield Admin_model_1.Admin.Usuarios_admitidos_listado();
        // Crear un nuevo libro de Excel
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet("Usuarios Admitidos");
        // Definir encabezados
        worksheet.columns = [
            { header: "ID Usuario", key: "id_usuario", width: 15 },
            { header: "DNI", key: "dni", width: 15 },
            { header: "Nombre Completo", key: "nombre_completo", width: 30 },
            { header: "Correo", key: "correo", width: 25 },
            { header: "Universidad", key: "universidad", width: 25 },
            { header: "Identificador UNAH", key: "identificador_unah", width: 20 },
            { header: "Carrera", key: "carrera", width: 30 }
        ];
        // Agregar filas con los datos
        resultado.forEach((usuario) => {
            worksheet.addRow(usuario);
        });
        // Configurar la respuesta para la descarga
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", 'attachment; filename="usuarios_admitidos.xlsx"');
        // Enviar el archivo
        yield workbook.xlsx.write(res);
        res.end();
    }
    catch (error) {
        console.error("Error al generar el Excel:", error);
        res.status(500).json({ error: "Hubo un problema al generar el archivo Excel" });
    }
});
exports.ExcelAlumnos = ExcelAlumnos;
const CarnetAlumnos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield Admin_model_1.Admin.Usuarios_admitidos();
        // Crear documento PDF
        const doc = new pdfkit_1.default({ size: "A4", margin: 50 });
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="carnets_alumnos.pdf"');
        doc.pipe(res);
        let index = 0; // Contador para colocar dos carnets por página
        for (const usuario of resultado) {
            // Determinar la posición en la página (superior o inferior)
            const startY = index % 2 === 0 ? 100 : 450; // Primera persona arriba, segunda abajo
            // Intentar descargar el QR si existe
            let qrAvailable = false;
            if (usuario.url_qr) {
                try {
                    const response = yield axios_1.default.get(usuario.url_qr, { responseType: "arraybuffer" });
                    const qrImage = Buffer.from(response.data, "binary");
                    // Insertar el QR en la posición correcta
                    doc.image(qrImage, 170, startY, { width: 250, height: 250 }); // QR bien centrado
                    qrAvailable = true;
                }
                catch (error) {
                    console.error(`No se pudo cargar el QR de ${usuario.nombre_completo}:`, error);
                }
            }
            // Si el QR no está disponible, mostrar mensaje en su lugar
            if (!qrAvailable) {
                doc.fontSize(12).text("QR no disponible", 50, startY + 100, { align: "center", width: 500 });
            }
            // Agregar el nombre del usuario debajo del QR
            doc.fontSize(18).text(usuario.nombre_completo, 50, startY + 260, { align: "center", width: 500 });
            if (usuario.identificador_unah == null) {
                doc.fontSize(16).text("Externo", 50, startY + 300, { align: "center", width: 500 });
            }
            else {
                doc.fontSize(18).text(usuario.identificador_unah, 50, startY + 300, { align: "center", width: 500 });
            }
            index++;
            // Cada dos personas, crear una nueva página
            if (index % 2 === 0) {
                doc.addPage();
            }
        }
        doc.end(); // Finalizar el PDF
    }
    catch (error) {
        console.error("Error al generar el PDF de carnets", error);
        res.status(500).json({ error: "Hubo un problema al generar el archivo PDF" });
    }
});
exports.CarnetAlumnos = CarnetAlumnos;
const EnvioCorreos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield Admin_model_1.Admin.Usuarios_admitidos_listado();
        if (!resultado || resultado.length === 0) {
            res.status(404).json({ message: 'No se encontraron usuarios para el estado proporcionado' });
            return;
        }
        const emailsSent = [];
        const emailsFailed = [];
        yield Promise.all(resultado.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!user.correo) {
                    throw new Error('Correo no definido');
                }
                yield (0, emailservice_1.RecordatorioEmail)(user.correo);
                emailsSent.push(user.correo);
            }
            catch (error) {
                console.error(`Error enviando correo a ${user.correo}:`, error);
                emailsFailed.push(user.correo);
            }
        })));
        res.status(200).json({
            message: 'Correos enviados con éxito',
            emailsSent,
            emailsFailed,
        });
    }
    catch (error) {
        console.error('Error enviando correos:', error);
        res.status(500).json({ message: 'Hubo un error al enviar los correos' });
    }
});
exports.EnvioCorreos = EnvioCorreos;
