"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ponentes_controller_1 = require("../Controller/ponentes.controller");
const router = express_1.default.Router();
router.get('/:idPonente', ponentes_controller_1.obtenerUnPonente);
router.get('/', ponentes_controller_1.obtenerPonentesTotales);
exports.default = router;
