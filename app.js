const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
var ec2  = new AWS.EC2();

var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {getHomePage} = require('./routes/index');
var subtract = require('./routes/subtract');
var digging = require('./routes/digging');

const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
// const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: "database.car0gcrfpnrp.ap-northeast-2.rds.amazonaws.com",
    user: "pinno12",
    password: "32453245",
    database: 'socka'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
// app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
app.use('/subtract', subtract);
app.use('/digging', digging);
// routes for the app

app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);


// set the app to listen on the port
// app.listen(port, () => {
//     console.log(`Server running on port: ${port}`);
// });

app.get('/ec2', function(req, res){
    ec2.describeInstances({}, function(err, data) {
            res.json(data);
    });
});
app.listen(80, function(){
    console.log('Connect 80 port');
});

module.exports = app;
