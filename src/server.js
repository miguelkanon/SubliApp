require('dotenv').config();

const app = require('./app');
const pool = require('./config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await pool.query('SELECT 1');

    console.log('MySQL connected successfully');

    app.listen(PORT, () => {
      console.log(`SubliApp API running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MySQL:', error.message);
  }
}

startServer();
