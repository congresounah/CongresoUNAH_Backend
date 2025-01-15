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
exports.cancelarInscripcionConferencia = exports.insertarHoraSalidaPorUsuario = exports.insertarHoraEntradaPorUsuario = exports.obtenerCarreras = exports.inscribirEnConferencia = exports.verificar_preregistro = exports.verificar_codigo_organizador = exports.verificarusuario = exports.obteneruniversidades = exports.cambiarcontrasena = exports.logout = exports.login = exports.actualizarcorreo = exports.verificarcodigoorganizador = exports.verificarcodigo = exports.enviarcodigocambiocontrasena = exports.enviarcodigoverificacioncorreo = exports.registrarusuario = void 0;
const emailservice_1 = require("../services/emailservice");
const usuario_model_1 = require("../models/usuario.model");
const email_validator_1 = __importDefault(require("email-validator"));
//  export const procesarRecibo = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
//  try {
//   if (!req.file) {
//     return res.status(400).json({ message: "No se recibió el archivo del recibo." });
//   }
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//   if (!allowedTypes.includes(req.file.mimetype)) {
//     return res.status(400).json({ message: "El archivo debe ser una imagen (jpeg, jpg, png)." });
//   }
//   next();
// } catch (error) {
//   console.error("Error en el middleware de recibo:", error);
//   res.status(500).json({ message: "Hubo un problema al procesar el recibo.", error });
// }
// };
const registrarusuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombres, apellidos, id_universidad, id_tipo_usuario, telefono, dni, fecha_nacimiento, genero, identificador_unah, correo, contrasena, img_recibo, codigo_recibo, codigo_organizador, id_carrera_unah } = req.body;
        if (!nombres || !apellidos || !telefono || !fecha_nacimiento || !dni || !correo || !contrasena) {
            res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
            return;
        }
        const resultado = yield usuario_model_1.usuario.registrarusuario(nombres, apellidos, id_universidad, id_tipo_usuario, dni, telefono, fecha_nacimiento, genero, identificador_unah, correo, contrasena, img_recibo, codigo_recibo, codigo_organizador, id_carrera_unah);
        if (!email_validator_1.default.validate(correo)) {
            res.status(400).json({ message: 'Correo electrónico inválido.' });
            return;
        }
        const codigo_verificacion = Math.floor(100000 + Math.random() * 900000).toString();
        const id_tipo_verificacion = 1;
        const coincide = yield usuario_model_1.usuario.verificarcorreo(correo);
        if (coincide) {
            yield usuario_model_1.usuario.usuariocodigocorreo(correo, codigo_verificacion, id_tipo_verificacion);
            yield (0, emailservice_1.sendVerificationEmail)(correo, codigo_verificacion);
            res.status(200).json({ message: 'Usuario registrado y código de verificación enviado correctamente.' });
        }
        else {
            res.status(400).json({ message: 'El código de verificación tuvo un problema para enviarse.' });
        }
    }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        const err = error;
        if (err.message.includes('El límite de usuarios para el congreso ha sido alcanzado')) {
            res.status(403).json({ message: err.message });
        }
        else {
            res.status(500).json({
                message: 'Hubo un problema al registrar el usuario',
                error: err.message || error,
            });
        }
    }
});
exports.registrarusuario = registrarusuario;
const enviarcodigoverificacioncorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo } = req.body;
        const codigo_verificacion = Math.floor(100000 + Math.random() * 900000).toString();
        const id_tipo_verificacion = 1;
        const coincide = yield usuario_model_1.usuario.verificarcorreo(correo);
        if (coincide) {
            try {
                yield usuario_model_1.usuario.usuariocodigocorreo(correo, codigo_verificacion, id_tipo_verificacion);
                yield (0, emailservice_1.sendVerificationEmail)(correo, codigo_verificacion);
                return res.status(200).json({ message: 'Código de verificación enviado correctamente.' });
            }
            catch (err) {
                console.error('Error al enviar código de verificación:', err);
                return res.status(500).json({ message: 'Hubo un problema al enviar el código de verificación.' });
            }
        }
        else {
            return res.status(400).json({ message: 'El correo electrónico no coincide con el usuario proporcionado.' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Stack trace:', error.stack);
            return res.status(500).json({ message: error.message });
        }
        else {
            console.error('Error no identificado:', error);
            return res.status(500).json({ message: 'Error desconocido.' });
        }
    }
});
exports.enviarcodigoverificacioncorreo = enviarcodigoverificacioncorreo;
const enviarcodigocambiocontrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo } = req.body;
        if (!email_validator_1.default.validate(correo)) {
            return res.status(400).json({ message: 'Correo electrónico inválido.' });
        }
        const codigo_verificacion = Math.floor(100000 + Math.random() * 900000).toString();
        const id_tipo_verificacion = 2;
        yield usuario_model_1.usuario.usuariocodigocorreo(correo, codigo_verificacion, id_tipo_verificacion);
        yield (0, emailservice_1.sendVerificationEmail)(correo, codigo_verificacion);
        return res.status(200).json({ message: 'Código de verificación para cambio de contraseña enviado correctamente.' });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Stack trace:', error.stack);
            return res.status(500).json({ message: error.message });
        }
        else {
            console.error('Error no identificado:', error);
            return res.status(500).json({ message: 'El correo proporcionado no está asociado a ningún usuario.' });
        }
    }
});
exports.enviarcodigocambiocontrasena = enviarcodigocambiocontrasena;
const verificarcodigo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, codigo_verificacion } = req.body;
    if (!correo || !codigo_verificacion) {
        res.status(400).json({ error: 'Faltan parámetros requeridos.' });
        return;
    }
    try {
        const { codigo_resultado, message, valor_usuario } = yield usuario_model_1.usuario.usuarioverificarcorreo(correo, codigo_verificacion);
        res.status(200).json({ codigo_resultado, message, valor_usuario });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido.' });
    }
});
exports.verificarcodigo = verificarcodigo;
const verificarcodigoorganizador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, codigo_verificacion } = req.body;
    if (!correo || !codigo_verificacion) {
        res.status(400).json({ error: 'Faltan parámetros requeridos.' });
        return;
    }
    try {
        const isValid = yield usuario_model_1.usuario.verificar_usuario_organizador(correo, codigo_verificacion);
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
exports.verificarcodigoorganizador = verificarcodigoorganizador;
const actualizarcorreo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_usuario, nuevo_correo } = req.body;
    if (!id_usuario || !nuevo_correo) {
        res.status(400).json({ error: 'Faltan parámetros requeridos.' });
        return;
    }
    try {
        yield usuario_model_1.usuario.usuarioexternoactualizarcorreo(id_usuario, nuevo_correo);
        res.status(200).json({ message: 'Correo actualizado correctamente.' });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido.' });
    }
});
exports.actualizarcorreo = actualizarcorreo;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, contrasenia } = req.body;
        if (!correo || !contrasenia) {
            return res.status(401).json({
                message: "Correo y contraseña son requeridos",
                codigoResultado: 0,
                data: []
            });
        }
        const resultado = yield usuario_model_1.usuario.login(correo, contrasenia);
        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            codigoResultado: resultado.codigo_resultado,
            tipo_usuario: resultado.p_tipo_usuario,
            token: resultado.token,
        });
    }
    catch (error) {
        console.log(error);
        // Manejo de errores
        if (error instanceof Error && error.message === "Credenciales inválidas") {
            return res.status(401).json({
                message: "Credenciales inválidas",
                codigoResultado: 0,
                data: []
            });
        }
        if (error instanceof Error && error.message === "Su comprobante ha sido denegado, por favor vuelva a intentarlo mandando su comprobante al correo: ") {
            return res.status(403).json({
                message: "Su comprobante ha sido denegado, por favor vuelva a intentarlo mandando su comprobante al correo: congresofacultadingenieriaunah@gmail.com",
                codigoResultado: -1
            });
        }
        if (error instanceof Error && error.message === "Su comprobante de pago aún está en proceso de verificación, por favor vuelva a intentarlo más tarde.") {
            return res.status(403).json({
                message: "Su comprobante de pago aún está en proceso de verificación, por favor vuelva a intentarlo más tarde.",
                codigoResultado: 2
            });
        }
        if (error instanceof Error && error.message === "No puede iniciar sesión, debe de confirmar su cuenta de correo.") {
            return res.status(403).json({
                message: "No puede iniciar sesión, debe de confirmar su cuenta de correo.",
                codigoResultado: -3
            });
        }
        if (error instanceof Error && error.message === "No tiene una cuenta creada, por favor registrese.") {
            return res.status(403).json({
                message: "No tiene una cuenta creada, por favor registrese.",
                codigoResultado: -4
            });
        }
        if (error) {
            return res.status(500).json({
                message: "Error interno del servidor backend", error,
                codigoResultado: -2
            });
        }
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const correo = req.body.correo;
        if (!correo) {
            return res.status(401).json({
                message: "Se necesitan credenciales",
                codigoResultado: 0
            });
        }
        const resultado = yield usuario_model_1.usuario.logout(correo);
        console.log(resultado);
        if (resultado === 1) {
            return res.status(200).json({
                message: "Cierre de sesión correcto",
                codigoResultado: 1
            });
        }
        else {
            return res.status(401).json({
                message: "No se pudo cerrar sesión o el usuario ya tenia cerrada la sesión, verificar existencia del token",
                codigoResultado: 0
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error instanceof Error ? error.message : "Error interno del servidor",
            codigoResultado: -1,
            data: []
        });
    }
});
exports.logout = logout;
const cambiarcontrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, nueva_contrasena } = req.body;
    if (!correo || !nueva_contrasena) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }
    try {
        const resultado = yield usuario_model_1.usuario.cambiarcontrasena(correo, nueva_contrasena);
        res.status(201).json(resultado);
    }
    catch (error) {
        console.error('Error al cambiar contraseña:', error);
        const err = error;
        res.status(500).json({
            message: 'Hubo un problema al cambiar contraseña',
            error: err.message || error,
        });
    }
});
exports.cambiarcontrasena = cambiarcontrasena;
const obteneruniversidades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const universidades = yield usuario_model_1.usuario.obteneruniversidades();
        return res.status(200).json(universidades);
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
exports.obteneruniversidades = obteneruniversidades;
const verificarusuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo } = req.body;
    try {
        const resultado = yield usuario_model_1.usuario.verificarcorreo(String(correo));
        res.status(200).json({
            resultado
        });
    }
    catch (error) {
        console.error('Error con fetch', error);
        res.status(500).json({ error: 'Hubo un problema buscar el user' });
    }
});
exports.verificarusuario = verificarusuario;
const verificar_codigo_organizador = (req, res) => {
    const { codigo_verificacion } = req.body;
    if (codigo_verificacion === "1234") {
        res.status(200).json({ resultado: true });
    }
    else {
        res.status(200).json({ resultado: false });
    }
};
exports.verificar_codigo_organizador = verificar_codigo_organizador;
const verificar_preregistro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield usuario_model_1.usuario.verificar_preregistro();
        res.status(200).json({
            resultado
        });
    }
    catch (error) {
        console.error('Error con fetch', error);
        res.status(500).json({ error: 'Hubo un problema buscar el user' });
    }
});
exports.verificar_preregistro = verificar_preregistro;
const inscribirEnConferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario, id_conferencia } = req.body;
        if (!id_usuario || !id_conferencia) {
            return res.status(400).json({ message: 'Faltan parámetros requeridos.' });
        }
        const mensaje = yield usuario_model_1.usuario.insertarUsuarioEnConferencia(id_usuario, id_conferencia);
        console.log(mensaje);
        return res.status(200).json({
            message: mensaje,
            codigoResultado: 1
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(200).json({ message: error.message, codigoResultado: -1 });
        }
        return res.status(500).json({
            message: error instanceof Error ? error.message : "Error interno del servidor",
            codigoResultado: -1,
            data: []
        });
    }
});
exports.inscribirEnConferencia = inscribirEnConferencia;
const obtenerCarreras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carreras = yield usuario_model_1.usuario.obtenerCareerasUNAH();
        return res.status(200).json(carreras);
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
exports.obtenerCarreras = obtenerCarreras;
const insertarHoraEntradaPorUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUsuario, idConferencia, horaEntrada } = req.body;
        const result = yield usuario_model_1.usuario.insertarHoraEntrada(idUsuario, idConferencia, horaEntrada);
        res.status(201).json({
            result
        });
    }
    catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : (error === null || error === void 0 ? void 0 : error.toString()) || 'Error desconocido';
        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ',
            error: errorInfo
        });
    }
});
exports.insertarHoraEntradaPorUsuario = insertarHoraEntradaPorUsuario;
const insertarHoraSalidaPorUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUsuario, idConferencia, horaSalida } = req.body;
        const result = yield usuario_model_1.usuario.insertarHoraSalida(idUsuario, idConferencia, horaSalida);
        res.status(201).json({
            result
        });
    }
    catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : (error === null || error === void 0 ? void 0 : error.toString()) || 'Error desconocido';
        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ',
            error: errorInfo
        });
    }
});
exports.insertarHoraSalidaPorUsuario = insertarHoraSalidaPorUsuario;
const cancelarInscripcionConferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_usuario, id_conferencia } = req.body;
        if (!id_usuario || !id_conferencia) {
            return res.status(400).json({ message: 'Faltan parámetros requeridos.' });
        }
        const mensaje = yield usuario_model_1.usuario.cancelarInscripcionEnConferencia(id_usuario, id_conferencia);
        return res.status(200).json({
            message: mensaje,
            codigoResultado: 1
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message, codigoResultado: -1 });
        }
        return res.status(500).json({
            message: error instanceof Error ? error.message : "Error interno del servidor",
            codigoResultado: -1,
            data: []
        });
    }
});
exports.cancelarInscripcionConferencia = cancelarInscripcionConferencia;
