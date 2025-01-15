"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIP = exports.allowedIPs = void 0;
// Lista de IPs permitidas
exports.allowedIPs = ['173.15.0.11', '192.168.1.10'];
const validateIP = (req, res, next) => {
    let clientIP = req.ip || req.connection.remoteAddress || 'IP_NO_DEFINIDA';
    if (clientIP.startsWith('::ffff:')) {
        clientIP = clientIP.replace('::ffff:', '');
    }
    console.log(`IP detectada: ${clientIP}`);
    console.log(`Lista de IPs permitidas: ${exports.allowedIPs}`);
    if (exports.allowedIPs.includes(clientIP)) {
        return next();
    }
    res.status(403).json({
        error: 'Acceso denegado. Tu IP no está autorizada para acceder a este recurso.',
    });
};
exports.validateIP = validateIP;
