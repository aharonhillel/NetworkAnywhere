// var pg = require("pg");

// var connectionString = {
//   user: 'aaron',
//   host: 'localhost',
//   database: 'zoomdb',
//   password: '6/8/97',
//   port: 5432,
// };
const { Pool, Client } = require('pg')
const client = new Client({
  user: 'aaron',
  host: 'localhost',
  database: 'zoomdb',
  password: '6/8/97',
  port: 5432,
})

client.connect(function(err) {
  if (err) throw err;
});

module.exports = client;

// var pool = new pg.Pool(connectionString);

// pool.connect(function(err, client, done) {

//     const query = client.query(new pg.Query("SELECT * from products"))
//     query.on('row', (row) => {
//         console.log(row);
//     })
//     query.on('end', (res) => {
//         // pool shutdown
//         console.log("ending");
//         pool.end()
//     })
//     query.on('error', (res) => {
//         console.log(res);
//     })

//     done()
// })