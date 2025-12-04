const app = require('./app');
const { database } = require('./config');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Test database connection
  const dbConnected = await database.testConnection();
  
  if (!dbConnected) {
    console.warn('⚠️  Servidor iniciando sin conexión a base de datos');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer();
