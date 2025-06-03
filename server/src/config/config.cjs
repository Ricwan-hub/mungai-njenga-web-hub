const dotenv = require('dotenv');
const path = require('path');

// Load .env file from the current working directory (should be /app/server when running scripts)
const dotenvResult = dotenv.config();

if (dotenvResult.error) {
  // This log is important if .env loading fails
  console.error('[config.cjs] Error loading .env file (from CWD):', dotenvResult.error);
}
// Optional: For very specific debugging of .env loading, you might add:
// else {
//   console.log('[config.cjs] .env file loaded successfully. Keys:', Object.keys(dotenvResult.parsed || {}).join(', '));
// }

const dbPassword = process.env.DB_PASSWORD || '';
const dbTestPassword = process.env.DB_PASSWORD_TEST || dbPassword; // Fallback to dev password for test

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: dbPassword,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false,
    }
  },
  test: {
    username: process.env.DB_USER_TEST || process.env.DB_USER,
    password: dbTestPassword,
    database: process.env.DB_NAME_TEST || `${process.env.DB_NAME}_test`,
    host: process.env.DB_HOST_TEST || process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT_TEST, 10) || parseInt(process.env.DB_PORT, 10) || 5433, // Test port or dev port or 5433
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL_TEST === 'true' ? { require: true, rejectUnauthorized: false } : false,
    },
    logging: false,
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false,
  }
};
