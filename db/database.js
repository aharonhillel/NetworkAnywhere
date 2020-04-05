
console.log(process.env.NODE_ENVIRONMENT)
if(process.env.NODE_ENVIRONMENT == 'development') {
  const { Pool, Client } = require('pg')
const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,

})
module.exports = client;
}else{

const { Pool } = require('pg');
const client = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

module.exports = client;
}



// require('dotenv/config') //enviornmental variables
// const { Pool, Client } = require('pg')
// console.log(process.env.PORT)
// const client = new Client({
 
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.PORT,
// })

// module.exports = client;

