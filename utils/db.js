const mongoose = require("mongoose");

const connectToDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect("mongodb://localhost:27017/next-cms");
    console.log("connection to DB successfully :))");
  } catch (err) {
    console.log("error to connection to DB =>", err);
  }
};

export default connectToDB;
