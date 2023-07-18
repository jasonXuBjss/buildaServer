const Pool = require("pg").Pool;

const pool = new Pool ({
    user: "jasonxu",
    password:"sepv3456",
    host:"localhost",
    port: "5432",
    database:"bench_todo"

})


module.exports = pool