const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { drizzle } = require("drizzle-orm-node-postgress");
const { Pool } = require("pg");
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const port = 3000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
