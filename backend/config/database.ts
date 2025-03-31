import { Sequelize } from 'sequelize'
import path from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env file two levels up
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

// Main application database connection
export const sequelize = new Sequelize(
  process.env.DB_NAME || 'mydb',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mysql',
    logging: false, // Disable Sequelize SQL logging
  }
)

