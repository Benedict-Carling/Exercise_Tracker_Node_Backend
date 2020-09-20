const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('MongoDB database connection has been established successfully')
})

const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users')

app.use('/exercises',exerciseRouter);
app.use('/users', usersRouter);


//Start the server listen on certain port
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})