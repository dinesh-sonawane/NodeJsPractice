const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT || 3000;
const db = require('./config/database');
const userRoute = require('./user/user.router.js');

// Connect to database
db();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', userRoute);

// Start Server: Listen on port 8080
app.listen(port, () => {
    console.log('Listening on port ' + port + ' in ' + process.env.NODE_ENV + ' mode');
}
);
