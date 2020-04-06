const path = require('path')
const express = require('express')
const hbs = require('hbs')
const pg = require('pg')
require('dotenv').config() //enviornmental variables
const bodyParser = require('body-parser')

const db = require('./db/database');
// var email_sender = require('./email_sender');
var approvedList = require('./src/approved-list')

const app = express()
const publicDirectoryPath = path.join(__dirname, './public')
const partialsPath = path.join(__dirname, './partials')


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

const sendEmail = require('./src/email_sender');

app.get('', (req, res) => {
    res.render('index')
})
app.get('/results', (req, res) => {
    res.render('index')
})

app.get('/unsubscribe', async (req, res) => {
    const email = req.query.email
    const result = await db.query(
        "DELETE FROM requests WHERE email=$1;",
        [email], //5 minute buffer for overlap
    );
    if (result) {
        res.render('results', { responseText: null, unsubscribe: "unsubscribe", introText: email + " has been unsubscribed from emails and your availability has been removed. Good luck with your work!" });
    } else {
        res.render('results', { responseText: null, unsubscribe: "unsubscribe", introText: email + " cannot ben unsubscribed from emails, please check that the email in the url is correct, or contact me at Aargold@deloitte.com" });
    }
})





app.post('/results', async (req, res) => {

    // if (!approvedList.includes(req.body.email)) {
    //     res.render('results', { responseText: null, introText: "Unfortunately, this site is currently limited to Applied Design as a pilot. If you believe you are receiving this as an error. Please ping Aaron Hillel Gold (aargold@deloitte.com)" });
    // }

    const startTime = Date.now();
    const email = req.body.email
    const name = req.body.name
    const minutesFree = parseInt(req.body.minutes);
    const endTime = startTime + (minutesFree * 60 * 1000);

    var firstName = name.split(" ")[0].toLowerCase();
    firstName = firstName.charAt(0).toUpperCase() + firstName.substring(1);
    var lastName = ""
    if (typeof name.split(" ")[1] != "undefined") {
        lastName = name.split(" ")[1].toLowerCase();
        lastName.charAt(0).toUpperCase() + lastName.substring(1)
    }


    var arrayOfFiltersParams = new Array();
    if (!req.body.filters) {
        arrayOfFiltersParams.push("no-filters")
    } else {
        for (var key in req.body.filters) {
            //take hash and make it into array for check with query
            arrayOfFiltersParams.push(req.body.filters[key]);
        }
    }

    try {
        const result = await db.query(
            "SELECT DISTINCT requests_id, first_name, email, last_name, start_time, end_time FROM requests INNER JOIN filters ON requests.id = filters.requests_id WHERE end_time > $1 AND filter_name = ANY ($2)",
             [startTime + (5 * 60 * 1000), arrayOfFiltersParams], //5 minute buffer for overlap
        );

        const relevantName = compileEmailToSenders(result, firstName, email);

        const options = {
            // from: 'from@from.com',
            to: relevantName.toEmails,
            subject: relevantName.subject,
            html_response: relevantName.html_response
        };
        if (relevantName.toEmails.length > 1) {
            if (relevantName.toEmails.length < 3) {
                res.render('results', { responseText: result.rows, introText: "You have been paired with the following person:" });
            } else {
                res.render('results', { responseText: result.rows, introText: "You have been paired with the following people:" });
            }
            // sendEmail(options);
        } else {
            console.log("No users matched, so no emails sending!")
            res.render('results', { responseText: null, introText: "" });

        }
    } catch (error) {
        console.log(error)
    }

    try {
        const userIdReturned =  await db.query(
            "INSERT INTO requests(first_name, last_name, email, start_time, end_time)VALUES($1, $2, $3, $4, $5) RETURNING id",
            [firstName, lastName, email, startTime, endTime],
        );
        var returned_row_id = userIdReturned.rows[0].id
        arrayOfFiltersParams.forEach(element => {
           db.query(
            "INSERT INTO filters(filter_name, requests_id)VALUES($1, $2)",
            [element, returned_row_id]
             );
        });
        
    } catch (error) {
        console.log(error)
    }
})


connectDb().then(() => {
    app.listen(process.env.PORT, async () => {
        console.log('Server Started on port 3000')
    })

    if (process.send) {
        process.send('online');
    }

})


function compileEmailToSenders(result, firstName, email) {
    let toEmails = [email];
    // Send an email with the below
    let subject = ""
    let html_response = "Hi " + firstName + ", <br><br>"
    result.rows.forEach(element => {
        //need to make this a loop for all the possibe matches
        subject = subject + " " + element.first_name
        if (result.rows.length > 1) {
            subject += ","
        }
        toEmails.push(element.email)
    });
    subject = subject + " & " + firstName;
    if (toEmails.length > 2) {
        html_response = html_response + subject + " are all free right now! We sugest you ping them on Teams or Skype to chat more!";
        subject += " You're all free now!";
    } else if (toEmails.length == 2) {
        html_response = html_response + subject + ", you are both free right now! We sugest you ping each other on Teams or Skype to chat more!";
        subject += " You're both free now!";
    }
    html_response += "<br><br> To add new future availability, please  <a href='http://social-chat-d.herokuapp.com/'>click here:</a> <br><br> To unsubscribe, or update/delete your availability please <a href='http://social-chat-d.herokuapp.com//unsubscribe?email=" + email + "'>Click here</a>"
    return {
        subject,
        toEmails,
        html_response,
    };
}