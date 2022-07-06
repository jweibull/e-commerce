/*jshint esversion: 8 */

//Environment File
require('dotenv/config');

// Create application from express library
const express = require('express');
var app = express();

// Declarations 
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require("./helpers/jwt");
const errorHandler = require('./helpers/error-handler');


const uploads = process.env.PUBLIC_UPLOADS;


// Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(uploads, express.static(__dirname + uploads));
app.use(errorHandler);


// CORS Configuration
app.use(cors());
app.options(process.env.CORS_ALLOWED, cors());


// API Endpoints
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');


const api = process.env.API_URL;
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


// Database Connection and Configuration
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DATABASE_DEV
}).then(() => {
    console.log('The database server is ready...');
}).catch((err) => {
    console.log(err);
});


// Server startup and por configuration
const port = process.env.API_PORT;

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
