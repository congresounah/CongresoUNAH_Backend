import { Router } from 'express';
import upload from '../utils/upload'; 
import { uploadImage } from '../Controller/image.controller'; 

const router = Router();


router.post('/upload', upload.single('file'), uploadImage); // Asegúrate de que 'file' es el campo correcto

export default router;