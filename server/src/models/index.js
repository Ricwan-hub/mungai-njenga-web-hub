import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);
// Correctly require the CJS config. configFromFile will be the module.exports object.
const configFromFile = require('../config/config.cjs');

const env = process.env.NODE_ENV || 'development';
// Use the 'development', 'test', or 'production' object from the config module
const config = configFromFile[env];
const db = {};

let sequelize;

if (config && config.use_env_variable && process.env[config.use_env_variable]) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else if (config) {
  // Ensure all necessary DB connection parameters are available, either from process.env or config file.
  // process.env variables are loaded by config.cjs itself.
  const dbName = process.env.DB_NAME || config.database;
  const dbUser = process.env.DB_USER || config.username;
  const dbPassword = process.env.DB_PASSWORD; // Password should come directly from .env via config.cjs
  const dbHost = process.env.DB_HOST || config.host;

  let dbPort;
  if (process.env.DB_PORT) {
    dbPort = parseInt(process.env.DB_PORT, 10);
  } else if (config.port) {
    dbPort = parseInt(config.port, 10);
  } else {
    dbPort = 5432; // Default PostgreSQL port
  }

  if (!dbName || !dbUser || !dbHost || !config.dialect) {
    console.error('Database configuration is incomplete. Check environment variables (loaded by config.cjs) and the config.cjs structure.');
    console.error(`Values: DB_NAME=${dbName}, DB_USER=${dbUser}, DB_HOST=${dbHost}, DIALECT=${config.dialect}`);
    process.exit(1);
  }

  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: config.dialect,
    logging: process.env.NODE_ENV === 'development' ? console.log : false, // Log SQL in dev
    ...config.dialectOptions // Include dialectOptions like SSL
  });
} else {
  console.error(`Database configuration for environment "${env}" is missing in config.cjs.`);
  process.exit(1);
}

const basename = path.basename(__filename); // basename still needs path

// Dynamically load models
const files = fs.readdirSync(__dirname).filter(file => {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' && // Model files are .js
    file.indexOf('.test.js') === -1
  );
});

for (const file of files) {
  const filePath = path.join(__dirname, file);
  const posixFilePath = filePath.split(path.sep).join(path.posix.sep);
  const fileUrl = new URL('file://' + posixFilePath).href;

  const modelModule = await import(fileUrl);
  if (modelModule.default && typeof modelModule.default === 'function') {
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  } else {
    console.warn(`Could not load model from ${file}: default export is not a function or is missing.`);
  }
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize, Sequelize };
export default db;
