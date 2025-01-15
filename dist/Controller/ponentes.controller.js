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
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUnPonente = exports.obtenerPonentesTotales = void 0;
const ponentes_model_1 = require("../models/ponentes.model");
const obtenerPonentesTotales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ponentes = yield ponentes_model_1.Ponente.obtenerPonentes();
        res.status(201).json({
            ponentes
        });
    }
    catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : (error === null || error === void 0 ? void 0 : error.toString()) || 'Error desconocido';
        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ',
            error: errorInfo
        });
    }
});
exports.obtenerPonentesTotales = obtenerPonentesTotales;
const obtenerUnPonente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idPonente } = req.params;
        const ponente = yield ponentes_model_1.Ponente.obtenerPonente(Number(idPonente));
        res.status(201).json({
            ponente
        });
    }
    catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : (error === null || error === void 0 ? void 0 : error.toString()) || 'Error desconocido';
        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ',
            error: errorInfo
        });
    }
});
exports.obtenerUnPonente = obtenerUnPonente;
