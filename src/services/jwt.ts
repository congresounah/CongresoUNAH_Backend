import jwt from 'jsonwebtoken'
import {NextFunction, Request, Response} from 'express'
import dotenv from 'dotenv'
dotenv.config()

export const hacerToken = (correo: any, tipo_usuario:any, nombres:any, apellidos:any, id_usuario:any, numero_cuenta:any): any => {
    const token = jwt.sign(
        {
            correo,
            tipo_usuario, 
            nombres,
            apellidos,
            id_usuario,
            numero_cuenta
        },
        process.env.SECRET_TOKEN || 'secure_token',
        {
            expiresIn: '1hr' //Token válido por 1 hora
        }
    );

    return token;
}

export const verificarToken = (req:Request, res:Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message: "Acceso no autorizado, token no proporcionado",
                codigoResultado : 0
            })
        }

        const decodificar = jwt.verify(token, process.env.SECRET_TOKEN || 'secure_token');

        //obtenemos el usuario ocultado por el token:
        req.usuario = decodificar;
        next();

    } catch (error) {
        return res.status(403).json({
        message: "Token inválido o expirado",
        codigoResultado: 0
    });
    }
}