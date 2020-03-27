//Things to do:
//flag in db if already sent so that you get a better message saying you can add a third+ person
//Response page should show if theres anyone that matches your feed
//Ajax would be great!

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const pg = require('pg')
require('dotenv/config') //enviornmental variables
const bodyParser = require('body-parser')

const db = require('../db/database');
var email_sender = require('./email_sender');
var approvedList = require('./approved-list')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../partials')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)


function connectDb() {
    return db.connect().catch((error) => {
        console.log(error)
    });
}

const sendEmail = require('./email_sender');

app.get('', (req, res) => {
    res.render('index')
})
app.get('/help', (req, res) => {
    res.render('index')
})





app.post('/results', async (req, res) => {

    if (!approvedList.includes(req.body.email)) {
        res.render('results', { responseText: null, introText: "Unfortunately, this site is currently limited to Applied Design as a pilot. If you believe you are receiving this as an error. Please ping Aaron Hillel Gold (aargold@deloitte.com)" });
    }

    console.log(req.body);
    const startTime = Date.now();
    console.log(startTime)

    const name = req.body.name
    const firstName = name.split(" ")[0].toLowerCase();
    var lastName = ""
    if (typeof name.split(" ")[1] != "undefined") {
        lastName = name.split(" ")[1].toLowerCase();
    }

    const email = req.body.email

    const minutesFree = parseInt(req.body.minutes);
    // const first_name
    const endTime = startTime + (minutesFree * 60 * 1000);
    console.log("End time is: " + endTime)


    try {
        const result = await db.query(
            "SELECT * FROM requests WHERE end_time > $1;",
            [startTime + (5 * 60 * 1000)], //5 minute buffer for overlap
        );
        const releventName = find_relevant(result, firstName, email);

        const options = {
            from: 'from@from.com',
            to: releventName.toEmails,
            subject: releventName.subject,
            html_response: releventName.html_response
        };
        if (releventName.toEmails.length > 1) {
            //    const a = "(UPDATE requests SET sent=$1 WHERE email = $2;)',
            //         [1,releventName.toEmails[0]]," //5 minute buffer for overlap

            // res.send(result.rows);
            if (releventName.toEmails.length < 3) {
                res.render('results', { responseText: result.rows, introText: "You have been paired with the following person:" });
            } else {
                res.render('results', { responseText: result.rows, introText: "You have been paired with the following people:" });
            }
            sendEmail(options);
        } else {
            console.log("No users matched, so no emails sending!")
            res.render('results', { responseText: null, introText: "" });

        }
    } catch (error) {
        console.log(error)
    }

    try {
        await db.query(
            "INSERT INTO requests(first_name, last_name, email, start_time, end_time)VALUES($1, $2, $3, $4, $5)",
            [firstName, lastName, email, startTime, endTime],
        );
    } catch (error) {
        console.log(error)
    }
    // db.end();



})


connectDb().then(() => {
    app.listen(process.env.PORT, async () => {
        console.log('Server Started on port 3000')
    })

})


function find_relevant(result, first_name, email) {
    let toEmails = [email];
    // console.log(result);
    // Send an email with the below
    let subject = ""
    let html_response = "Hi " + first_name.charAt(0).toUpperCase() + ", <br><br>"
    result.rows.forEach(element => {
        //need to make this a loop for all the possibe matches
        const up_first_letter = element.first_name.charAt(0).toUpperCase() + element.first_name.substring(1);
        subject = subject + " " + up_first_letter
        if (result.rows.length > 1) {
            subject += ","
        }
        toEmails.push(element.email)
    });
    subject = subject + " & " + first_name.charAt(0).toUpperCase() + first_name.substring(1);
    if (toEmails.length > 2) {
        html_response = html_response + subject + " are all free right now! We sugest you ping them on Teams or Skype to chat more!";
        subject += " You're all free now!";
    } else if (toEmails.length == 2) {
        html_response = html_response + subject + ", you are both free right now! We sugest you ping each other on Teams or Skype to chat more!";
        subject += " You're both free now!";
    }
    html_response += "<br><br> To add new future availability, please  <a href='https://secure-scrubland-04151.herokuapp.com/'>click here:"
    return {
        subject,
        toEmails,
        html_response,
    };
}
