const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool ({
    user: "jasonxu",
    password:process.env.DB_PASSWORD,
    host:"localhost",
    port: "5432",
    database:"bench_todo"

})


module.exports = pool