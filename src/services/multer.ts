import multer from "multer";
import fs from "fs";
import path from "path";

// Ruta temporal para almacenamiento (compatible con Vercel)
const uploadPath = path.join('/tmp', 'uploads', 'receipts');

// Crear el directorio si no existe
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configurar multer para almacenar imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath); // Carpeta donde se guardarán los recibos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nombre único para el archivo
    }
});

const upload = multer({ storage });

export default upload;
