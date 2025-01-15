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
exports.uploadFile = exports.authorize = void 0;
const googleapis_1 = require("googleapis");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authorize = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtClient = new googleapis_1.google.auth.JWT(process.env.CLIENT_EMAIL, undefined, process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY.replace(/\\n/g, '\n') : '', ['https://www.googleapis.com/auth/drive']);
        yield jwtClient.authorize();
        console.log('Authorization successful!');
        return jwtClient;
    }
    catch (error) {
        console.error('Authorization failed:', error);
        throw error;
    }
});
exports.authorize = authorize;
const uploadFile = (authClient, file, folderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drive = googleapis_1.google.drive({ version: 'v3', auth: authClient });
        const fileMetadata = {
            name: file.originalname, // Usa el nombre del archivo recibido.
            parents: [folderId], // Carpeta de destino en Google Drive.
        };
        const response = yield drive.files.create({
            requestBody: fileMetadata,
            media: {
                mimeType: file.mimetype,
                body: fs_1.default.createReadStream(file.path), // Archivo temporal almacenado por Multer.
            },
            fields: 'id, webContentLink, webViewLink, name',
        });
        yield setFilePermissions(authClient, response.data.id);
        return response.data; // Devuelve el ID del archivo subido.
    }
    catch (error) {
        console.error('Failed to upload file:', error);
        throw error;
    }
});
exports.uploadFile = uploadFile;
const setFilePermissions = (authClient, fileId) => __awaiter(void 0, void 0, void 0, function* () {
    const drive = googleapis_1.google.drive({ version: 'v3', auth: authClient });
    yield drive.permissions.create({
        fileId,
        requestBody: {
            role: 'reader', // Permite solo lectura
            type: 'anyone', // Acceso público
        },
    });
    console.log(`Permisos configurados como públicos para el archivo ${fileId}`);
});
