const path = require('path')
const express = require('express')
const hbs = require('hbs')
const pg = require('pg')
const bodyParser = require('body-parser')

const db = require('../db/database');
// var db = require('../email_sender');

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../partials')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

// db.connect(function(err) {
//     if (err) throw err;
//   });

const sendEmail = require('./../email_sender');

app.get('', (req, res) =>{
    res.render('index', {
        title: "Weather App",
        name: "Aaron Gold"

    })
})
app.get('/help', (req, res) =>{
    res.render('index')
})

app.get('/pairs', (req, res) =>{

      db.query(
          "select * from requests where start_time > 1585077926952 AND end_time < 1585080927527;",
          function(error, result, field) {
            if(error) {
                exist(error); //No error
            } else if(result) {
                console.log(result);
            } else {
                exist(null, null); //It is never execute
            }
        });
})



app.post('/help', (req, res) =>{
    // db.connect(function(err) {
    //     if (err) throw err;
    //   });
    console.log(req.body);
    const start_time = Date.now();
    console.log(start_time)
    res.send("response");
    const name = req.body.name
    const first_name = name.split(" ")[0].toLowerCase();
    const last_name = name.split(" ")[1].toLowerCase();
    const email = req.body.email

    const minutes_free =  parseInt(req.body.minutes)
    // const first_name
    const end_time = start_time + (minutes_free*60*1000);

    db.query(
        "INSERT INTO requests(first_name, last_name, email, start_time, end_time)VALUES($1, $2, $3, $4, $5)",
        [first_name, last_name, email, start_time, end_time],
        (err, res) => {
          console.log(err, res);
          db.end();
        }
      );

    // Send an email with the below
    const options = {
        from: 'from@from.com',
        to: 'to@to.com',
        subject: "You're both free now."
    };

    sendEmail(options);

    // db.query('SELECT * FROM users').then(res => {
    //     const data = res.rows;

    //     console.log('all data');
    //     data.forEach(row => {
    //         console.log(`Id: ${row.id} Name: ${row.name} Email: ${row.email}`);
    //     })

    //   }).finally(() => {
    //     db.end()
    //   });

})



app.listen(3000, () =>{
    console.log('Server Started on port 3000')
})
