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
exports.RegistrarUsuario = void 0;
const registro_model_1 = require("../models/registro.model");
const RegistrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombres, apellidos, telefono, dni, fecha_nacimiento, genero, identificador_unah, correo, contrasena, img_recibo, codigo_recibo } = req.body;
        if (!nombres || !apellidos || !telefono || !fecha_nacimiento || !dni || !correo || !contrasena) {
            res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
            return;
        }
        const telefonoNumerico = parseInt(telefono, 10);
        if (isNaN(telefonoNumerico)) {
            res.status(400).json({ message: 'El teléfono debe ser un número válido' });
            return;
        }
        const resultado = yield registro_model_1.registro.registrarusuario(nombres, apellidos, dni, telefonoNumerico, fecha_nacimiento, genero, identificador_unah || '', correo, contrasena, img_recibo || '', codigo_recibo || '');
        res.status(201).json(resultado);
    }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        const err = error;
        res.status(500).json({
            message: 'Hubo un problema al registrar el usuario',
            error: err.message || error,
        });
    }
});
exports.RegistrarUsuario = RegistrarUsuario;
