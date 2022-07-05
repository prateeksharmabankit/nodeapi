require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression')
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString,{ poolSize: 10 });
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(compression({level:6}));

app.use(cors())
app.use(express.json());

const routes = require('./routes/routes');

app.use('/api', routes)


app.listen(port = process.env.PORT, () => {
    console.log(`Server Started at ${3000}`)
})

/* app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
}) */