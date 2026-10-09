const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI =
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_PROD_URI
      : process.env.MONGODB_DEV_URI;

  if (!mongoURI) {
    console.error("❌ MongoDB URI is not defined.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoURI);

    console.log(
      `✅ MongoDB Connected: ${conn.connection.host} [${process.env.NODE_ENV}]`
    );
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;