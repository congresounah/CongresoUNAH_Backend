"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Ruta temporal para almacenamiento (compatible con Vercel)
const uploadPath = path_1.default.join('/tmp', 'uploads', 'receipts');
// Crear el directorio si no existe
if (!fs_1.default.existsSync(uploadPath)) {
    fs_1.default.mkdirSync(uploadPath, { recursive: true });
}
// Configurar multer para almacenar imágenes
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); // Carpeta donde se guardarán los recibos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nombre único para el archivo
    }
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
