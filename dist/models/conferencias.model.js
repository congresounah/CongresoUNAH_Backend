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
exports.Conferencia = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
class Conferencia {
    static obtenerConferencias(dia) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_obtener_conferencias', {
                p_dia: dia
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static obtenerConferencia(id_conferencia) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_obtener_conferencia', {
                p_id_conferencia: id_conferencia
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static crearConferencia(nombre_conferencia, id_ponente, nombres_ponente, apellidos_ponente, descripcion_ponente, img_perfil_ponente, descripcion_conferencia, direccion, fecha_conferencia, hora_inicio, hora_final, cupos, img_conferecia, url_carpeta_zip) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_crear_conferencia', {
                p_nombre_conferencia: nombre_conferencia,
                p_id_ponente: id_ponente,
                p_nombres_ponente: nombres_ponente,
                p_apellidos_ponente: apellidos_ponente,
                p_descripcion_ponente: descripcion_ponente,
                p_img_perfil_ponente: img_perfil_ponente,
                p_descripcion_conferencia: descripcion_conferencia,
                p_direccion: direccion,
                p_fecha_conferencia: fecha_conferencia,
                p_hora_inicio: hora_inicio,
                p_hora_final: hora_final,
                p_cupos: cupos,
                p_img_conferecia: img_conferecia,
                p_url_carpeta_zip: url_carpeta_zip
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static editarConferencia(id_conferencia, id_ponente, nombre, nombres_ponente, apellidos_ponente, descripcion_conferencia, descripcion_ponente, direccion, fecha_conferencia, hora_inicio, hora_final, cupos, img_conferecia, img_ponente, url_carpeta_zip) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_editar_conferencia', {
                p_id_conferencia: id_conferencia,
                p_id_ponente: id_ponente,
                p_nombre: nombre,
                p_nombres_ponente: nombres_ponente,
                p_apellidos_ponente: apellidos_ponente,
                p_descripcion_conferencia: descripcion_conferencia,
                p_descripcion_ponente: descripcion_ponente,
                p_direccion: direccion,
                p_fecha_conferencia: fecha_conferencia,
                p_hora_inicio: hora_inicio,
                p_hora_final: hora_final,
                p_cupos: cupos,
                p_img_conferecia: img_conferecia,
                p_img_ponente: img_ponente,
                p_url_carpeta_zip: url_carpeta_zip
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static eliminarConferencia(idConferencia) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_eliminar_conferencia', {
                p_id_conferencia: idConferencia
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static insertarRecursoPorConferencia(url_descarga, url_vista_previa, id_conferencia, nombre_recurso) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('insertar_recurso', {
                    p_url_descarga: url_descarga,
                    p_url_vista_previa: url_vista_previa,
                    p_id_conferencia: id_conferencia,
                    p_nombre_recurso: nombre_recurso
                });
                return data;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    static traerRecursosPorConferencia(id_conferencia) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('traer_recurso_por_conferencia', {
                p_id_conferencia: id_conferencia
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static obtenerConferenciasPorUsuario(id_usuario, dia) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_conferencias_por_usuario', {
                p_id_usuario: id_usuario,
                p_dia: dia
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static obtenerAsistenciasPorUsuario(idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_asistencias_usuario', {
                p_id_usuario: idUsuario
            });
            if (error) {
                throw error;
            }
            ;
            return data;
        });
    }
    static obtenerConferenciaFecha(fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_obtener_conferencias_por_fecha', {
                p_fecha_actual: fecha
            });
            if (error) {
                throw error;
            }
            ;
            return data;
        });
    }
    static obtenerConferenciaUsuarioGenerales(idUsuario, fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_obtener_conferencias_usuario_nuevo_campo', {
                p_id_usuario: idUsuario,
                p_dia: fecha
            });
            if (error) {
                throw error;
            }
            ;
            return data;
        });
    }
    static obtenerConferenciaUsuarioInscripciones(idUsuario, fecha) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_obtener_conferencias_inscritas_por_usuario', {
                p_id_usuario: idUsuario,
                p_dia: fecha
            });
            if (error) {
                throw error;
            }
            ;
            return data;
        });
    }
}
exports.Conferencia = Conferencia;
