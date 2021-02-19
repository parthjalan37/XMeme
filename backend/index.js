const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const memesRoute = require('./routes/memes');

app.use('/memes', memesRoute);

//Routes
app.get('/', (req, res) => {
    res.send('Hello from the profile backend!');
});

//Connect to DB
mongoose.connect(
    'mongodb://localhost:27017/xmeme',
    // process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('Connected to DB!')
);

//Specify the port number for the server
app.listen(8081, '0.0.0.0', () => {
    console.log('Profile backend running on 8081');
});
