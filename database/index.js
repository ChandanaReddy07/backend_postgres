const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "tha",
    "pqrst",
    "abc1d",
    {
        host: "localhost" ,
        dialect: "postgres"
    }
);

sequelize.sync();

(async () => {
    try {
        await sequelize.authenticate();
        console.log("connection established with database");
    }
    catch(err) {
        console.error("Cannot connect to database");
    }
})

module.exports = sequelize;

// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   password: "new_password",
//   host: "localhost",
//   port: 5432,
//   database: "linenvastra"
// });

// module.exports = pool;



