const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();
const port = 5000;
require ('dotenv/config');
const usersRouter = require('./routes/users');

//const usersRouter = require('./routes/users.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use('/api/users', usersRouter);

//ROUTES:
app.use('/api/users', usersRouter);


app.get('/list_products', (req, res, next) => {
    console.log('hello');
})



mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, ()=> console.log('Connexion réussie !'));

app.listen(port, () => console.log('App is Runnin at port '+ port));

