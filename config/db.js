const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.COSMOSDB_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 50000 // Increase timeout for server selection
        });
        console.log('CosmosDB connected');
    } catch (error) {
        console.error('CosmosDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
