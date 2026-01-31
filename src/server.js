import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;