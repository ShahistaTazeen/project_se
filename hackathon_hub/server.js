const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create connection to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Hackathonevents'
});

// Connect to MySQL
db.connect(function (error) {
    if (error) {
        console.log("Error Connecting to DB");
    } else {
        console.log("Successfully Connected to DB");
    }
});

// Establish the Port
app.listen(3000, function (error) {
    if (error) {
        console.log("Error starting server");
    } else {
        console.log("Server started on port 3000");
    }
});

// POST endpoint for creating events
app.post('/api/events', (req, res) => {
    let details = {
        organizername: req.body.organizername,
        eventname: req.body.eventname,
        eventid: req.body.eventid,
        description: req.body.description,
        prizemoney: req.body.prizemoney,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time
    };

    let sql = `INSERT INTO events SET ?`;

    db.query(sql, details, (err, result) => {
        if (err) {
            console.error('Error creating event:', err);  // Log the error for debugging
            return res.status(500).json({ error: 'Error creating event.' });
        }

        res.status(201).json({ message: 'Event created successfully.', eventId: result.insertId }); // Return created event ID
    });
});

// GET endpoint for fetching events
app.get('/api/events', (req, res) => {
    const sql = `SELECT * FROM events`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching events:', err);  // Log the error for debugging
            return res.status(500).json({ error: 'Error fetching events.' });
        }
        res.send({ status: true, data: results });
    });
});
