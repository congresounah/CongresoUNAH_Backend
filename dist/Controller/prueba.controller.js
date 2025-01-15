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
exports.insertUser = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const insertUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { p_nombres, p_apellidos, p_dni, p_telefono, p_fecha_nacimiento, p_genero, p_externo, p_estudiante, p_identificador_unah, p_correo, p_contrasena, p_img_recibo, p_codigo_recibo } = req.body;
    try {
        // Generar una URL única para el QR usando p_dni
        const uniqueUrl = `http://localhost:4000/prueba/user/${p_dni}`;
        // Generar el código QR en formato base64
        const qrCode = yield qrcode_1.default.toDataURL(uniqueUrl);
        // Llamar al modelo para insertar el usuario en la base de datos, pasando la URL del QR
        const resultado = yield prueba.dataInserts(p_nombres, p_apellidos, p_dni, p_telefono, p_fecha_nacimiento, p_genero, p_externo, p_estudiante, p_identificador_unah, p_correo, p_contrasena, p_img_recibo, p_codigo_recibo, qrCode);
        // Responder con el mensaje de éxito y el código QR
        res.status(200).json({
            message: 'Usuario insertado correctamente',
            resultado,
            qrCode, // El código QR generado en base64
        });
    }
    catch (error) {
        console.error('Error al insertar usuario:', error);
        res.status(500).json({ error: 'Hubo un problema al insertar el usuario' });
    }
});
exports.insertUser = insertUser;
