"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prueba_controller_1 = require("../Controller/prueba.controller");
const router = express_1.default.Router();
router.post('/insert', prueba_controller_1.insertUser);
router.get('/user/:dni', prueba_controller_1.getUserInfo);
exports.default = router;
