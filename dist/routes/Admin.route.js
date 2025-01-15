"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Admin_controller_1 = require("../Controller/Admin.controller");
const router = express_1.default.Router();
router.post('/validaciones', Admin_controller_1.GetUsuariosValidaciones);
router.put('/validar/usuario/:id_usuario', Admin_controller_1.ValidarUsuario);
router.post('/buscar', Admin_controller_1.BuscarUsuario);
router.put('/actualizar/usuario/:id_usuario', Admin_controller_1.ActualizarUsuario);
router.get('/user/:id_user', Admin_controller_1.GetUserByID);
router.post('/codigo/usuario_organizador', Admin_controller_1.enviar_correo_organizador);
router.post('/certificates/send-all', Admin_controller_1.sendCertificates);
router.post('/certificates/send/:id_user', Admin_controller_1.sendOneCertificate);
router.get('/certificates/download/:id_user', Admin_controller_1.downloadCertificate);
router.get('/certificates/accepted/users', Admin_controller_1.GetUsuariosAptosCertificados);
exports.default = router;
