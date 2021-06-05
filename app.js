// app.js

require('rootpath')();

const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const path = require('path');
const cors = require('cors');

let port = 1234;

var app = express();

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser())

app.use(cors());

app.use('/', require('./controllers/login.controller'));
app.use('/admin', require('./controllers/admin.controller'));

app.listen(port, function () {
  console.log('Running on port ' + port);
});