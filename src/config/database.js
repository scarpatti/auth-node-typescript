require('dotenv').config();

// const db = {
//     dialect: 'postgres',
//     host: '127.0.0.1',
//     // port: '5432',
//     username: 'postgres',
//     password: 'changeme',
//     database: 'auth',
//     define: {
//         timestamps: true,
//         underscored: true
//     }
// };

const db = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    define: {
        timestamps: true,
        underscored: true
    }
};

module.exports = db;
