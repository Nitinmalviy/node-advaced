const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to database");

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected Host: ${conn.connection.host}`);
    console.log(`MongoDB Connected Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
