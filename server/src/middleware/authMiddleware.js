import dotenv from 'dotenv';

// It's good practice to load dotenv config as early as possible,
// especially if other modules might also use it.
// However, app.js already calls dotenv.config(). If authMiddleware is always used after app.js
// has initialized, this might be redundant. For standalone middleware usage, it's safer.
// Let's assume app.js handles the primary dotenv.config().
// If issues arise, we can ensure it's loaded here too, or ensure app.js loads it first.
// For now, relying on app.js's dotenv.config() or the one in config.cjs for sequelize-cli.
// The server runtime (src/index.js -> src/app.js) should have loaded .env already.

export const protectWithApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const serverApiKey = process.env.API_SECRET_KEY;

  if (!serverApiKey) {
    // This is a server configuration error
    console.error('CRITICAL: API_SECRET_KEY is not set on the server. This should be configured in .env');
    return res.status(500).json({ message: 'Server configuration error: API key not configured.' });
  }

  if (apiKey && apiKey === serverApiKey) {
    next(); // API key is valid, proceed
  } else {
    // Log unauthorized attempts for security monitoring, but don't log the received key unless necessary for debugging in dev
    console.warn(`Unauthorized API access attempt. IP: ${req.ip}. Path: ${req.originalUrl}. Key provided: ${apiKey ? '******' : 'None'}`);
    res.status(401).json({ message: 'Unauthorized: Invalid or missing API key.' });
  }
};
