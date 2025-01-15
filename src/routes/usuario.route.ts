import express from 'express';
import upload from '../services/multer'

import {verificarcodigoorganizador, cambiarcontrasena, enviarcodigoverificacioncorreo, verificarusuario, verificar_codigo_organizador,
    verificarcodigo, actualizarcorreo, registrarusuario, login, logout, enviarcodigocambiocontrasena,obteneruniversidades, verificar_preregistro, insertarHoraEntradaPorUsuario, insertarHoraSalidaPorUsuario, inscribirEnConferencia, obtenerCarreras,
    cancelarInscripcionConferencia} from '../Controller/usuario.controller';

const router = express.Router();

router.post('/verificarcodigo', verificarcodigo);
router.post('/verificarorganizador', verificarcodigoorganizador);
router.post('/actualizarcorreo', actualizarcorreo);
router.post('/verificacion/correo', enviarcodigoverificacioncorreo);
router.post('/verificacion/reenviarcorreo', enviarcodigoverificacioncorreo);
router.post('/verificacion/contrasena', enviarcodigocambiocontrasena);
//router.post('/registrar',upload.single('recibo'), procesarRecibo ,registrarusuario, enviarcodigoverificacioncorreo);
router.post('/registrar',registrarusuario, enviarcodigoverificacioncorreo);
router.get('/pre-registro', verificar_preregistro);
router.post('/login', login);
router.post('/logout', logout);
router.post('/cambiarcontrasena', cambiarcontrasena);
router.get('/universidades', obteneruniversidades);
router.post('/verificacion/existe', verificarusuario);
router.post('/verificacion/codigo_organizador', verificar_codigo_organizador);
router.get('/carreras', obtenerCarreras);
router.post('/asistencia/hora/entrada', insertarHoraEntradaPorUsuario);
router.put('/asistencia/hora/salida', insertarHoraSalidaPorUsuario);


router.post('/inscripcion/conferencia', inscribirEnConferencia);
router.delete('/inscripcion/cancelarConferencia', cancelarInscripcionConferencia);
export default router;
