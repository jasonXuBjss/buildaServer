const Pool = require("pg").Pool;
require('dotenv').config();

// console.log('hi')


const pool = new Pool ({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:"localhost",
    port: "5433",
    database:process.env.DB_DATABASE

})


module.exports = pool