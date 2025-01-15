"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../services/multer"));
const conferencias_controller_1 = require("../Controller/conferencias.controller");
const router = express_1.default.Router();
router.get('/:idConferencia', conferencias_controller_1.obtenerUnaConferencia);
router.put('/', conferencias_controller_1.obtenerConferenciasTotales);
router.post('/insertar', conferencias_controller_1.crearUnaConferencia);
router.put('/editar', conferencias_controller_1.editarUnaConferencia);
router.delete('/eliminar/:idConferencia', conferencias_controller_1.eliminarUnaConferencia);
router.post('/usuario', conferencias_controller_1.obtenerConferenciasPorCadaUsuario);
router.get('/usuario/:idUsuario/asistencias', conferencias_controller_1.obtenerAsistenciasPorCadaUsuario);
router.post('/fecha', conferencias_controller_1.obtenerConferenciasPorFecha);
router.post('/usuario/inscritas', conferencias_controller_1.obtenerConferenciaPorUsuarioInscripciones);
router.post('/usuario/general', conferencias_controller_1.obtenerConferenciaPorUsuarioGenerales); //Retorna un campo extra "inscrito" tipo booleano 
//para subir los recursos de una conferencia
router.post('/subirRecurso', multer_1.default.single('recurso'), conferencias_controller_1.subirRecursoDeConferencia);
router.get('/obtenerRecursos/:idConferencia', conferencias_controller_1.traerRecursosPorConferencia);
exports.default = router;
