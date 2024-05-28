import mysql from 'mysql'
import { config } from 'dotenv'
config() // para caragar las variables de entorno de .env

const pool = mysql.createPool({
  connectionLimit: 20,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
})

pool.getConnection((error, connection) => {
  if (error) {
    console.error(error)
    return
  }
  console.log('Conexión a la base de datos exitosa!')
  connection.release()
})

export { pool }
