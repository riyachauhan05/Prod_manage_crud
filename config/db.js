// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.COSMOSDB_URI);
//         console.log('CosmosDB connected');
//     } catch (error) {
//         console.error('CosmosDB connection error:', error.message);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;


const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log('COSMOSDB_URI:', process.env.COSMOSDB_URI); // Add this line for debugging

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.COSMOSDB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('CosmosDB connected');
    } catch (error) {
        console.error('CosmosDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
