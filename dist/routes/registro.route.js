"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registro_controller_1 = require("../Controller/registro.controller");
const router = express_1.default.Router();
router.post('/', registro_controller_1.RegistrarUsuario);
exports.default = router;
