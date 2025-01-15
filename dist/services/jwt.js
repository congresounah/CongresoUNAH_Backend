"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = exports.hacerToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hacerToken = (correo, tipo_usuario, nombres, apellidos, id_usuario, numero_cuenta) => {
    const token = jsonwebtoken_1.default.sign({
        correo,
        tipo_usuario,
        nombres,
        apellidos,
        id_usuario,
        numero_cuenta
    }, process.env.SECRET_TOKEN || 'secure_token', {
        expiresIn: '1hr' //Token válido por 1 hora
    });
    return token;
};
exports.hacerToken = hacerToken;
const verificarToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Acceso no autorizado, token no proporcionado",
                codigoResultado: 0
            });
        }
        const decodificar = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN || 'secure_token');
        //obtenemos el usuario ocultado por el token:
        req.usuario = decodificar;
        next();
    }
    catch (error) {
        return res.status(403).json({
            message: "Token inválido o expirado",
            codigoResultado: 0
        });
    }
};
exports.verificarToken = verificarToken;
