import nodemailer from 'nodemailer';
import { generateCertificatePDF } from './pdfGenerator';
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendVerificationEmail = async (to: string, code: string): Promise<void> => {
    try {
        const info = await transporter.sendMail({
            from: `"Congreso" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Código de Verificación',
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; background-color: #F9F9F9; padding: 20px;">
                    <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                        <!-- Header -->
                        <div style="background-color: #32378C; color: white; padding: 20px;">
                            <h1 style="margin: 0; font-size: 24px;">Código de Verificación</h1>
                        </div>
                        
                        <!-- Body -->
                        <div style="padding: 20px; color: #2C2F73; text-align: left;">
                            <p style="font-size: 16px; margin: 0;">Hemos recibido una solicitud que requiere la verificación de tu identidad.</p>
                            <p style="font-size: 16px; margin: 20px 0;">Por favor, utiliza el siguiente código de verificación:</p>
                            <div style="text-align: center; margin: 20px 0;">
                                <span style="text-align: center; display: inline-block; font-size: 28px; font-weight: bold; color: #F29D35; padding: 15px 25px; border: 2px dashed #F29D35; border-radius: 5px; background-color: #FFF4E0;">${code}</span>
                            </div>
                            <p style="font-size: 14px; color: #7A85BF; margin: 20px 0;">Si no realizaste esta solicitud, puedes ignorar este mensaje.</p>
                        </div>
                        
                        <!-- Footer -->
                        <div style="background-color: #F2AE30; color: white; padding: 15px; text-align: center;">
                            <p style="margin: 0; font-size: 14px;">Si tienes preguntas, contáctanos en <a href="mailto:${process.env.EMAIL_USER}" style="color: white; text-decoration: underline;">${process.env.EMAIL_USER}</a>.</p>
                        </div>
                    </div>
                </div>
            `,
        });
        console.log('Correo enviado: %s', info.messageId);
    } catch (error) {
        console.error('Error enviando correo:', error);
        if (error instanceof Error) {
            console.error('Error específico:', error.message);
        }
        throw new Error('No se pudo enviar el correo electrónico.');
    }
};

export const sendAllCertificates = async (email: string, name: string, pdfBuffer: Buffer): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const htmlContent = `
            <div style="font-family: 'Arial', sans-serif; background-color: #F0F0F0; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto;">
                <!-- Header -->
                <div style="background-color: #32378C; color: white; padding: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px; text-align: center;">
                    <h2 style="margin: 0;">¡Felicidades, ${name}!</h2>
                    <p style="margin: 5px;">Tu Certificado de Participación ha sido generado con éxito.</p>
                </div>

                <!-- Body -->
                <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <p style="font-size: 16px; color: #333; line-height: 1.5;">Querido <strong>${name}</strong>,</p>
                    <p style="font-size: 16px; color: #333; line-height: 1.5;">Nos complace informarte que has completado con éxito el evento y ahora puedes descargar tu certificado de participación.</p>
                    <p style="font-size: 16px; color: #333; line-height: 1.5;">Haz clic en el archivo adjunto para ver o descargar tu certificado.</p>
                    <br />
                    <p style="font-size: 14px; color: #888; text-align: center;">Si no realizaste esta solicitud, por favor ignora este mensaje.</p>
                </div>

                <!-- Footer -->
                <div style="background-color: #32378C; color: white; padding: 15px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                    <p style="margin: 0; font-size: 14px;">Si tienes preguntas, contáctanos en <a href="mailto:${process.env.EMAIL_USER}" style="color: white; text-decoration: underline;">${process.env.EMAIL_USER}</a>.</p>
                </div>
            </div>
        `;

        const info = await transporter.sendMail({
            from: `"Congreso" <${process.env.EMAIL_USER}>`, 
            to: email, 
            subject: 'Certificado de Participación',  
            html: htmlContent,  
            attachments: [
                {
                    filename: 'Certificado_Participacion.pdf',  
                    content: pdfBuffer, 
                    encoding: 'base64',
                },
            ],
        });

        console.log('Correo enviado a: %s', info.messageId);
    } catch (error) {
        console.error('Error enviando el correo:', error);
        throw new Error('No se pudo enviar el correo.');
    }
};