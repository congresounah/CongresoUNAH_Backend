import { google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

export const authorize = async () => {
  try {
    const jwtClient = new google.auth.JWT(
      process.env.CLIENT_EMAIL,
      undefined,
      process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY.replace(/\\n/g, '\n') : '',
      ['https://www.googleapis.com/auth/drive']
    );

    await jwtClient.authorize();
    console.log('Authorization successful!');
    return jwtClient;
  } catch (error) {
    console.error('Authorization failed:', error);
    throw error;
  }
};

export const uploadFile = async (authClient: any, file: Express.Multer.File, folderId: string) => {
  try {
    const drive = google.drive({ version: 'v3', auth: authClient });
    const fileMetadata = {
      name: file.originalname, // Usa el nombre del archivo recibido.
      parents: [folderId], // Carpeta de destino en Google Drive.
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.path), // Archivo temporal almacenado por Multer.
      },
      fields: 'id, webContentLink, webViewLink, name',
    });

    await setFilePermissions(authClient, response.data.id as string);

    return response.data; // Devuelve el ID del archivo subido.
  } catch (error) {
    console.error('Failed to upload file:', error);
    throw error;
  }
};

const setFilePermissions = async (authClient: any, fileId: string) => {
  const drive = google.drive({ version: 'v3', auth: authClient });
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'reader', // Permite solo lectura
      type: 'anyone', // Acceso público
    },
  });

  console.log(`Permisos configurados como públicos para el archivo ${fileId}`);
};
