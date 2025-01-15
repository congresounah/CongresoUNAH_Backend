import express from 'express';
import upload from '../services/multer';
import {crearUnaConferencia, editarUnaConferencia, eliminarUnaConferencia, obtenerUnaConferencia, 
    obtenerConferenciasTotales, subirRecursoDeConferencia, traerRecursosPorConferencia,
    obtenerConferenciasPorCadaUsuario, obtenerAsistenciasPorCadaUsuario,
    obtenerConferenciasPorFecha, obtenerConferenciaPorUsuarioInscripciones,
    obtenerConferenciaPorUsuarioGenerales} from '../Controller/conferencias.controller'
const router = express.Router();

router.get('/:idConferencia', obtenerUnaConferencia);
router.put('/', obtenerConferenciasTotales);
router.post('/insertar', crearUnaConferencia);
router.put('/editar', editarUnaConferencia);
router.delete('/eliminar/:idConferencia', eliminarUnaConferencia);
router.post('/usuario', obtenerConferenciasPorCadaUsuario);
router.get('/usuario/:idUsuario/asistencias', obtenerAsistenciasPorCadaUsuario);
router.post('/fecha', obtenerConferenciasPorFecha);
router.post('/usuario/inscritas', obtenerConferenciaPorUsuarioInscripciones);
router.post('/usuario/general', obtenerConferenciaPorUsuarioGenerales); //Retorna un campo extra "inscrito" tipo booleano 

//para subir los recursos de una conferencia
router.post('/subirRecurso', upload.single('recurso'), subirRecursoDeConferencia);

router.get('/obtenerRecursos/:idConferencia', traerRecursosPorConferencia);

export default router;
