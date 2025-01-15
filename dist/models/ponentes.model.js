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
exports.Ponente = void 0;
const connection_1 = __importDefault(require("../utils/connection"));
class Ponente {
    static obtenerPonentes() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_obtener_ponentes', {});
            if (error) {
                throw error;
            }
            return data;
        });
    }
    static obtenerPonente(id_ponente) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield connection_1.default.rpc('p_obtener_ponente', {
                p_id_ponente: id_ponente
            });
            if (error) {
                throw error;
            }
            return data;
        });
    }
}
exports.Ponente = Ponente;
