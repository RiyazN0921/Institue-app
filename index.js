const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./config/db.config');
const cors = require('cors')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 4000
app.use(bodyParser.json());
const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
  };
  app.use(cors(corsOptions));

app.use('/api/course', require('./routes/course'))
app.use('/api/student', require('./routes/student'));

app.listen(port, async () => {
    console.log("Server listening on port " + port)
    await dbConnection()
})