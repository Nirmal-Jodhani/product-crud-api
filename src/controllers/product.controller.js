const Product = require('../models/product.model.js');


// Retrieve and return all Products from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        // res.writeHead(200, {'Access-Control-Allow-Origin': 'http://localhost:4300'});
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};

// Create and Save a new Product
exports.create = (req, res) => {
    // console.log('request inside create', req.body);

    // Create a Product
    const product = new Product(req.body);
    // Save product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        // console.log('error in product', err);
        res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
        });
    });
};

// Find a single Product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId
        });
    });
};

// Update a Product identified by the productId in the request
exports.update = (req, res) => {
    // Find Product and update it with the request body
    Product.findByIdAndUpdate(req.params.productId, req.body, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.productId
        });
    });
};

exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};
