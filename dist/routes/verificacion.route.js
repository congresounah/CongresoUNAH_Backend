"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verificacion_controller_1 = require("../Controller/verificacion.controller");
const router = express_1.default.Router();
router.post('/verificarcodigo', verificacion_controller_1.verificarCodigo);
router.post('/actualizarcorreo', verificacion_controller_1.actualizarCorreo);
router.post('/enviarcodigo', verificacion_controller_1.enviarCodigo);
exports.default = router;
