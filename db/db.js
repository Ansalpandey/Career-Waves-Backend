const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {

    // Establish MongoDB connection
    await mongoose.connect(
      // process.env.MONGO_URL_LOCAL, // Use your MongoDB URL
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000, // Increase timeout
      }
    );

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};

module.exports = { connectDB };