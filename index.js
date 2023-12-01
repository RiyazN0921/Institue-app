const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./config/db.config');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 4000
app.use(bodyParser.json());

app.use('/api/course', require('./routes/course'))
app.use('/api/student', require('./routes/student'));

app.listen(port, async () => {
    console.log("Server listening on port " + port)
    await dbConnection()
})