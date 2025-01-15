import { Request, Response, NextFunction } from 'express';
import { sendVerificationEmail } from '../services/emailservice';
import upload from '../services/multer'
import { usuario } from '../models/usuario.model';
import validator from 'email-validator';
import cloudinary from "../services/cloudinary";
import fs from 'fs';

//  export const procesarRecibo = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
//  try {

//   if (!req.file) {
//     return res.status(400).json({ message: "No se recibió el archivo del recibo." });
//   }

//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//   if (!allowedTypes.includes(req.file.mimetype)) {
//     return res.status(400).json({ message: "El archivo debe ser una imagen (jpeg, jpg, png)." });
//   }

//   next();
// } catch (error) {
//   console.error("Error en el middleware de recibo:", error);
//   res.status(500).json({ message: "Hubo un problema al procesar el recibo.", error });
// }
// };

export const registrarusuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      nombres,
      apellidos,
      id_universidad,
      id_tipo_usuario,
      telefono,
      dni,
      fecha_nacimiento,
      genero,
      identificador_unah,
      correo,
      contrasena,
      img_recibo,
      codigo_recibo,
      codigo_organizador,
      id_carrera_unah
    } = req.body;

    if (!nombres || !apellidos || !telefono || !fecha_nacimiento || !dni || !correo || !contrasena) {
      res.status(400).json({ message: 'Faltan datos requeridos en la solicitud' });
      return;
    }

    const resultado = await usuario.registrarusuario(
      nombres,
      apellidos,
      id_universidad,
      id_tipo_usuario,
      dni,
      telefono,
      fecha_nacimiento,
      genero,
      identificador_unah,
      correo,
      contrasena,
      img_recibo,
      codigo_recibo,
      codigo_organizador,
      id_carrera_unah
    );

    if (!validator.validate(correo)) {
      res.status(400).json({ message: 'Correo electrónico inválido.' });
      return;
    }

    const codigo_verificacion = Math.floor(100000 + Math.random() * 900000).toString();
    const id_tipo_verificacion = 1;

    const coincide = await usuario.verificarcorreo(correo);

    if (coincide) {
      await usuario.usuariocodigocorreo(correo, codigo_verificacion, id_tipo_verificacion);
      await sendVerificationEmail(correo, codigo_verificacion);

      res.status(200).json({ message: 'Usuario registrado y código de verificación enviado correctamente.' });
    } else {
      res.status(400).json({ message: 'El código de verificación tuvo un problema para enviarse.' });
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    const err = error as Error;
    if (err.message.includes('El límite de usuarios para el congreso ha sido alcanzado')) {
      res.status(403).json({ message: err.message });
    } else {
      res.status(500).json({
        message: 'Hubo un problema al registrar el usuario',
        error: err.message || error,
      });
    }
  }
};


export const enviarcodigoverificacioncorreo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { correo } = req.body;

    const codigo_verificacion = Math.floor(100000 + Math.random() * 900000).toString();

    const id_tipo_verificacion = 1;

    const coincide = await usuario.verificarcorreo(correo);

    if (coincide) {

      try {
        await usuario.usuariocodigocorreo(correo, codigo_verificacion, id_tipo_verificacion);
        await sendVerificationEmail(correo, codigo_verificacion);

        return res.status(200).json({ message: 'Código de verificación enviado correctamente.' });
      } catch (err) {
        console.error('Error al enviar código de verificación:', err);
        return res.status(500).json({ message: 'Hubo un problema al enviar el código de verificación.' });
      }
    } else {
      return res.status(400).json({ message: 'El correo electrónico no coincide con el usuario proporcionado.' });
    }

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Stack trace:', error.stack);
      return res.status(500).json({ message: error.message });
    } else {
      console.error('Error no identificado:', error);
      return res.status(500).json({ message: 'Error desconocido.' });
    }
  }
};


export const enviarcodigocambiocontrasena = async (req: Request, res: Response): Promise<any> => {
  try {
    const { correo } = req.body;

    if (!validator.validate(correo)) {
      return res.status(400).json({ message: 'Correo electrónico inválido.' });
    }

    const codigo_verificacion = Math.floor(100000 + Math.random() * 900000).toString();
    const id_tipo_verificacion = 2;

    await usuario.usuariocodigocorreo(correo, codigo_verificacion, id_tipo_verificacion);

    await sendVerificationEmail(correo, codigo_verificacion);

    return res.status(200).json({ message: 'Código de verificación para cambio de contraseña enviado correctamente.' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Stack trace:', error.stack);
      return res.status(500).json({ message: error.message });
    } else {
      console.error('Error no identificado:', error);
      return res.status(500).json({ message: 'El correo proporcionado no está asociado a ningún usuario.' });
    }
  }
};

export const verificarcodigo = async (req: Request, res: Response) => {
  const { correo, codigo_verificacion } = req.body;

  if (!correo || !codigo_verificacion) {
    res.status(400).json({ error: 'Faltan parámetros requeridos.' });
    return;
  }

  try {
    const {codigo_resultado, message, valor_usuario } = await usuario.usuarioverificarcorreo(correo, codigo_verificacion);

    res.status(200).json({codigo_resultado, message, valor_usuario});
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido.' });
  }
};


export const verificarcodigoorganizador = async (req: Request, res: Response) => {
  const { correo, codigo_verificacion } = req.body;

  if (!correo || !codigo_verificacion) {
    res.status(400).json({ error: 'Faltan parámetros requeridos.' });
    return;
  }

  try {
    const isValid = await usuario.verificar_usuario_organizador(correo, codigo_verificacion);
    if (isValid) {
      res.status(200).json({ message: 'Código verificado correctamente.' });
    } else {
      res.status(400).json({ error: 'Código de verificación inválido o expirado.' });
    }
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido.' });
  }
}

export const actualizarcorreo = async (req: Request, res: Response) => {
  const { id_usuario, nuevo_correo } = req.body;

  if (!id_usuario || !nuevo_correo) {
    res.status(400).json({ error: 'Faltan parámetros requeridos.' });
    return;
  }

  try {
    await usuario.usuarioexternoactualizarcorreo(id_usuario, nuevo_correo);
    res.status(200).json({ message: 'Correo actualizado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error desconocido.' });
  }
}

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { correo, contrasenia } = req.body;

    if (!correo || !contrasenia) {
      return res.status(401).json({
        message: "Correo y contraseña son requeridos",
        codigoResultado: 0,
        data: []
      });
    }

    const resultado = await usuario.login(correo, contrasenia);

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      codigoResultado: resultado.codigo_resultado,
      tipo_usuario: resultado.p_tipo_usuario,
      token: resultado.token,
    })
  } catch (error: unknown) {
    console.log(error)
    // Manejo de errores
    if (error instanceof Error && error.message === "Credenciales inválidas") {
      return res.status(401).json({
        message: "Credenciales inválidas",
        codigoResultado: 0,
        data: []
      });
    }

    if (error instanceof Error && error.message === "Su comprobante ha sido denegado, por favor vuelva a intentarlo mandando su comprobante al correo: ") {
      return res.status(403).json({
        message: "Su comprobante ha sido denegado, por favor vuelva a intentarlo mandando su comprobante al correo: congresofacultadingenieriaunah@gmail.com",
        codigoResultado: -1
      })
    }

    if (error instanceof Error && error.message === "Su comprobante de pago aún está en proceso de verificación, por favor vuelva a intentarlo más tarde.") {
      return res.status(403).json({
        message: "Su comprobante de pago aún está en proceso de verificación, por favor vuelva a intentarlo más tarde.",
        codigoResultado: 2
      })
    }

    if(error instanceof Error && error.message === "No puede iniciar sesión, debe de confirmar su cuenta de correo."){
      return res.status(403).json({
        message: "No puede iniciar sesión, debe de confirmar su cuenta de correo.",
        codigoResultado: -3
      })
    }

    if(error instanceof Error && error.message === "No tiene una cuenta creada, por favor registrese."){
      return res.status(403).json({
        message: "No tiene una cuenta creada, por favor registrese.",
        codigoResultado: -4
      })
  }

  if (error) {
    return res.status(500).json({
      message: "Error interno del servidor backend", error,
      codigoResultado: -2
    })
  }
}
}

export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    const correo = req.body.correo;

    if (!correo) {
      return res.status(401).json({
        message: "Se necesitan credenciales",
        codigoResultado: 0
      });
    }

    const resultado = await usuario.logout(correo);
    console.log(resultado)
    if (resultado === 1) {
      return res.status(200).json({
        message: "Cierre de sesión correcto",
        codigoResultado: 1
      });
    } else {
      return res.status(401).json({
        message: "No se pudo cerrar sesión o el usuario ya tenia cerrada la sesión, verificar existencia del token",
        codigoResultado: 0
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error interno del servidor",
      codigoResultado: -1,
      data: []
    });
  }
}

export const cambiarcontrasena = async (req: Request, res: Response): Promise<any> => {
  const { correo, nueva_contrasena } = req.body;

  if (!correo || !nueva_contrasena) {
    return res.status(400).json({ message: 'Todos los campos son requeridos.' });
  }

  try {
    const resultado = await usuario.cambiarcontrasena(
      correo,
      nueva_contrasena
    );
    res.status(201).json(resultado);
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    const err = error as Error;
    res.status(500).json({
      message: 'Hubo un problema al cambiar contraseña',
      error: err.message || error,
    });
  }
}


export const obteneruniversidades = async (req: Request, res: Response): Promise<any> => {
  try {
    const universidades = await usuario.obteneruniversidades();
    return res.status(200).json(universidades);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'Error desconocido.' });
    }
  }
};

export const verificarusuario = async (req: Request, res: Response) => {
  const { correo } = req.body

  try {

    const resultado = await usuario.verificarcorreo(String(correo))
    res.status(200).json({
      resultado
    });

  } catch (error) {
    console.error('Error con fetch', error);
    res.status(500).json({ error: 'Hubo un problema buscar el user' });
  }
}


export const verificar_codigo_organizador = (req: Request, res: Response) => {
  const { codigo_verificacion } = req.body;

  if (codigo_verificacion === "1234") {
    res.status(200).json({ resultado: true });
  } else {
    res.status(200).json({ resultado: false });
  }
};


export const verificar_preregistro = async (req: Request, res: Response) => {
  try {

    const resultado = await usuario.verificar_preregistro();
    res.status(200).json({
      resultado
    });

  } catch (error) {
    console.error('Error con fetch', error);
    res.status(500).json({ error: 'Hubo un problema buscar el user' });
  }
}

export const inscribirEnConferencia = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id_usuario, id_conferencia } = req.body;

    if (!id_usuario || !id_conferencia) {
      return res.status(400).json({ message: 'Faltan parámetros requeridos.' });
    }

    const mensaje = await usuario.insertarUsuarioEnConferencia(id_usuario, id_conferencia);
    console.log(mensaje)
    return res.status(200).json({
      message: mensaje,
      codigoResultado: 1
    });
  } catch (error) {

    if(error instanceof Error){
      return res.status(200).json({ message: error.message, codigoResultado: -1 });
    } 

    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error interno del servidor",
      codigoResultado: -1,
      data: []
    });
  }
}

export const obtenerCarreras = async (req: Request, res: Response): Promise<any>=> {
  try {
    const carreras = await usuario.obtenerCareerasUNAH();
    return res.status(200).json(carreras);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'Error desconocido.' });
    }
  }
};

export const insertarHoraEntradaPorUsuario = async (req: Request, res: Response) => {
  try{
      const {idUsuario,
            idConferencia,
            horaEntrada} = req.body;

      const result = await usuario.insertarHoraEntrada(idUsuario,
            idConferencia,
            horaEntrada);

      res.status(201).json({
          result
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

export const insertarHoraSalidaPorUsuario = async (req: Request, res: Response) => {
try{
    const {idUsuario,
          idConferencia,
          horaSalida} = req.body;

    const result = await usuario.insertarHoraSalida(idUsuario,
          idConferencia,
          horaSalida);

    res.status(201).json({
        result
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

export const cancelarInscripcionConferencia = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id_usuario, id_conferencia } = req.body;

    if(!id_usuario || !id_conferencia) {
      return res.status(400).json({ message: 'Faltan parámetros requeridos.' });
    }

    const mensaje = await usuario.cancelarInscripcionEnConferencia(id_usuario, id_conferencia);

    return res.status(200).json({
      message: mensaje,
      codigoResultado: 1
    });
  } catch (error) {
    if(error instanceof Error){
      return res.status(500).json({ message: error.message, codigoResultado: -1 });
    } 

    return res.status(500).json({
      message: error instanceof Error ? error.message : "Error interno del servidor",
      codigoResultado: -1,
      data: []
    });
  }
}