import { Ponente } from '../models/ponentes.model'
import { Request, Response } from 'express'


export const obtenerPonentesTotales = async (req: Request, res: Response) => {
    try {
        const ponentes = await Ponente.obtenerPonentes();

        res.status(201).json({
            ponentes
        });
    }
    catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';

        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ', 
            error: errorInfo
        });
    }
}

export const obtenerUnPonente = async (req: Request, res: Response) => {
    try {
        const { idPonente } = req.params;
        
        const ponente = await Ponente.obtenerPonente(Number(idPonente));
        
        res.status(201).json({
            ponente
        })
    } catch (error) {
        const errorInfo = error && typeof error === 'object'
            ? JSON.stringify(error, null, 2)
            : error?.toString() || 'Error desconocido';

        console.error('Informacion del error: ', errorInfo);
        res.status(500).json({
            message: 'Informacion del error: ', 
            error: errorInfo
        });
    }
};
