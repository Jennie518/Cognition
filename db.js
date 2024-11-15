const pg = require('pg');

const pgClient = new pg.Client({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'zhanyijun',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'cognition_db',
    port: 5432,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

pgClient.connect();

module.exports = pgClient;
