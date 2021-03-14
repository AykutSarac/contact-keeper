const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("Connected to DB.");
  } catch (error) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
