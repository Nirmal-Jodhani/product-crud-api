const express = require('express');

const bodyParser = require('body-parser');

// create express app
const app = express();


// Require Product routes
const productRoutes = require('./src/routes/product.routes')

// Setup server port
const port = process.env.PORT || 3000;

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root/default route
app.get('/', (req, res) => {
    res.json({ "message": "Product crud operation" });
});

// Configuring the database
const dbConfig = require('./confing/db.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

// listen for requests
app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
});


// using as middleware
app.use('/api/product', productRoutes)
