const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
    console.log('Request Body:', req.body);
    const { name, price, description, category ,stockQuantity} = req.body;

    // Include the user ID from the JWT token
    try {
        const product = await Product.create({
            name,
            price,
            description,
            category,
            stockQuantity,
            user: req.user.id // Store the user ID from the authenticated request
        });
        res.status(201).json(product);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }
};

// Read all products for the authenticated user
exports.getProducts = async (req, res) => {
    try {
        // Find products only for the authenticated user
        const products = await Product.find({ user: req.user.id });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        // Ensure the product belongs to the authenticated user
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id }, // Match by product ID and user ID
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found or you do not have permission to update this product' });
        }
        res.json(product);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        // Ensure the product belongs to the authenticated user
        const product = await Product.findOneAndDelete({ _id: req.params.id, user: req.user.id }); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found or you do not have permission to delete this product' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
