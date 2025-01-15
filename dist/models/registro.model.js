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
exports.registro = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
class registro {
    static registrarusuario(nombres_1, apellidos_1, dni_1, telefono_1, fecha_nacimiento_1, genero_1) {
        return __awaiter(this, arguments, void 0, function* (nombres, apellidos, dni, telefono, fecha_nacimiento, genero, identificador_unah = null, correo, contrasena, img_recibo, codigo_recibo) {
            let externo = false;
            let estudiante = false;
            if (correo.endsWith('@unah.edu.hn')) {
                externo = false;
                estudiante = false;
                identificador_unah = identificador_unah || 0;
            }
            else if (correo.endsWith('@unah.hn')) {
                externo = false;
                estudiante = true;
                identificador_unah = identificador_unah || 0;
            }
            else {
                externo = true;
                estudiante = false;
                identificador_unah = 0;
            }
            const { data: PersonaData, error: PersonaError } = yield connection_1.default.rpc('p_insertar_persona', {
                p_nombres: nombres,
                p_apellidos: apellidos
            });
            if (PersonaError) {
                console.error('Error al insertar persona:', PersonaError);
                throw new Error('Error al insertar persona');
            }
            if (!PersonaData || typeof PersonaData !== 'number') {
                throw new Error('El procedimiento almacenado no devolvió un ID válido para la persona.');
            }
            const id_persona = PersonaData;
            // Insertar usuario en la base de datos
            const { data, error } = yield connection_1.default.rpc('p_insertar_usuario', {
                p_id_persona: id_persona,
                p_dni: dni,
                p_telefono: telefono,
                p_fecha_nacimiento: fecha_nacimiento,
                p_genero: genero,
                p_externo: externo,
                p_estudiante: estudiante,
                p_identificador_unah: identificador_unah,
                p_correo: correo,
                p_contrasena: contrasena,
                p_img_recibo: img_recibo,
                p_codigo_recibo: codigo_recibo
            });
            if (error) {
                console.error('Error al insertar usuario:', error);
                throw new Error('Error al insertar usuario');
            }
            return data;
        });
    }
}
exports.registro = registro;
