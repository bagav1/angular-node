require('dotenv').config()
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const User = require('./models/user.model')

const env = process.env;

module.exports = db = {};

initialize();

async function initialize() {
  // Crear la tabla si no existe
  const connection = await mysql.createConnection({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${env.DB_NAME}\` CHARACTER SET \`utf8mb4\` COLLATE \`utf8mb4_spanish_ci\`;`);

  // Establecer la conexión con la base de datos
  const conn = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: 'mysql',
    logging: false
  });

  // Crear el modelo de la tabla
  db.User = User(conn, Sequelize)

  // Sinchronizar la tabla con el modelo
  conn.sync({ force: false, alter: true, logging: false });
  console.log('BD conectada...');
}