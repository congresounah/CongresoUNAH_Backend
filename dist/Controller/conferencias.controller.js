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
exports.obtenerConferenciaPorUsuarioGenerales = exports.obtenerConferenciaPorUsuarioInscripciones = exports.obtenerConferenciasPorFecha = exports.obtenerAsistenciasPorCadaUsuario = exports.obtenerConferenciasPorCadaUsuario = exports.traerRecursosPorConferencia = exports.subirRecursoDeConferencia = exports.eliminarUnaConferencia = exports.editarUnaConferencia = exports.crearUnaConferencia = exports.obtenerUnaConferencia = exports.obtenerConferenciasTotales = void 0;
const conferencias_model_1 = require("../models/conferencias.model");
const googleDrive_1 = require("../services/googleDrive");
const obtenerConferenciasTotales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dia } = req.body;
        const conferencias = yield conferencias_model_1.Conferencia.obtenerConferencias(dia);
        res.status(201).json({
            conferencias
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
exports.obtenerConferenciasTotales = obtenerConferenciasTotales;
const obtenerUnaConferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idConferencia } = req.params;
        const conferencia = yield conferencias_model_1.Conferencia.obtenerConferencia(Number(idConferencia));
        res.status(201).json({
            conferencia
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
exports.obtenerUnaConferencia = obtenerUnaConferencia;
const crearUnaConferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre_conferencia, id_ponente, nombres_ponente, apellidos_ponente, descripcion_ponente, img_perfil_ponente, descripcion_conferencia, direccion, fecha_conferencia, hora_inicio, hora_final, cupos, img_conferecia, url_carpeta_zip } = req.body;
        const nuevaConferencia = yield conferencias_model_1.Conferencia.crearConferencia(nombre_conferencia, id_ponente, nombres_ponente, apellidos_ponente, descripcion_ponente, img_perfil_ponente, descripcion_conferencia, direccion, fecha_conferencia, hora_inicio, hora_final, cupos, img_conferecia, url_carpeta_zip);
        res.status(201).json({ nuevaConferencia });
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
exports.crearUnaConferencia = crearUnaConferencia;
const editarUnaConferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_conferencia, id_ponente, nombre, nombres_ponente, apellidos_ponente, descripcion_conferencia, descripcion_ponente, direccion, fecha_conferencia, hora_inicio, hora_final, cupos, img_conferecia, img_ponente, url_carpeta_zip } = req.body;
        const edicionConferencia = yield conferencias_model_1.Conferencia.editarConferencia(id_conferencia, id_ponente, nombre, nombres_ponente, apellidos_ponente, descripcion_conferencia, descripcion_ponente, direccion, fecha_conferencia, hora_inicio, hora_final, cupos, img_conferecia, img_ponente, url_carpeta_zip);
        res.status(201).json({ edicionConferencia });
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
exports.editarUnaConferencia = editarUnaConferencia;
const eliminarUnaConferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idConferencia } = req.params;
        const eliminarConferencia = yield conferencias_model_1.Conferencia.eliminarConferencia(Number(idConferencia));
        res.status(201).json({ eliminarConferencia });
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
exports.eliminarUnaConferencia = eliminarUnaConferencia;
//Nuevos mètodos hechos por elmer 30 diciembre 2024
//export const insertarRecursoPorConferencia = async(req:Request, res:Response):Promise<any> => {
//    try {
//        const {
//            id_conferencia,
//        } = req.body;
//        
//        const recurso = req.file;
//
//        if (!id_conferencia || !recurso) {
//            return res.status(400).json({ 
//                message: 'id_conferencia y recurso son obligatorios.', 
//                codigoResultado: 0 
//            });
//        }
//
//        const recursoSubido = await subirRecursoDeConferencia(recurso);
//        await Conferencia.insertarRecursoPorConferencia(recursoSubido.webContentLink, recursoSubido.webViewLink, id_conferencia, recursoSubido.name || recursoSubido.originalname || 'Recurso sin nombre');
//        return res.status(201).json({
//            message: 'Recurso subido correctamente',
//            recursoSubido,
//            codigoResultado: 1
//        });
//    } catch (error) {
//        return res.status(500).json({
//            message: 'Error al subir el recurso',
//            error
//        });
//    }
//}
const subirRecursoDeConferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recurso = req.file;
        if (!recurso) {
            return null;
        }
        // Subir el recurso a Google Drive.
        const authClient = yield (0, googleDrive_1.authorize)();
        const folderId = '18td9CBFAS3oTt20eOzKPke63_wyu7Yia'; // ID de la carpeta de recursos en drive.
        const recursoSubido = yield (0, googleDrive_1.uploadFile)(authClient, recurso, folderId);
        return res.status(200).json({
            message: 'Recurso subido correctamente',
            recursoSubido,
            codigoResultado: 1
        });
    }
    catch (error) {
        console.error('Error al subir el recurso:', error);
        throw error;
    }
});
exports.subirRecursoDeConferencia = subirRecursoDeConferencia;
const traerRecursosPorConferencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idConferencia } = req.params;
        if (!idConferencia) {
            return res.status(400).json({
                message: 'id_conferencia es obligatorio',
                codigoResultado: 0
            });
        }
        const recursos = yield conferencias_model_1.Conferencia.traerRecursosPorConferencia(Number(idConferencia));
        if (recursos.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron recursos para la conferencia',
                codigoResultado: 0
            });
        }
        return res.status(201).json({
            recursos,
            message: 'Recursos obtenidos correctamente',
            codigoResultado: 1
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            codigoResultado: 0
        });
    }
});
exports.traerRecursosPorConferencia = traerRecursosPorConferencia;
const obtenerConferenciasPorCadaUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUsuario, dia } = req.body;
        const conferencias = yield conferencias_model_1.Conferencia.obtenerConferenciasPorUsuario(idUsuario, dia);
        res.status(201).json({
            conferencias
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
exports.obtenerConferenciasPorCadaUsuario = obtenerConferenciasPorCadaUsuario;
const obtenerAsistenciasPorCadaUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUsuario } = req.params;
        const conferencias = yield conferencias_model_1.Conferencia.obtenerAsistenciasPorUsuario(Number(idUsuario));
        res.status(201).json({
            conferencias
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
exports.obtenerAsistenciasPorCadaUsuario = obtenerAsistenciasPorCadaUsuario;
const obtenerConferenciasPorFecha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fecha } = req.body;
        const conferencias = yield conferencias_model_1.Conferencia.obtenerConferenciaFecha(fecha);
        res.status(201).json({
            conferencias
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
exports.obtenerConferenciasPorFecha = obtenerConferenciasPorFecha;
const obtenerConferenciaPorUsuarioInscripciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUsuario, fecha } = req.body;
        const conferencias = yield conferencias_model_1.Conferencia.obtenerConferenciaUsuarioInscripciones(idUsuario, fecha);
        res.status(201).json({
            conferencias
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
exports.obtenerConferenciaPorUsuarioInscripciones = obtenerConferenciaPorUsuarioInscripciones;
const obtenerConferenciaPorUsuarioGenerales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUsuario, fecha } = req.body;
        const conferencias = yield conferencias_model_1.Conferencia.obtenerConferenciaUsuarioGenerales(idUsuario, fecha);
        res.status(201).json({
            conferencias
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
exports.obtenerConferenciaPorUsuarioGenerales = obtenerConferenciaPorUsuarioGenerales;
