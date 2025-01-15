import { Conferencia } from '../models/conferencias.model'
import { Request, Response } from 'express'
import { authorize, uploadFile } from '../services/googleDrive'


export const obtenerConferenciasTotales = async (req: Request, res: Response) => {
    try {
        const { dia } = req.body;

        const conferencias = await Conferencia.obtenerConferencias(dia);

        res.status(201).json({
            conferencias
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

export const obtenerUnaConferencia = async (req: Request, res: Response) => {
    try {
        const { idConferencia } = req.params;
        
        const conferencia = await Conferencia.obtenerConferencia(Number(idConferencia));
        
        res.status(201).json({
            conferencia
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

export const crearUnaConferencia = async (req: Request, res: Response) => {
    try {
        const {
            nombre_conferencia,
            id_ponente,
            nombres_ponente,
            apellidos_ponente,
            descripcion_ponente,
            img_perfil_ponente,
            descripcion_conferencia,
            direccion,
            fecha_conferencia,
            hora_inicio,
            hora_final,
            cupos,
            img_conferecia,
            url_carpeta_zip
        } = req.body;

        const nuevaConferencia = await Conferencia.crearConferencia(
            nombre_conferencia,
            id_ponente,
            nombres_ponente,
            apellidos_ponente,
            descripcion_ponente,
            img_perfil_ponente,
            descripcion_conferencia,
            direccion,
            fecha_conferencia,
            hora_inicio,
            hora_final,
            cupos,
            img_conferecia,
            url_carpeta_zip
            );
    
        res.status(201).json({nuevaConferencia});
    } catch (error: any) {
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


export const editarUnaConferencia = async (req: Request, res: Response) => {
    try {
        const {
            id_conferencia,
            id_ponente,
            nombre,
            nombres_ponente,
            apellidos_ponente,
            descripcion_conferencia,
            descripcion_ponente,
            direccion,
            fecha_conferencia,
            hora_inicio,
            hora_final,
            cupos,
            img_conferecia,
            img_ponente,
            url_carpeta_zip
        } = req.body;
        
        const edicionConferencia = await Conferencia.editarConferencia(
            id_conferencia,
            id_ponente,
            nombre,
            nombres_ponente,
            apellidos_ponente,
            descripcion_conferencia,
            descripcion_ponente,
            direccion,
            fecha_conferencia,
            hora_inicio,
            hora_final,
            cupos,
            img_conferecia,
            img_ponente,
            url_carpeta_zip
        );
    
        res.status(201).json({edicionConferencia});
    } catch (error: any) {
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

export const eliminarUnaConferencia = async (req: Request, res: Response) => {
    try {
        const { idConferencia } = req.params;
        
        const eliminarConferencia = await Conferencia.eliminarConferencia(Number(idConferencia));
        
        res.status(201).json({eliminarConferencia});
    } catch (error: any) {
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

//Nuevos mètodos hechos por elmer 30 diciembre 2024
//export const insertarRecursoPorConferencia = async(req:Request, res:Response):Promise<any> => {
//    try {
//        const {
//            id_conferencia,
//        } = req.body;
//        
//        const recurso = req.file;
//
//        if (!id_conferencia || !recurso) {
//            return res.status(400).json({ 
//                message: 'id_conferencia y recurso son obligatorios.', 
//                codigoResultado: 0 
//            });
//        }
//
//        const recursoSubido = await subirRecursoDeConferencia(recurso);
//        await Conferencia.insertarRecursoPorConferencia(recursoSubido.webContentLink, recursoSubido.webViewLink, id_conferencia, recursoSubido.name || recursoSubido.originalname || 'Recurso sin nombre');
//        return res.status(201).json({
//            message: 'Recurso subido correctamente',
//            recursoSubido,
//            codigoResultado: 1
//        });
//    } catch (error) {
//        return res.status(500).json({
//            message: 'Error al subir el recurso',
//            error
//        });
//    }
//}

export const subirRecursoDeConferencia = async (req: Request, res:Response): Promise<any> => {
    try {
        const recurso = req.file;

        if (!recurso) {
            return null;
        }

        // Subir el recurso a Google Drive.
        const authClient = await authorize();
        const folderId = '18td9CBFAS3oTt20eOzKPke63_wyu7Yia'; // ID de la carpeta de recursos en drive.
        const recursoSubido = await uploadFile(authClient, recurso, folderId);
        return res.status(200).json({
            message: 'Recurso subido correctamente',
            recursoSubido,
            codigoResultado: 1
        })
    } catch (error) {
        console.error('Error al subir el recurso:', error);
        throw error;
    }

};

export const traerRecursosPorConferencia = async (req: Request, res: Response):Promise<any>  => {
    try {
        const { idConferencia } = req.params;

        if (!idConferencia) {
            return res.status(400).json({
                message: 'id_conferencia es obligatorio',
                codigoResultado: 0
            });
        }

        const recursos = await Conferencia.traerRecursosPorConferencia(Number(idConferencia));

        if (recursos.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron recursos para la conferencia',
                codigoResultado: 0
            });
        }

        return res.status(201).json({
            recursos,
            message: 'Recursos obtenidos correctamente',
            codigoResultado: 1
        });
    } catch (error:unknown) {
        return res.status(500).json({
            message: (error as Error).message,
            codigoResultado: 0
        })
    }
}

export const obtenerConferenciasPorCadaUsuario = async (req: Request, res: Response) => {
    try {
        const { idUsuario, dia } = req.body;
        
        const conferencias = await Conferencia.obtenerConferenciasPorUsuario(idUsuario, dia);
        
        res.status(201).json({
            conferencias
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

export const obtenerAsistenciasPorCadaUsuario = async (req: Request, res: Response) => {
    try{
        const {idUsuario} = req.params;

        const conferencias = await Conferencia.obtenerAsistenciasPorUsuario(Number(idUsuario));

        res.status(201).json({
            conferencias
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
}

export const obtenerConferenciasPorFecha = async (req: Request, res: Response) => {
    try{
        const {fecha} = req.body;

        const conferencias = await Conferencia.obtenerConferenciaFecha(fecha);

        res.status(201).json({
            conferencias
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
}

export const obtenerConferenciaPorUsuarioInscripciones = async (req: Request, res: Response) => {
    try{
        const {idUsuario, fecha} = req.body;

        const conferencias = await Conferencia.obtenerConferenciaUsuarioInscripciones(idUsuario, fecha);

        res.status(201).json({
            conferencias
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
}

export const obtenerConferenciaPorUsuarioGenerales = async (req: Request, res: Response) => {
    try{
        const {idUsuario, fecha} = req.body;

        const conferencias = await Conferencia.obtenerConferenciaUsuarioGenerales(idUsuario, fecha);

        res.status(201).json({
            conferencias
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
}