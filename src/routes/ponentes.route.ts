import express from 'express';
import {obtenerUnPonente, obtenerPonentesTotales } from '../Controller/ponentes.controller'
const router = express.Router();

router.get('/:idPonente', obtenerUnPonente);
router.get('/', obtenerPonentesTotales);

export default router;