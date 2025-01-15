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
exports.usuario = void 0;
const connection_1 = __importDefault(require("../utils/connection")); // Asegúrate de que esta importación sea correcta
const dotenv_1 = __importDefault(require("dotenv"));
const jwt_1 = require("../services/jwt");
dotenv_1.default.config();
class usuario {
    static registrarusuario(nombres, apellidos, id_universidad, id_tipo_usuario, dni, telefono, fecha_nacimiento, genero, identificador_unah, correo, contrasena, img_recibo, codigo_recibo, codigo_organizador, id_carrera_unah) {
        return __awaiter(this, void 0, void 0, function* () {
            let externo = false;
            let estudiante = false;
            if (correo.endsWith('@unah.edu.hn')) {
                externo = false;
                estudiante = false;
            }
            else if (correo.endsWith('@unah.hn')) {
                externo = false;
                estudiante = true;
            }
            else {
                externo = true;
                estudiante = false;
                identificador_unah = "1";
            }
            if (codigo_recibo) {
                id_tipo_usuario = 1;
                codigo_organizador = "0";
            }
            else if (codigo_organizador === '1234') {
                id_tipo_usuario = 2;
                codigo_recibo = '1';
                img_recibo = '1';
            }
            else if (codigo_organizador) {
                throw new Error('Ingrese un código de organizador correcto.');
            }
            else {
                throw new Error('Debe proporcionar un código de recibo o el código de organizador correcto.');
            }
            const { data: duplicados, error: errorDuplicados } = yield connection_1.default.rpc('p_verificar_duplicados', {
                p_dni: 'null',
                p_identificador_unah: identificador_unah,
                p_correo: correo,
                p_codigo_recibo: codigo_recibo,
            });
            if (errorDuplicados) {
                console.error('Error al verificar duplicados:', errorDuplicados);
                throw new Error('Error al verificar duplicados.');
            }
            if (duplicados && duplicados.length > 0) {
                const duplicado = duplicados[0];
                throw new Error(`El campo '${duplicado.campo_duplicado}' con el valor '${duplicado.valor}' ya está en uso.`);
            }
            const { data: PersonaData, error: PersonaError } = yield connection_1.default.rpc('p_insertar_persona', {
                p_nombres: nombres,
                p_apellidos: apellidos,
            });
            if (PersonaError) {
                console.error('Error al insertar persona:', PersonaError);
                throw new Error('Error al insertar persona');
            }
            if (!PersonaData || typeof PersonaData !== 'number') {
                throw new Error('El procedimiento almacenado no devolvió un ID válido para la persona.');
            }
            const id_persona = PersonaData;
            try {
                const { data, error } = yield connection_1.default.rpc('p_insertar_usuario', {
                    p_id_persona: id_persona,
                    p_id_universidad: id_universidad,
                    p_id_tipo_usuario: id_tipo_usuario,
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
                    p_codigo_recibo: codigo_recibo,
                    p_codigo_organizador: codigo_organizador,
                    p_id_carrera_unah: id_carrera_unah
                });
                if (error) {
                    console.error('Error al insertar usuario:', error);
                    if (error.message.includes('No se permiten más registros')) {
                        throw new Error('El límite de usuarios para el congreso ha sido alcanzado.');
                    }
                    throw new Error('Error al insertar usuario');
                }
                return data;
            }
            catch (dbError) {
                const error = dbError;
                console.error('Error de la base de datos:', dbError);
                if (error.message.includes('No se permiten más registros')) {
                    throw new Error('El límite de usuarios para el congreso ha sido alcanzado.');
                }
                throw new Error('Error al realizar la operación en la base de datos.');
            }
        });
    }
    static usuariocodigocorreo(correo, codigo_verificacion, id_tipo_verificacion) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('p_guardar_codigo_verificacion', {
                    p_codigo_verificacion: codigo_verificacion,
                    p_id_tipo_verificacion: id_tipo_verificacion,
                    p_correo: correo
                });
                if (error)
                    throw error;
                return data;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error('Error al guardar el codigo de verificacion');
                }
                else {
                    throw new Error('El correo proporcionado no está asociado a ningún usuario');
                }
            }
        });
    }
    static usuarioverificarcorreo(correo, codigo_verificacion) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('p_verificar_codigo', {
                    p_correo: correo,
                    p_codigo_verificacion: codigo_verificacion
                });
                if (error) {
                    throw error;
                }
                if (!data) {
                    throw new Error('La función no devolvió datos.');
                }
                if (typeof data !== 'object' || Array.isArray(data) || data === null) {
                    throw new Error('La respuesta no tiene el formato esperado.');
                }
                const { codigo_resultado, message, valor_usuario } = data;
                return { codigo_resultado, message, valor_usuario };
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
    static usuarioexternoactualizarcorreo(id_usuario, nuevo_correo) {
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
    static login(correo, contrasenia) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('p_login', {
                    p_correo: correo,
                    p_contrasenia: contrasenia
                });
                console.log(data);
                if (error) {
                    throw new Error(`Ocurrió el siguiente error ${error.message}`);
                }
                if (!data || data.length === 0 || data.codigo_resultado === 0) {
                    throw new Error("Credenciales inválidas");
                }
                //Falso
                if (data.codigo_resultado === -1) {
                    throw new Error("Su comprobante ha sido denegado, por favor vuelva a intentarlo mandando su comprobante al correo: ");
                }
                if (data.codigo_resultado === 2) {
                    throw new Error("Su comprobante de pago aún está en proceso de verificación, por favor vuelva a intentarlo más tarde.");
                }
                if (data.codigo_resultado === -3) {
                    throw new Error("No puede iniciar sesión, debe de confirmar su cuenta de correo.");
                }
                if (data.codigo_resultado === -4) {
                    throw new Error("No tiene una cuenta creada, por favor registrese.");
                }
                const token = (0, jwt_1.hacerToken)(data.correo_salida, data.p_tipo_usuario, data.nombres, data.apellidos, data.id_usuario_salida, data.numero_cuenta);
                const resultado = yield this.insertarTokenDelUsuario(data.correo_salida, data.contrasenia_salida, token);
                data.token = token;
                console.log(data);
                return data;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("Error desconocido");
                }
            }
        });
    }
    static insertarTokenDelUsuario(correo, contrasenia, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('insertar_token_usuario', {
                    p_correo: correo,
                    p_contrasenia: contrasenia,
                    p_token: token
                });
                if (error) {
                    throw new Error(`Ocurrió el siguiente error ${error.message}`);
                }
                console.log(data);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("Error desconocido");
                }
            }
        });
    }
    static logout(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('logout', {
                    p_correo: correo
                });
                if (error) {
                    throw new Error(`Ocurrió el siguiente error ${error.message}`);
                }
                return data;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("Error desconocido");
                }
            }
        });
    }
    static cambiarcontrasena(correo, nueva_contrasena) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('p_cambiar_contrasena', {
                    p_correo: correo,
                    p_nueva_contrasena: nueva_contrasena,
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
    static verificar_usuario_organizador(correo, codigo_verificacion) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('p_verificar_codigo_usuario_verificado', {
                    p_correo: correo,
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
    static verificarcorreo(correo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_verificar_correo', {
                p_correo: correo
            });
            if (error) {
                console.error('Error al verificar el correo:', error);
                throw new Error('Error al verificar el correo');
            }
            return data;
        });
    }
    static obteneruniversidades() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_obtener_universidades');
            if (error) {
                console.error('Error al obtener universidades:', error);
                throw new Error('Error al obtener universidades');
            }
            return data || [];
        });
    }
    static verificar_preregistro() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_verificar_preregistro', {});
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static obtenerCareerasUNAH() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_carreras_unah');
            if (error) {
                console.error('Error al obtener universidades:', error);
                throw new Error('Error al obtener universidades');
            }
            return data;
        });
    }
    static insertarHoraEntrada(idUsuario, idConferencia, horaEntrada) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_crear_asistencia', {
                p_id_usuario: idUsuario,
                p_id_conferencia: idConferencia,
                p_hora_entrada: horaEntrada
            });
            if (error) {
                throw error;
            }
            ;
            return data;
        });
    }
    static insertarHoraSalida(idUsuario, idConferencia, horaSalida) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_asistencia_hora_salida', {
                p_id_usuario: idUsuario,
                p_id_conferencia: idConferencia,
                p_hora_salida: horaSalida
            });
            if (error) {
                throw error;
            }
            ;
            return data;
        });
    }
    static insertarUsuarioEnConferencia(id_usuario, id_conferencia) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('p_insertar_registro_en_conferencia', {
                    p_id_usuario: id_usuario,
                    p_id_conferencia: id_conferencia
                });
                console.log(data);
                console.log(error);
                if (error) {
                    throw new Error(error.message);
                }
                return data;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("Error desconocido");
                }
            }
        });
    }
    static cancelarInscripcionEnConferencia(id_usuario, id_conferencia) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield connection_1.default.rpc('p_cancelar_inscripcion_en_conferencia', {
                    p_id_usuario: id_usuario,
                    p_id_conferencia: id_conferencia
                });
                if (error) {
                    throw new Error(error.message);
                }
                return data;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("Error desconocido");
                }
            }
        });
    }
}
exports.usuario = usuario;
