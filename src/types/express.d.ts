import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            usuario?: any; // Cambia `any` por el tipo específico que tendrá `usuario` si lo conoces.
        }
    }
}
