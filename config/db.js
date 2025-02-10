const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

client.connect()
    .then(() => console.log("connected to postgres"))
    .catch(err => console.error("connection error:", err));

module.exports = client;
