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
exports.prueba = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
class prueba {
    static funcionprueba() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_select_tabla');
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static funcionPruebaParametro(id_persona) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_select_tabla_parametro', {
                p_id_persona: id_persona
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static dataInserts(p_nombres, p_apellidos, p_dni, p_telefono, p_fecha_nacimiento, p_genero, p_externo, p_estudiante, p_identificador_unah, p_correo, p_contrasena, p_img_recibo, p_codigo_recibo, p_url_qr) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_insert', {
                p_nombres,
                p_apellidos,
                p_dni,
                p_telefono,
                p_fecha_nacimiento,
                p_genero,
                p_externo,
                p_estudiante,
                p_identificador_unah,
                p_correo,
                p_contrasena,
                p_img_recibo,
                p_codigo_recibo,
                p_url_qr,
            });
            if (error) {
                throw new Error(error.message);
            }
            return data;
        });
    }
    static getUserByDni(dni) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default
                .from('tbl_usuarios')
                .select('*')
                .eq('dni', dni)
                .single(); // Usamos .single() para obtener solo un resultado
            if (error) {
                throw error;
            }
            return data;
        });
    }
}
exports.prueba = prueba;
