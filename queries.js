const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movie',
    password: 'sabdha04',
    port: 5432,
});

module.exports = pool;