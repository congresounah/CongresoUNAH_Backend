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
exports.actualizarCorreo = exports.verificarCodigo = exports.enviarCodigo = void 0;
const emailservice_1 = require("../services/emailservice");
const verificacion_model_1 = require("../models/verificacion.model");
const email_validator_1 = __importDefault(require("email-validator"));
const enviarCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario, correo } = req.body;
        if (!email_validator_1.default.validate(correo)) {
            return res.status(400).json({ message: 'Correo electrónico inválido.' });
        }
        const codigo_verificacion = Math.floor(100000 + Math.random() * 900000).toString();
        yield verificacion_model_1.verificacion.guardarCodigoVerificacion(id_usuario, codigo_verificacion);
        yield (0, emailservice_1.sendVerificationEmail)(correo, codigo_verificacion);
        return res.status(200).json({ message: 'Código de verificación enviado.' });
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
exports.enviarCodigo = enviarCodigo;
const verificarCodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, codigo_verificacion } = req.body;
    if (!id_usuario || !codigo_verificacion) {
        res.status(400).json({ error: 'Faltan parámetros requeridos.' });
        return;
    }
    try {
        const isValid = yield verificacion_model_1.verificacion.verificarCodigo(id_usuario, codigo_verificacion);
        if (isValid) {
            res.status(200).json({ message: 'Código verificado correctamente.' });
        }
        else {
            res.status(400).json({ error: 'Código de verificación inválido o expirado.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido.' });
    }
});
exports.verificarCodigo = verificarCodigo;
const actualizarCorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, nuevo_correo } = req.body;
    if (!id_usuario || !nuevo_correo) {
        res.status(400).json({ error: 'Faltan parámetros requeridos.' });
        return;
    }
    try {
        yield verificacion_model_1.verificacion.actualizarCorreoUsuario(id_usuario, nuevo_correo);
        res.status(200).json({ message: 'Correo actualizado correctamente.' });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido.' });
    }
});
exports.actualizarCorreo = actualizarCorreo;
