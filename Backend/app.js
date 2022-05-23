// Declarations 
require('dotenv/config');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt')

// Create application from express library
var app = express();


// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());


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
    console.log('The database server is ready...')
}).catch((err) => {
    console.log(err);
});


// Server startup and por configuration
const port = process.env.API_PORT;

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
