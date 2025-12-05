const nodemailer = require('nodemailer');
const emailConfig = require('../config/email');

/**
 * Crear transporter de Nodemailer
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    service: emailConfig.service,
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.secure,
    auth: emailConfig.auth
  });
};

/**
 * Enviar email de recuperación de contraseña
 * @param {string} to - Email destinatario
 * @param {string} resetToken - Token de recuperación
 * @param {string} userName - Nombre del usuario
 * @returns {Promise<Object>} Información del email enviado
 */
const sendPasswordResetEmail = async (to, resetToken, userName) => {
  const transporter = createTransporter();
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: emailConfig.from,
    to,
    subject: 'Recuperación de Contraseña - Plataforma de Evaluación Crediticia',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background-color: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #64748b; }
          .warning { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 10px 15px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Plataforma de Evaluación Crediticia</h1>
          </div>
          <div class="content">
            <h2>Hola ${userName},</h2>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
            <p>Haz clic en el siguiente botón para crear una nueva contraseña:</p>
            <p style="text-align: center;">
              <a href="${resetLink}" class="button" style="color: white;">Restablecer Contraseña</a>
            </p>
            <div class="warning">
              <strong>⚠️ Importante:</strong> Este enlace expirará en 1 hora.
            </div>
            <p>Si no solicitaste este cambio, puedes ignorar este correo. Tu contraseña permanecerá sin cambios.</p>
            <p>Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:</p>
            <p style="word-break: break-all; color: #2563eb;">${resetLink}</p>
          </div>
          <div class="footer">
            <p>Este es un correo automático, por favor no responder.</p>
            <p>&copy; ${new Date().getFullYear()} Plataforma de Evaluación Crediticia</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email de recuperación enviado:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error al enviar email:', error.message);
    throw new Error('Error al enviar el correo de recuperación');
  }
};

/**
 * Verificar configuración de email
 * @returns {Promise<boolean>} True si la configuración es válida
 */
const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Configuración de email verificada');
    return true;
  } catch (error) {
    console.error('❌ Error en configuración de email:', error.message);
    return false;
  }
};

module.exports = {
  sendPasswordResetEmail,
  verifyEmailConfig
};
