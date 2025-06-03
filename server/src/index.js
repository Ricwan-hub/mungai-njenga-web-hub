import app from './app.js';
import { sequelize } from './models/index.js'; // Adjusted path to be explicit

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // await sequelize.sync(); // Sync all models (dev only, migrations preferred for prod)
    // OR
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    // Exit the process if unable to connect to the database during startup
    process.exit(1);
  }
};

startServer();
