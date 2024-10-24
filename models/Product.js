const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Product name is required'], 
        trim: true,
        minlength: [2, 'Product name must be at least 2 characters long'],
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: { 
        type: String, 
        required: [true, 'Product description is required'], 
        minlength: [10, 'Product description must be at least 10 characters long'],
    },
    price: { 
        type: Number, 
        required: [true, 'Product price is required'], 
        min: [0, 'Product price cannot be negative']
    },
    category: { 
        type: String, 
        required: [true, 'Product category is required'],
        enum: ['Electronics', 'Clothing', 'Home', 'Books', 'Beauty', 'Sports'], // example categories
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true // Ensure a product is always associated with a user
    },
    stockQuantity: { 
        type: Number, 
        required: [true, 'Stock quantity is required'], 
        min: [0, 'Stock quantity cannot be negative']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: { 
        type: Date,
        default: Date.now,
        
    }
});

// Middleware to update the updatedAt field before saving
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now(); // Set updatedAt to the current date
    next();
});

module.exports = mongoose.model('Product', productSchema);
