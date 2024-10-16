import mongoose from "mongoose";

const connectToMongoDb = async () => {
  // MongoDB connection
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB Cloud successfully");
    })
    .catch((err) => {
      console.error("MongoDB cloud connection error:", err);
    });
};
export default connectToMongoDb;
