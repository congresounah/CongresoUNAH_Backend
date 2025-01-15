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
exports.verificacion = void 0;
const connection_1 = __importDefault(require("../utils/connection")); // Asegúrate de que esta importación sea correcta
class verificacion {
    static guardarCodigoVerificacion(id_usuario, codigo_verificacion) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('p_guardar_codigo_verificacion', {
                    p_id_usuario: id_usuario,
                    p_codigo_verificacion: codigo_verificacion
                });
                if (error)
                    throw error;
                return data;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error('Error desconocido');
                }
            }
        });
    }
    static verificarCodigo(id_usuario, codigo_verificacion) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('p_verificar_codigo', {
                    p_id_usuario: id_usuario,
                    p_codigo_verificacion: codigo_verificacion
                });
                if (error) {
                    throw error;
                }
                return data;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error('Error desconocido');
                }
            }
        });
    }
    // Actualizar el correo del usuario en la base de datos
    static actualizarCorreoUsuario(id_usuario, nuevo_correo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = yield connection_1.default.rpc('p_actualizar_correo_usuario', {
                    p_id_usuario: id_usuario,
                    p_nuevo_correo: nuevo_correo
                });
                if (error)
                    throw error;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error('Error desconocido');
                }
            }
        });
    }
}
exports.verificacion = verificacion;
