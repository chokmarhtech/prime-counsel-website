import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

client.query('SELECT * FROM "digital_assets"', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Digital Assets:", res.rows);
  }
  client.end();
});
