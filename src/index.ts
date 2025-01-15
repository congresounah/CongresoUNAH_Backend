import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// importacion rutas

import adminrouter from './routes/Admin.route'
import usuarioRouter from './routes/usuario.route';
import conferenciasRouter from './routes/conferencias.routes'
import ponentesRouter from './routes/ponentes.route'
import imageRouter from './routes/image.route'

dotenv.config();
require('dotenv').config();
const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//rutas
app.use('/admin',adminrouter)
app.use('/conferencias', conferenciasRouter);
app.use('/ponentes', ponentesRouter);
app.use('/usuario', usuarioRouter);
app.use('/image', imageRouter);

//Servidor Raiz.
app.get('/', (req: Request, res: Response) => {
    res.send('Root server is on yei :3 lol ');
});

//Mensaje de consola que dice que funciona.
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port} :p`);
});