import express from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// API Routes
import teamMemberRoutes from './routes/teamMemberRoutes.js';
import practiceAreaRoutes from './routes/practiceAreaRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';

app.use('/api', teamMemberRoutes);
app.use('/api', practiceAreaRoutes);
app.use('/api', testimonialRoutes);

export default app;
