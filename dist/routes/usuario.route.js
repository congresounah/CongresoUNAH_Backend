"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_controller_1 = require("../Controller/usuario.controller");
const router = express_1.default.Router();
router.post('/verificarcodigo', usuario_controller_1.verificarcodigo);
router.post('/verificarorganizador', usuario_controller_1.verificarcodigoorganizador);
router.post('/actualizarcorreo', usuario_controller_1.actualizarcorreo);
router.post('/verificacion/correo', usuario_controller_1.enviarcodigoverificacioncorreo);
router.post('/verificacion/reenviarcorreo', usuario_controller_1.enviarcodigoverificacioncorreo);
router.post('/verificacion/contrasena', usuario_controller_1.enviarcodigocambiocontrasena);
//router.post('/registrar',upload.single('recibo'), procesarRecibo ,registrarusuario, enviarcodigoverificacioncorreo);
router.post('/registrar', usuario_controller_1.registrarusuario, usuario_controller_1.enviarcodigoverificacioncorreo);
router.get('/pre-registro', usuario_controller_1.verificar_preregistro);
router.post('/login', usuario_controller_1.login);
router.post('/logout', usuario_controller_1.logout);
router.post('/cambiarcontrasena', usuario_controller_1.cambiarcontrasena);
router.get('/universidades', usuario_controller_1.obteneruniversidades);
router.post('/verificacion/existe', usuario_controller_1.verificarusuario);
router.post('/verificacion/codigo_organizador', usuario_controller_1.verificar_codigo_organizador);
router.get('/carreras', usuario_controller_1.obtenerCarreras);
router.post('/asistencia/hora/entrada', usuario_controller_1.insertarHoraEntradaPorUsuario);
router.put('/asistencia/hora/salida', usuario_controller_1.insertarHoraSalidaPorUsuario);
router.post('/inscripcion/conferencia', usuario_controller_1.inscribirEnConferencia);
router.delete('/inscripcion/cancelarConferencia', usuario_controller_1.cancelarInscripcionConferencia);
exports.default = router;
