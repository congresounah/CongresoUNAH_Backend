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
exports.Admin = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
class Admin {
    static GetUsuariosValidaciones(estado) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_usuarios_validaciones', {
                validacion_param: estado
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static ValidarUsuarios(id_usuario, nuevo_estado, url_qr) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_cambiar_validacion', {
                p_usuario_id: id_usuario,
                p_nuevo_estado: nuevo_estado,
                p_url_qr: url_qr
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static BuscarUsuario(busqueda) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_buscar_usuario', {
                p_parametro_busqueda: busqueda
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static UpdateUser(p_id_persona, p_nombres, p_apellidos, p_dni, p_correo, p_contrasena) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_actualizar_usuario_persona', {
                p_id_persona: p_id_persona,
                p_nombres: p_nombres,
                p_apellidos: p_apellidos,
                p_dni: p_dni,
                p_correo: p_correo,
                p_contrasena: p_contrasena,
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static GetUserByID(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_buscar_usuario_por_id', {
                id_usuario_param: userID
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static usuario_organizador(correo, codigo_verificacion, id_tipo_verificacion) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_guardar_codigo_verificacion', {
                p_correo: correo,
                p_codigo_verificacion: codigo_verificacion,
                p_id_tipo_verificacion: id_tipo_verificacion
            });
            if (error)
                throw error;
            return data;
        });
    }
    static UsuariosCertificados() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_participantes_certificados');
            if (error) {
                console.error('Error al obtener particiapntes que cumplieron para el certificado:', error);
                throw new Error('Error al obtener particiapntes que cumplieron para el certificado');
            }
            return data;
        });
    }
    static Participante_certificado_por_id(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_participante_certificado_por_id', {
                p_id_usuario: userID
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
}
exports.Admin = Admin;
