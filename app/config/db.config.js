const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  max: 20, // Número máximo de clientes en el pool de conexiones
  idleTimeoutMillis: 30000, // Tiempo máximo de inactividad de un cliente antes de ser cerrado
  connectionTimeoutMillis: 2000, // Tiempo máximo para esperar una conexión
});

module.exports = pool;