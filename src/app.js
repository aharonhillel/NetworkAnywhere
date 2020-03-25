//Things to do:
//flag in db if already sent so that you get a better message saying you can add a third+ person
//Response page should show if theres anyone that matches your feed
//Ajax would be great!

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const pg = require('pg')
const bodyParser = require('body-parser')

const db = require('../db/database');
var email_sender = require('../email_sender');

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

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Aaron Gold"

    })
})
app.get('/help', (req, res) => {
    res.render('index')
})

app.get('/pairs', (req, res) => {

    db.query(
        "select * from requests where start_time > 1585077926952 AND end_time < 1585080927527;",
        function (error, result, field) {
            if (error) {
                exist(error); //No error
            } else if (result) {
                console.log(result);
            } else {
                exist(null, null); //It is never execute
            }
        });
})



app.post('/help', (req, res) => {
    // db.connect(function(err) {
    //     if (err) throw err;
    //   });
    console.log(req.body);
    const start_time = Date.now();
    console.log(start_time)
    res.send("response");
    const name = req.body.name
    const first_name = name.split(" ")[0].toLowerCase();
    var last_name = ""
    if (typeof name.split(" ")[1] != "undefined") {
        last_name = name.split(" ")[1].toLowerCase();
    }

    const email = req.body.email

    const minutes_free = parseInt(req.body.minutes);
    // const first_name
    const end_time = start_time + (minutes_free * 60 * 1000);
    console.log("End time is: " + end_time)
    var to_emails = [];
    db.query(
        "select * from requests where end_time < $1;",
        [end_time],
        function (error, result, field) {
            if (error) {
                exist(error); //No error
            } else if (result) {
                console.log(result);
                // Send an email with the below
                var subject = ""
                result.rows.forEach(element => {
                    //need to make this a loop for all the possibe matches
                    const up_first_letter = element.first_name.charAt(0).toUpperCase() + element.first_name.substring(1);
                    subject = subject + " " + up_first_letter

                    if (result.rows.length > 1) {
                        subject += ","
                    }
                    to_emails.push(element.email)
                });
                subject = subject + " & " + first_name.charAt(0).toUpperCase() + first_name.substring(1) + " You're both free now!";

                const options = {
                    from: 'from@from.com',
                    to: to_emails,

                    subject: subject,
                };
                if (to_emails.length > 0) {
                    sendEmail(options);
                } else {
                    console.log("No users matched, so no emails sending!")
                }
            } else {
                exist(null, null); //It is never execute
            }
        });

    db.query(
        "INSERT INTO requests(first_name, last_name, email, start_time, end_time)VALUES($1, $2, $3, $4, $5)",
        [first_name, last_name, email, start_time, end_time],
        (err, res) => {
            console.log(err, res);
            db.end();
        }
    );


})



app.listen(3000, () => {
    console.log('Server Started on port 3000')
})
