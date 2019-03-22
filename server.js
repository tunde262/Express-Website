const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const company = require('./routes/api/company');
const fulfiller = require('./routes/api/fulfiller');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Db Config
const db = require('./config/keys').mongoURI;

//Connect to mongodb
mongoose
    .connect(db)
    .then(() => console.log('MongodbConnected'))
    .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/company', company);
app.use('/api/fulfiller', fulfiller);

// Server static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));