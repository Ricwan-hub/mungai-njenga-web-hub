import db from '../models/index.js'; // Path to your models/index.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Ensure .env variables are loaded for tests, especially API_SECRET_KEY
// __filename and __dirname are not available in ES modules directly
const __filename = fileURLToPath(import.meta.url); // /app/server/src/tests/setupTests.js
const __dirname = path.dirname(__filename); // /app/server/src/tests

// Load server/.env for test environment
// This ensures process.env.API_SECRET_KEY and DB variables are available
// if NODE_ENV=test uses a different DB, config.cjs should handle that.
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

beforeAll(async () => {
  try {
    // Ensure database connection is established
    // Migrations should have been run already, or use a separate test DB setup
    // For tests, it's common to use a dedicated test database.
    // The config.cjs should point to the test DB when NODE_ENV=test.
    await db.sequelize.authenticate();
    console.log('Test DB connection established successfully.');

    // Optional: Sync if using a model-first approach for test DB (instead of migrations)
    // This is destructive, ensure it's against a test database.
    // await db.sequelize.sync({ force: true });
    // console.log('Test DB synced (force: true).');
  } catch (error) {
    console.error('Failed to connect or sync test database:', error);
    process.exit(1); // Exit if DB connection fails
  }
});

beforeEach(async () => {
  // Clear all data from tables before each test
  // This ensures test independence.
  // The order might matter if there are foreign key constraints not handled by cascade.
  const models = Object.values(db.sequelize.models);
  for (const model of models) {
    // Check if model is not SequelizeMeta before destroying
    if (model.name !== 'SequelizeMeta') {
       await model.destroy({ where: {}, truncate: true, cascade: true });
    }
  }
});

afterAll(async () => {
  // Close the database connection after all tests are done
  await db.sequelize.close();
  console.log('Test DB connection closed.');
});
